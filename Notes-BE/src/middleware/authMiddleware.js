const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedObj;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
