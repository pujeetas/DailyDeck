const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("COOKIES:", req.cookies);

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const deocdedObj = await jwt.verify(token, "pujeeta");
    req.user = deocdedObj;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = auth;
