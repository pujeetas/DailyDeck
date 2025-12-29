import express from "express";
export const authRoute = express.Router();

import {
  signupUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controller/userAuthController.js";

authRoute.post("/signup", signupUser);

authRoute.post("/login", loginUser);

authRoute.post("/logout", logoutUser);

authRoute.post("/forgotPassword", forgotPassword);

authRoute.post("/reset-password/:userId/:token", resetPassword);
