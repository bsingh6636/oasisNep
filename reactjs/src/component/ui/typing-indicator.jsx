// src/components/TypingIndicator.jsx
import React from 'react';
import { cn } from '../../lib/utils';

export const TypingIndicator = () => {
  return (
    <div className='flex items-center gap-1.5 rounded-2xl bg-gray-200 px-4 py-2'>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full bg-gray-500',
          'animate-typing-bounce delay-0'
        )}
      ></span>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full bg-gray-500',
          'animate-typing-bounce delay-150'
        )}
      ></span>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full bg-gray-500',
          'animate-typing-bounce delay-300'
        )}
      ></span>
    </div>
  );
};