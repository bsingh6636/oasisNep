const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  } else {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
    if (req.userRole === 'admin') {
        next();
        return;
    }
    res.status(403).send({
        message: "Require Admin Role!"
    });
    return;
};


const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;
