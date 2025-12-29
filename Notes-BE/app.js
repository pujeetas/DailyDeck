import "dotenv/config";
import express from "express";
import { connectDB } from "../src/database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoute } from "../src/route/authRoute.js";
import { userRoute } from "../src/route/userRoute.js";
import { notesRoute } from "../src/route/notesRoute.js";
import { todoRoute } from "../src/route/todoRoute.js";

const app = express();

// CORS - use environment variable
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(cookieParser());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
  });
});

// Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", notesRoute);
app.use("/api", todoRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// DB connection cache
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using cached DB connection");
    return cachedDb;
  }

  try {
    console.log("Creating new DB connection...");
    cachedDb = await connectDB();
    console.log("✅ DB connected successfully");
    return cachedDb;
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    throw error;
  }
}

// Serverless handler
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
