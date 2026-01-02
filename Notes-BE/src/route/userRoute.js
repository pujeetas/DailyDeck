import express from "express";

import { auth } from "../middleware/authMiddleware.js";
import {
  getUserDetailsController,
  updateUserDetailsController,
} from "../controller/userDetailsController.js";
export const userRoute = express.Router();

userRoute.get("/user/getUserDetails", auth, getUserDetailsController);

userRoute.patch("/user/updateProfile", auth, updateUserDetailsController);
