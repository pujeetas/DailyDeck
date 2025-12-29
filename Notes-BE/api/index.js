import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS
const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((o) =>
  o.trim()
) || ["*"];

app.use(
  cors({
    origin: allowedOrigins,
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
  });
});

// Initialize routes and database
let initialized = false;

async function initialize() {
  if (initialized) return;

  try {
    // Import database
    const { connectDB } = await import("../src/database/database.js");
    await connectDB();
    console.log("✅ Database connected");

    // Import routes
    const { authRoute } = await import("../src/route/authRoute.js");
    const { userRoute } = await import("../src/route/userRoute.js");
    const { notesRoute } = await import("../src/route/notesRoute.js");
    const { todoRoute } = await import("../src/route/todoRoute.js");

    // Register routes
    app.use("/api", authRoute);
    app.use("/api", userRoute);
    app.use("/api", notesRoute);
    app.use("/api", todoRoute);

    initialized = true;
    console.log("✅ Routes initialized");
  } catch (error) {
    console.error("❌ Initialization failed:", error);
    throw error;
  }
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.url,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An error occurred",
  });
});

// Serverless handler
export default async function handler(req, res) {
  try {
    await initialize();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      error: "Serverless function failed",
      message: error.message,
    });
  }
}
