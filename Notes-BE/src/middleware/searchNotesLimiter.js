import rateLimit from "express-rate-limit";

export const searchNotesLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    error: "Too many searches. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
