// src/components/AdminChat.jsx (Your main file)
import { useContext, useEffect, useState } from "react";
import { createSocketConnection } from "../../../utils/socket";
import { Context } from "../../RoutesAdmin";
import { ChatBox } from "./chatbox";

const AdminChat = () => {
    const { userInfo } = useContext(Context);
    const [messages, setMessages] = useState([]); // State to hold chat messages
    const [isTyping, setIsTyping] = useState(false); // State for typing indicator

    useEffect(() => {
        if (!userInfo?._id) return;

        console.log("Connecting socket for user:", userInfo.name);
        const socket = createSocketConnection();

        socket.emit('joinChat', { userId: userInfo._id, userName: userInfo.name, userInfo });

        // Example: Listen for incoming messages
        socket.on('message', (data) => {
            console.log("Received message:", data);
            setMessages(prevMessages => [...prevMessages, { text: data.message, isSender: false }]);
        });

        // Example: Listen for typing events
        socket.on('typing', (data) => {
            console.log(`${data.userName} is typing...`);
            setIsTyping(true);
            // Optionally, set a timeout to hide typing indicator after a few seconds
            // if no new typing event comes in.
            setTimeout(() => setIsTyping(false), 3000);
        });

        socket.on('userMessage' , (data) => {
            console.log("Received message:", data);
            setMessages(prevMessages => [...prevMessages, { text: data.message, isSender: true }]);
        })

        // Clean up on unmount
        return () => {
            console.log("Disconnecting socket for user:", userInfo.name);
            socket.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo?._id]);

    const handleSendMessage = (messageText) => {
        // Here you would emit the message via your socket
        const socket = createSocketConnection();

        console.log("Sending message via socket:", messageText);
        // Example: socket.emit('sendMessage', { from: userInfo._id, to: 'admin', message: messageText });

        // For demonstration, let's simulate a response
        socket.emit('adminMessage', { from: userInfo._id, role: 'admin', message: messageText });
        setTimeout(() => {
            setMessages(prev => [...prev, { text: `Echo: ${messageText}`, isSender: false }]);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-285px)] w-full mx-auto flex flex-col">
            <ChatBox
                chatTitle={`Chat with ${userInfo?.name || 'User'}`}
                messages={messages}
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
            />
        </div>
    );
}

export default AdminChat;