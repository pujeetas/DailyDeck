import "dotenv/config";
import express from "express";
import { connectDB } from "./src/database/database.js";
import cookieParser from "cookie-parser";

import { authRoute } from "./src/route/authRoute.js";
import { userRoute } from "./src/route/userRoute.js";
import cors from "cors";
import { notesRoute } from "./src/route/notesRoute.js";
import { todoRoute } from "./src/route/todoRoute.js";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api", authRoute);
app.use("/api", userRoute);
//notes
app.use("/api", notesRoute);
//todo
app.use("/api", todoRoute);
// Connect to DB when the module loads
connectDB()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err.message);
  });

// Export the app for serverless deployment
export default app;
