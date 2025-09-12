// src/components/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../../component/ui/card';
import { ScrollArea } from '../../../component/ui/scroll-area';
import { ChatBubble } from '../../../component/ui/chat-bubble';
import { TypingIndicator } from '../../../component/ui/typing-indicator';
import { Textarea } from '../../../component/ui/text-area';
import { Button } from '../../../component/ui/button';

// Install ScrollArea: npx shadcn-ui@latest add scroll-area

export const ChatBox = ({ initialMessages = [], onSendMessage, isTyping = false, chatTitle = "Chat" }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const handleSend = () => {
    if (messageInput.trim()) {
      const newMessage = { text: messageInput, isSender: true };
      setMessages((prev) => [...prev, newMessage]);
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      handleSend();
    }
  };

  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="border-b px-4 py-3">
        <h2 className="text-lg font-semibold">{chatTitle}</h2>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg.text} isSender={msg.isSender} />
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-end space-x-2 border-t p-4">
        <Textarea
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 resize-none pr-10 min-h-[40px] max-h-[120px] scrollbar-hide"
          rows={1}
        />
        <Button onClick={handleSend} type="submit" size="sm" className="h-10 px-4">
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};