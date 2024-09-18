const { getUser } = require("../service/auth");

function cheakForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authorizationHeaderValue.split("Bearer ")[1]; // Extract the token
  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = user; // Attach the user to the request object
  next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ message: 'Login required' });

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    next();
  };
}

module.exports = {
  cheakForAuthentication,
  restrictTo,
};
