// middleware/authorize.js
function authorize(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (!userRole) {
        return res.status(401).json({ error: "Unauthorized: No role assigned" });
      }
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: "Forbidden: Insufficient role" });
      }
      next();
    };
  }
  
  module.exports = authorize;
  