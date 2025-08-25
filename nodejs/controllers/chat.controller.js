const db = require("../models");
const { Op } = require("sequelize");

const Chat = db.chat;
const ChatMessage = db.chatMessage;
const ChatNotification = db.chatNotification;
const User = db.user;

// Get all chats for the logged-in user
exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.findAll({
            where: {
                [Op.or]: [{ customerId: req.userId }, { adminId: req.userId }]
            },
            include: [
                { model: User, as: 'customer', attributes: ['id', 'name', 'email'] },
                { model: User, as: 'admin', attributes: ['id', 'name', 'email'] }
            ]
        });
        res.send(chats);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Get message history for a specific chat
exports.getChatMessages = async (req, res) => {
    try {
        const chatId = req.params.id;
        // Ensure user is a participant of the chat
        const chat = await Chat.findOne({
            where: {
                id: chatId,
                [Op.or]: [{ customerId: req.userId }, { adminId: req.userId }]
            }
        });

        if (!chat) {
            return res.status(404).send({ message: "Chat not found or you are not a participant." });
        }

        const messages = await ChatMessage.findAll({
            where: { chatId: chatId },
            include: [{ model: User, as: 'sender', attributes: ['id', 'name'] }],
            order: [['createdAt', 'ASC']]
        });
        res.send(messages);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Mute or unmute notifications for a chat
exports.toggleMute = async (req, res) => {
    try {
        const { chatId, is_muted } = req.body;
        const userId = req.userId;

        const [notification, created] = await ChatNotification.findOrCreate({
            where: { userId, chatId },
            defaults: { is_muted: is_muted }
        });

        if (!created) {
            await notification.update({ is_muted });
        }

        res.send({ message: `Notifications for chat ${chatId} have been ${is_muted ? 'muted' : 'unmuted'}.` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
