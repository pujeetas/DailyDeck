import express from "express";

import { chatWithAssistant } from "../controller/assistantController.js";

import { auth } from "../middleware/authMiddleware.js";
import { assistantLimiter } from "../middleware/assistantLimiter.js";
import { updateUserStreak } from "../middleware/updateUserStreak.js";

export const assistantRoute = express.Router();

assistantRoute.post(
  "/assistant/chat",
  auth,
  assistantLimiter,
  updateUserStreak,
  chatWithAssistant,
);
