const controller = require("../controllers/chat.controller.js");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function(app) {
    app.get("/api/chats", [verifyToken], controller.getChats);
    app.get("/api/chats/:id/messages", [verifyToken], controller.getChatMessages);
    app.post("/api/chats/mute", [verifyToken], controller.toggleMute);
};
