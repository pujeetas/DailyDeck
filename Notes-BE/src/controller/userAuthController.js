const { userSigninValidation } = require("../validation/userValidation");
const UserModel = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup user
const signupUser = async (req, res) => {
  try {
    const { error, value } = userSigninValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
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

    return res
      .status(201)
      .json({ message: "User registered. Login to continue" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = { id: checkUser._id, email: checkUser.email };
    const jwtToken = jwt.sign(payload, "pujeeta", { expiresIn: "15m" });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};

module.exports = { signupUser, loginUser, logoutUser };
