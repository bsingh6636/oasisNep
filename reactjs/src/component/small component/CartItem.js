
import React from 'react';
import { MdDeleteForever } from "react-icons/md";

const CartItem = ({ item, deleteItem, isDarkMode }) => {
    return (
        <div 
            className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-xl
            ${isDarkMode 
                ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700' 
                : 'bg-gradient-to-r from-teal-400 to-emerald-500'}`}
        >
            <div className="flex flex-col sm:flex-row">
                {/* Item Image */}
                <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <div className="relative pt-[75%] sm:pt-[100%]">
                        <img 
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl sm:rounded-none" 
                            src={item.image} 
                            alt={item.name}
                            loading="lazy"
                        />
                    </div>
                </div>
                
                {/* Item Details */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                            {item.name}
                        </h3>
                        <button 
                            onClick={() => deleteItem(item.Id)}
                            className={`p-2 rounded-full ${isDarkMode 
                                ? 'bg-gray-700 text-red-400 hover:bg-gray-600' 
                                : 'bg-white/30 text-red-600 hover:bg-white/40'} 
                              transition-colors duration-200`}
                            aria-label="Delete item"
                        >
                            <MdDeleteForever className="h-5 w-5" />
                        </button>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                            isDarkMode 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-white/30 text-white'
                        }`}>
                            {item.month} month plan
                        </div>
                        
                        <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                            isDarkMode 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-white/30 text-white'
                        }`}>
                            {item.selectedDevice} user
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap justify-between items-center">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-teal-400' : 'text-white'}`}>
                            ₹{item.cost.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
