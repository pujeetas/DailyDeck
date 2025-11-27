require("dotenv").config();
const express = require("express");
const connectDB = require("./src/database/database");
const cookieParser = require("cookie-parser");
const authRoute = require("./src/route/authRoute");
const userRoute = require("./src/route/userRoute");
const cors = require("cors");

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
app.use("/", authRoute);
app.use("/", userRoute);

// start server ONLY after DB connection
const start = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    app.listen(process.env.Port, () => {
      console.log("Server running on 3000");
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
