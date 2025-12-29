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

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

console.log("Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    origin: req.headers.origin,
    cookies: Object.keys(req.cookies),
  });
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    env: process.env.NODE_ENV,
  });
});

// Routes
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

app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS policy blocked this request",
      origin: req.headers.origin,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Database connection handler for serverless
let isConnected = false;

const ensureDbConnection = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await connectDB();
    isConnected = true;
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    throw err;
  }
};

const handler = async (req, res) => {
  try {
    await ensureDbConnection();
    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);
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
      console.log("Connected to DB");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to DB:", err.message);
      process.exit(1);
    });
}

export default handler;
