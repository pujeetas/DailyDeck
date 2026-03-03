import "dotenv/config";
import express from "express";
import { connectDB } from "./src/database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoute } from "./src/route/authRoute.js";
import { userRoute } from "./src/route/userRoute.js";
import { notesRoute } from "./src/route/notesRoute.js";
import { todoRoute } from "./src/route/todoRoute.js";

import session from "express-session";
import passport from "./src/config/passport.js";

const app = express();

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "https://daily-deck-ten.vercel.app"];

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Body parsing middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    env: process.env.NODE_ENV,
  });
});

// API Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", notesRoute);
app.use("/api", todoRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

// Database connection cache for serverless
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return Promise.resolve();
  }

  console.log("🔌 Creating new database connection...");
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
};

// Serverless handler for Vercel
const handler = async (req, res) => {
  try {
    // Ensure database is connected before handling request
    await connectToDatabase();

    // Handle the request with Express
    return app(req, res);
  } catch (error) {
    console.error("❌ Handler error:", error);
    return res.status(500).json({
      error: "Database connection failed",
      message: error.message,
    });
  }
};

// Local development server
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("❌ Failed to start:", err);
      process.exit(1);
    });
}

export default handler;
