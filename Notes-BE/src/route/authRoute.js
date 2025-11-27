const express = require("express");
const authRoute = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controller/userAuthController");

authRoute.post("/signup", signupUser);

authRoute.post("/login", loginUser);

authRoute.post("/logout", logoutUser);

module.exports = authRoute;
