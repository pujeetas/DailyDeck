const express = require("express");
const connectDB = require("./database/database");
const cookieParser = require("cookie-parser");
const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const app = express();
const cors = require("cors");

//connect to db
const start = async () => {
  await connectDB();
};
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

//auth
app.use("/", authRoute);

//user
app.use("/", userRoute);

//listen to port for incoming request
app.listen(3000, () => {
  console.log("sever running on 3000");
});

start();
