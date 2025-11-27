const UserModel = require("../schema/userSchema");
const bcrypt = require("bcrypt");

const findUserByEmail = (email) => UserModel.findOne({ email });

const hashPassword = (password) => bcrypt.hash(password, 10);

const compareHashedPassword = (stringPassword, hashedPassword) =>
  bcrypt.compare(stringPassword, hashedPassword);

module.exports = { findUserByEmail, compareHashedPassword, hashPassword };
