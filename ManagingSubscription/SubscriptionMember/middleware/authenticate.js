// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Failed to authenticate token" });
    req.user = decoded; // decoded should contain user info, including role
    next();
  });
}

module.exports = authenticate;
