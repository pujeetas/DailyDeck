import rateLimit from "express-rate-limit";

export const assistantLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: {
    error: "Too many messages. Please wait a moment before continuing.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
