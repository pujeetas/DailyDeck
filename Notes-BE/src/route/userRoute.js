import express from "express";

import { auth } from "../middleware/authMiddleware.js";
import { userDetailsController } from "../controller/userDetailsController.js";
export const userRoute = express.Router();

userRoute.get("/user/getUserDetails", auth, userDetailsController);
