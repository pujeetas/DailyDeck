import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  try {
    console.log("JWT_SECRET available:", !!process.env.JWT_SECRET);
    console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.error("JWT creation error:", error);
    throw error;
  }
};
