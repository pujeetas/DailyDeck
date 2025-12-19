import express from "express";
export const authRoute = express.Router();

import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controller/userAuthController.js";

authRoute.post("/signup", signupUser);

authRoute.post("/login", loginUser);

authRoute.post("/logout", logoutUser);
