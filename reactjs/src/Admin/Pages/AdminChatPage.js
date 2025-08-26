import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import chatService from '../../api/chat.service';
import { connectSocket, disconnectSocket, onNewMessage, offNewMessage, sendMessage, joinChat, onNewChat, offNewChat, joinAdmin } from '../../services/socket';
import { requestNotificationPermission, showNotification } from '../../utils/notifications';

const AdminChatPage = () => {
  const { user } = useSelector(state => state.auth);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    requestNotificationPermission();
    if (user) {
      connectSocket(user.id);
      joinAdmin();
    }

    chatService.getChats().then(response => {
      setChats(response.data);
    });

    onNewMessage((message) => {
      if (selectedChat && message.chatId === selectedChat.id) {
        setMessages(prevMessages => [...prevMessages, message]);
        if (document.hidden) {
          showNotification('New Message', {
            body: message.message
          });
        }
      }
    });

    onNewChat((chat) => {
      setChats(prev => [chat, ...prev.filter(c => c.id !== chat.id)]);
    });

    return () => {
      offNewMessage();
      offNewChat();
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
        <h2 className="text-xl font-bold mb-4">All Chats</h2>
        <ul>
          {chats.map(chat => (
            <li key={chat.id} onClick={() => handleSelectChat(chat)}
              className={`p-3 rounded-lg cursor-pointer mb-2 ${selectedChat?.id === chat.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}>
              <p className="font-semibold">
                {chat.customer.name}
              </p>
              <p className="text-sm text-gray-600">{chat.customer.email}</p>
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
            <p className="text-gray-500">Select a chat to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;
