import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import chatService from '../api/chat.service';
import { connectSocket, disconnectSocket, onNewMessage, offNewMessage, sendMessage, joinChat, startChat, onChatStarted } from '../services/socket';

const ChatPage = () => {
    const { user } = useSelector(state => state.auth);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (user) {
            connectSocket(user.id);
        }

        chatService.getChats().then(response => {
            setChats(response.data);
        });

        onNewMessage((message) => {
            if (selectedChat && message.chatId === selectedChat.id) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        });
        
        onChatStarted((chat) => {
            setChats(prev => [chat, ...prev.filter(c => c.id !== chat.id)]);
            handleSelectChat(chat);
        });

        return () => {
            offNewMessage();
            disconnectSocket();
        };
    }, [user, selectedChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        chatService.getChatMessages(chat.id).then(response => {
            setMessages(response.data);
        });
        joinChat(chat.id);
    };
    
    const handleStartNewChat = () => {
        // This assumes the admin user has an ID of 1. 
        // In a real application, you would have a more robust way of identifying the admin.
        const adminId = 1; 
        if (user.id === adminId) {
            alert("Admins can't start chats with themselves.");
            return;
        }
        startChat(user.id, adminId);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedChat) {
            sendMessage(selectedChat.id, user.id, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="container mx-auto p-4 h-[calc(100vh-100px)] flex">
            <div className="w-1/3 bg-gray-100 p-4 rounded-l-lg overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Chats</h2>
                    {user.role === 'customer' && (
                        <button onClick={handleStartNewChat} className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg">
                            New Chat
                        </button>
                    )}
                </div>
                <ul>
                    {chats.map(chat => (
                        <li key={chat.id} onClick={() => handleSelectChat(chat)}
                            className={`p-3 rounded-lg cursor-pointer mb-2 ${selectedChat?.id === chat.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}>
                            <p className="font-semibold">
                                {user.role === 'admin' ? chat.customer.name : 'Admin Support'}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-2/3 bg-white p-4 rounded-r-lg flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="flex-1 overflow-y-auto mb-4 pr-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex mb-4 ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.senderId === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        <p className="font-bold mb-1">{msg.sender.name}</p>
                                        <p>{msg.message}</p>
                                        <p className="text-xs opacity-75 mt-1 text-right">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="flex">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type a message..."
                            />
                            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600">
                                Send
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
