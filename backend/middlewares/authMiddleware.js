const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        message: "Unauthorized ",
      });
    }
    const userId = decoded.userId;
    if (!req.body.userId) {
      req.body.userId = userId;
    }
    next();
  });
};
module.exports = verifyJWT;
