const db = require('../models');
const { sendNewMessageEmail } = require('./email.service');
const { Op } = require('sequelize');

const Chat = db.chat;
const ChatMessage = db.chatMessage;
const ChatNotification = db.chatNotification;
const User = db.user;

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
            socket.join(userId);
            console.log(`User ${userId} joined their personal room.`);
        }


        socket.on('startChat', async (data) => {
            try {
                const { customerId, adminId } = data;
                let chat = await Chat.findOne({
                    where: { customerId, adminId }
                });

                if (!chat) {
                    chat = await Chat.create({ customerId, adminId });
                }
                socket.emit('chatStarted', chat);
                socket.join(chat.id.toString());
            } catch (error) {
                socket.emit('chatError', { message: 'Could not start chat.', error: error.message });
            }
        });

        socket.on('joinChat', (chatId) => {
            socket.join(chatId.toString());
            console.log(`User ${userId} joined chat room ${chatId}`);
        });

        socket.on('sendMessage', async (data) => {
            try {
                const { chatId, senderId, message } = data;

                const savedMessage = await ChatMessage.create({
                    chatId,
                    senderId,
                    message
                });

                const chat = await Chat.findByPk(chatId);
                const sender = await User.findByPk(senderId);

                const recipientId = senderId === chat.customerId ? chat.adminId : chat.customerId;

                // Broadcast the message to the chat room
                io.to(chatId.toString()).emit('receiveMessage', {
                    ...savedMessage.get(),
                    sender: { id: sender.id, name: sender.name }
                });

                // Handle email notification
                const notificationSetting = await ChatNotification.findOne({
                    where: { userId: recipientId, chatId: chatId }
                });

                if (!notificationSetting || !notificationSetting.is_muted) {
                    const recipient = await User.findByPk(recipientId);
                    await sendNewMessageEmail(recipient.email, sender.name, message);
                }

            } catch (error) {
                socket.emit('chatError', { message: 'Could not send message.', error: error.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};