import "dotenv/config";
import express from "express";
import { connectDB } from "./src/database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoute } from "./src/route/authRoute.js";
import { userRoute } from "./src/route/userRoute.js";
import { notesRoute } from "./src/route/notesRoute.js";
import { todoRoute } from "./src/route/todoRoute.js";

const app = express();

// Parse allowed origins from environment variable
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "https://daily-deck-ten.vercel.app"];

console.log("🌐 Allowed origins:", allowedOrigins);
console.log("🔧 NODE_ENV:", process.env.NODE_ENV);

// Simplified CORS configuration that actually works with Vercel
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("📨 Request from origin:", origin);

      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) {
        console.log("✅ No origin - allowing");
        return callback(null, true);
      }

      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        console.log("✅ Origin allowed:", origin);
        return callback(null, true);
      }

      // In development, allow localhost with any port
      if (
        process.env.NODE_ENV !== "production" &&
        origin.includes("localhost")
      ) {
        console.log("✅ Localhost allowed in development");
        return callback(null, true);
      }

      console.log("❌ Origin blocked:", origin);
      callback(null, false); // Don't throw error, just reject
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400, // 24 hours
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`, {
    origin: req.headers.origin,
    cookies: Object.keys(req.cookies).length,
    hasAuth: !!req.cookies.token,
  });
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    env: process.env.NODE_ENV,
    corsOrigin: process.env.CORS_ORIGIN,
  });
});

// Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", notesRoute);
app.use("/api", todoRoute);

// 404 handler
app.use((req, res) => {
  console.log("❌ 404:", req.method, req.path);
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("💥 Error:", err.message);
  console.error("Stack:", err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    path: req.path,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Database connection handler for serverless
let isConnected = false;

const ensureDbConnection = async () => {
  if (isConnected) {
    return;
  }

  try {
    await connectDB();
    isConnected = true;
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    throw err;
  }
};

// Wrap the app to ensure DB connection before handling requests
const handler = async (req, res) => {
  try {
    await ensureDbConnection();
    return app(req, res);
  } catch (error) {
    console.error("❌ Handler error:", error);
    return res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
};

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  // Connect to DB first, then start server
  connectDB()
    .then(() => {
      isConnected = true;
      console.log("✅ Connected to DB");
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("❌ Failed to connect to DB:", err.message);
      process.exit(1);
    });
}

// Export for serverless deployment (Vercel)
export default handler;
