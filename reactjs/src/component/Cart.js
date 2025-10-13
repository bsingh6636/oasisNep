import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyCart } from './small component/EmptyCart';
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { deleteItemCart } from "../Const/cartslice";
import PaymentOtions from './small component/PaymentOtions';
import { MyContext } from '../App';

export const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items)
    const {isDarkMode} = useContext(MyContext);
    const dispatch = useDispatch()
    const finalCartCost = cartItems.reduce((total, currentItem) => total + currentItem.cost, 0);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false)
    const [cartItemsForPayment, setCartItemsForPayment] = useState()

    const deleteItem = (id) => {
        console.log(id)
        dispatch(deleteItemCart(id))
    }

    function buyNow() {
        const data = cartItems.map((items) => {
            return [items.name, items.selectedDevice, items.selectedMonth]
        })
        setCartItemsForPayment(data)
        setShowPaymentOptions(true)
    }

    console.log(cartItems)

    return (
        <div className={`h-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header with dark mode toggle */}
            {/* <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md px-4 py-3 mb-4 transition-colors duration-300`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaShoppingCart className={`h-6 w-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`} />
                        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Shopping Cart</h1>
                    </div>
                </div>
            </div> */}

            {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20"> */}
                {/* Cart Items */}
                <div className="mb-8">
                    {cartItems.length === 0 ? (
                        <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg transition-colors duration-300`}>
                            <EmptyCart />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div 
                                    key={item.Id} 
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
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart Summary & Checkout */}
                {cartItems.length > 0 && (
                    <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} shadow-lg transition-colors duration-300`}>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <div className="mb-4 sm:mb-0 text-center sm:text-left">
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</p>
                                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{finalCartCost.toLocaleString()}</p>
                                </div>
                                <button 
                                    onClick={() => buyNow()} 
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
                )}

                {/* Payment Options Modal */}
                {showPaymentOptions && (
                    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isDarkMode ? 'bg-black/75' : 'bg-gray-800/75'}`}>
                        <div className={`w-full max-w-md mx-4 rounded-xl shadow-2xl overflow-hidden transform transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-center">
                                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Select Payment Method</h3>
                                    <button 
                                        onClick={() => setShowPaymentOptions(false)} 
                                        className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                    >
                                        <svg className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <PaymentOtions cartItems={cartItemsForPayment} isDarkMode={isDarkMode} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        // </div>
    );
};