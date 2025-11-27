const mongoose = require("mongoose");
const User = require("../schema/userSchema");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pujeeta98_db_user:pujeetaSingh97@cluster0.q5wip6h.mongodb.net/dailyDeck"
  );
};

module.exports = connectDB;
