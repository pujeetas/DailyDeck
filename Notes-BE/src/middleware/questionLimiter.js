import rateLimit from "express-rate-limit";

export const questionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "Too many questions. Please wait a moment before asking again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
