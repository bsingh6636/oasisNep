import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform transition-all">

        {/* Cart Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center animate-pulse">
              <img
                src="https://res.cloudinary.com/bsingh6636/image/upload/v1717156828/page/remove-from-trolley-icon_mbpom0.svg"
                alt="Empty Cart"
                className="h-20 w-20 object-contain drop-shadow-md dark:brightness-110"
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              0
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            Looks like you haven't added anything to your cart yet.
          </p>

          <div className="pt-4">
            <Link to="/">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white font-medium rounded-xl hover:shadow-lg transform transition duration-300 hover:-translate-y-1 w-full">
                Start Shopping
              </button>
            </Link>
          </div>

          {/* Suggestions */}
          {/* <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              You might be interested in:
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">Popular</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">New Arrivals</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">Deals</p>
              </div>
            </div>
          </div> */}

          {/* Return to previous page link */}
          <div className="mt-4">
            <button onClick={() => window.history.back()} className="text-blue-500 dark:text-blue-400 text-sm hover:underline flex items-center justify-center mx-auto">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
