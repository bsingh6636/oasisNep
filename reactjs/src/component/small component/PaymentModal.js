
import React from 'react';
import PaymentOtions from './PaymentOtions';

const PaymentModal = ({ showPaymentOptions, setShowPaymentOptions, cartItemsForPayment, isDarkMode }) => {
    if (!showPaymentOptions) return null;

    return (
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
    );
};

export default PaymentModal;
