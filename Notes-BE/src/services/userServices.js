import { UserModel } from "../schema/userSchema.js";
import bcrypt from "bcrypt";

export const findUserByEmail = (email) => UserModel.findOne({ email });

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const compareHashedPassword = (stringPassword, hashedPassword) =>
  bcrypt.compare(stringPassword, hashedPassword);
