import express from "express";
export const authRoute = express.Router();
import passport from "passport";

import {
  signupUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  googleAuthCallback,
  verifyUser,
} from "../controller/userAuthController.js";

authRoute.post("/signup", signupUser);

authRoute.post("/login", loginUser);

authRoute.post("/logout", logoutUser);

authRoute.post("/forgotPassword", forgotPassword);

authRoute.post("/reset-password/:userId/:token", resetPassword);

// Google OAuth
authRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuthCallback,
);

authRoute.get("/verify", verifyUser);
