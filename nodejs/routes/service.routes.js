const controller = require("../controllers/service.controller.js");

module.exports = function(app) {
  app.get("/api/services", controller.findAll);
  app.get("/api/services/:id", controller.findOne);
};
