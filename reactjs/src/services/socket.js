import { io } from 'socket.io-client';

const URL = 'http://localhost:8080';

let socket;

export const connectSocket = (userId) => {
    if (socket) return;

    socket = io(URL, {
        query: { userId },
    });

    socket.on('connect', () => {
        console.log('Connected to socket server with id:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });

    socket.on('chatError', (error) => {
        console.error('Chat Error:', error);
    });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const startChat = (customerId, adminId) => {
    if (!socket) return;
    socket.emit('startChat', { customerId, adminId });
};

export const joinChat = (chatId) => {
    if (!socket) return;
    socket.emit('joinChat', chatId);
};

export const sendMessage = (chatId, senderId, message) => {
    if (!socket) return;
    socket.emit('sendMessage', { chatId, senderId, message });
};

export const onNewMessage = (callback) => {
    if (!socket) return;
    socket.on('receiveMessage', callback);
};

export const onChatStarted = (callback) => {
    if (!socket) return;
    socket.on('chatStarted', callback);
};

export const offNewMessage = () => {
    if (!socket) return;
    socket.off('receiveMessage');
}
