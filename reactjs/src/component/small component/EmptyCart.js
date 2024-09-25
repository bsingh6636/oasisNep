import React from 'react';
import {Link} from "react-router-dom"

export const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <img src="https://res.cloudinary.com/bsingh6636/image/upload/v1717156828/page/remove-from-trolley-icon_mbpom0.svg" alt="Shopping Cart Icon" className="mx-auto mb-8 h-48 w-auto " />
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Currently Empty</h2>
        <p className="text-lg text-gray-600 mb-8">Why wait? Add something good to your cart.</p>
        <Link to="/">
        <button className="px-6 py-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">Shop Now</button>
        </Link>
       
      </div>
    </div>
  );
};
