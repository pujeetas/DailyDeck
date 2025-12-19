import { userSigninValidation } from "../validation/userValidation.js";
import { UserModel } from "../schema/userSchema.js";
import {
  findUserByEmail,
  compareHashedPassword,
  hashPassword,
} from "../services/userServices.js";

import { createToken } from "../services/authServices.js";
import { ERRORS } from "../constants/errorMessages.js";
import { STATUS } from "../constants/statusCodes.js";

// signup user

export const signupUser = async (req, res) => {
  try {
    const { error, value } = userSigninValidation.validate(req.body);
    if (error) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: ERRORS.INVALID_INPUT });
    }

    const hashedPassword = await hashPassword(value.password);

    if (!hashedPassword) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const newUser = new UserModel({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
    });

    await newUser.save();

    // ADD TOKEN CREATION AND COOKIE (same as login)
    const payload = { id: newUser._id, email: newUser.email };
    const jwtToken = createToken(payload);

    console.log("🔑 Generated token on signup:", jwtToken);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await findUserByEmail(email);

    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await compareHashedPassword(password, checkUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = { id: checkUser._id, email: checkUser.email };
    const jwtToken = createToken(payload);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      domain: "localhost",

      path: "/",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: checkUser._id,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        email: checkUser.email,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// logout user
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      domain: "localhost",

      path: "/",
    });

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};
