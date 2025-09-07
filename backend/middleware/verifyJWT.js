const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized: No token" });
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ message: "Unauthorized: Invalid format" });

  const token = parts[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Unauthorized: Invalid token" });

    req.user = decoded.UserInfo.user;
    req.gmail = decoded.UserInfo.gmail;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports=verifyJWT