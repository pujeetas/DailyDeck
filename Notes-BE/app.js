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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/", authRoute);
app.use("/", userRoute);

//notes
app.use("/", notesRoute);

//todo
app.use("/", todoRoute);

// start server ONLY after DB connection
const start = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
