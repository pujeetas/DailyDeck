const mongoose = require("mongoose");
const User = require("../schema/userSchema");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
