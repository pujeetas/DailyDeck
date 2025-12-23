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
    const { email, password } = req.body;

    const checkUser = await findUserByEmail(email);

    if (!checkUser) {
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: ERRORS.USER_NOT_FOUND });
    }

    const isMatch = await compareHashedPassword(password, checkUser.password);

    if (!isMatch) {
      return res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: ERRORS.INVALID_CREDENTIALS });
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
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR });
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

    return res.status(STATUS.OK).json({ message: "User logged out" });
  } catch (error) {
    return res
      .status(STATUS.SERVER_ERROR)
      .json({ message: ERRORS.SERVER_ERROR });
  }
};
