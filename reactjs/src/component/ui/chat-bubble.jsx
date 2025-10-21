// src/components/ChatBubble.jsx
import React from 'react';
import { cn } from '../../lib/utils';


export const ChatBubble = ({ message, isSender }) => {
  return (
    <div
      className={cn(
        'flex w-full',
        isSender ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2 text-sm',
          isSender
            ? 'rounded-br-none bg-blue-500 text-white'
            : 'rounded-bl-none bg-gray-200 text-gray-800'
        )}
      >
        {message}
      </div>
    </div>
  );
};