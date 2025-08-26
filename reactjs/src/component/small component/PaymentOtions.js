import React from 'react';
import { telegramImageUrl, whatsappImageUrl } from '../../Const/url';

const PaymentOptions = ({ cartItems }) => {
  // Function to format cart items into a message
  function formatCartItems(cartItems) {
    return cartItems.map(item => `Item: ${item[0]}, Quantity: ${item[1]}, Price: ${item[2]} NPR`).join('\n');
  }

  function whatsappClick() {
    const message = encodeURIComponent(formatCartItems(cartItems));
    window.location.href = `https://api.whatsapp.com/send/?phone=%2B9779804805541&text=${message}`;
  }

  function telegramClick() {
    const message = encodeURIComponent(formatCartItems(cartItems));
    window.location.href = `https://t.me/bsingh4474?text=${message}`;
  }

  return (
    <div className='flex flex-col items-center space-y-4 mt-5'>
      <div className='flex flex-row items-center space-x-2 p-2 border rounded-lg shadow-md cursor-pointer' onClick={whatsappClick}>
        <img src={whatsappImageUrl} alt='whatsapp' className='w-8 h-8' />
        <span>Proceed via WhatsApp</span>
      </div>
      <div className='flex flex-row items-center space-x-2 p-2 border rounded-lg shadow-md cursor-pointer' onClick={telegramClick}>
        <img src={telegramImageUrl} alt='telegram' className='w-8 h-8' />
        <span>Proceed via Telegram</span>
      </div>
    </div>
  );
};

export default PaymentOptions;
