
import React from 'react';

const CartSummary = ({ cartItems, finalCartCost, buyNow, isDarkMode }) => {
    return (
        <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} shadow-lg transition-colors duration-300`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0 text-center sm:text-left">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</p>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{finalCartCost.toLocaleString()}</p>
                    </div>
                    <button 
                        onClick={buyNow} 
                        className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:translate-y-[-2px] ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700' 
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                        }`}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
