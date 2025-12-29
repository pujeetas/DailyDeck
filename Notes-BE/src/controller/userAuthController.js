import { userSigninValidation } from "../validation/userValidation.js";
import { UserModel } from "../schema/userSchema.js";
import {
  findUserByEmail,
  compareHashedPassword,
  hashPassword,
  hashToken,
} from "../services/userServices.js";
import crypto from "node:crypto";

import { createToken } from "../services/authServices.js";
import { ERRORS } from "../constants/errorMessages.js";
import { STATUS } from "../constants/statusCodes.js";
import nodemailer from "nodemailer";

// signup user
export const signupUser = async (req, res) => {
  try {
    const { error, value } = userSigninValidation.validate(req.body);
    if (error) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }

    const hashedPassword = await hashPassword(value.password);

    if (!hashedPassword) {
      return res
        .status(STATUS.SERVER_ERROR)
        .json({ message: ERRORS.SERVER_ERROR });
    }

    const newUser = new UserModel({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
    });

    await newUser.save();

    const payload = { id: newUser._id, email: newUser.email };
    const jwtToken = createToken(payload);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(STATUS.CREATED).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.code === STATUS.DUPLICATE_KEY) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: ERRORS.DUPLICATE_EMAIL });
    }
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    console.log("🔐 Login request received");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);
    console.log("Login attempt for:", req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const checkUser = await findUserByEmail(email);
    console.log("User lookup result:", checkUser ? "found" : "not found");
    if (checkUser) {
      console.log("User ID:", checkUser._id);
      console.log("User email:", checkUser.email);
      console.log("Password hash exists:", !!checkUser.password);
    }

    if (!checkUser) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: ERRORS.USER_NOT_FOUND });
    }

    let isMatch;
    try {
      isMatch = await compareHashedPassword(password, checkUser.password);
      console.log("Password comparison result:", isMatch);
    } catch (bcryptError) {
      console.error("Bcrypt error:", bcryptError);
      return res.status(STATUS.SERVER_ERROR).json({
        message: ERRORS.SERVER_ERROR,
        debug: `Bcrypt error: ${bcryptError.message}`,
      });
    }

    if (!isMatch) {
      return res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: ERRORS.INVALID_CREDENTIALS });
    }

    const payload = { id: checkUser._id.toString(), email: checkUser.email };
    console.log("Creating token with payload:", payload);
    const jwtToken = createToken(payload);
    console.log("Token created successfully");

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(STATUS.OK).json({
      message: "Login successful",
      user: {
        id: checkUser._id,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        email: checkUser.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR, debug: error.message });
  }
};

// logout user
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      domain: `${process.env.CORS_ORIGIN}`,
      path: "/",
    });

    return res.status(STATUS.OK).json({ message: "User logged out" });
  } catch (error) {
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ message: ERRORS.INVALID_EMAIL });
  }
  try {
    const emailExists = await findUserByEmail(email);
    if (!emailExists) {
      return res
        .status(200)
        .json({ message: "If email exists, reset link sent" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await hashToken(token);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const saveHashToken = await UserModel.updateOne(
      {
        email: email,
      },
      { $set: { resetToken: hashedToken, resetTokenExpiresAt: expiresAt } }
    );
    if (saveHashToken.modifiedCount === 0) {
      throw new Error("Failed to save token");
    }

    const resetURL = `${process.env.CORS_ORIGIN}reset-password/${emailExists._id}/${token}`;

    //send email
    await sendResetEmail(email, resetURL);
    return res.status(200).json({ message: ERRORS.EMAIL_SENT });
  } catch (error) {
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendResetEmail(userEmail, resetURL) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset Request",
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>This link expires in 10 mins.</p>
    `,
  });
}

export const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const newPassword = req.body.password;

    console.log(userId);

    if (!userId || !token) {
      return res.status(400).json({ message: ERRORS.INVALID_TOKEN });
    }

    const user = await UserModel.findOne({
      _id: userId,
      resetTokenExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "No user found",
      });
    }

    const isValid = await compareHashedPassword(token, user.resetToken);

    if (!isValid) {
      return res.status(400).json({ message: ERRORS.INVALID_TOKEN });
    }

    if (!newPassword) {
      return res.status(400).json({ message: ERRORS.INVALID_CREDENTIALS });
    }

    const hashedPassword = await hashPassword(newPassword);

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: {
          resetToken: "",
          resetTokenExpiresAt: "",
        },
      }
    );

    return res.status(STATUS.OK).json({
      message: "Password reset successful",
    });
  } catch (error) {
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR });
  }
};
