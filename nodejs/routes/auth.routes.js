const controller = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/register", controller.register);
  app.post("/api/auth/login", controller.login);
  app.get("/api/auth/profile", [verifyToken], controller.getProfile);
};
