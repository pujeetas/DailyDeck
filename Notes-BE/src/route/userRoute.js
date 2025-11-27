const express = require("express");
const auth = require("../middleware/authMiddleware");
const userDetailsController = require("../controller/userDetailsController");
const userRoute = express.Router();

userRoute.get("/user/getUserDetails", auth, userDetailsController);

module.exports = userRoute;
