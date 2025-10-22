import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyCart } from './small component/EmptyCart';
import { deleteItemCart } from '../Const/cartslice';
import { MyContext } from '../App';
import CartItem from './small component/CartItem';
import CartSummary from './small component/CartSummary';
import PaymentModal from './small component/PaymentModal';

export const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const { isDarkMode } = useContext(MyContext);
    const dispatch = useDispatch();
    const finalCartCost = cartItems.reduce((total, currentItem) => total + currentItem.cost, 0);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [cartItemsForPayment, setCartItemsForPayment] = useState();

    const deleteItem = (id) => {
        dispatch(deleteItemCart(id));
    };

    function buyNow() {
        const data = cartItems.map((items) => {
            return [items.name, items.selectedDevice, items.selectedMonth];
        });
        setCartItemsForPayment(data);
        setShowPaymentOptions(true);
    }

    return (
        <div className={`h-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mb-8">
                    {cartItems.length === 0 ? (
                        <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg transition-colors duration-300`}>
                            <EmptyCart />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.Id}
                                    item={item}
                                    deleteItem={deleteItem}
                                    isDarkMode={isDarkMode}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <CartSummary
                        cartItems={cartItems}
                        finalCartCost={finalCartCost}
                        buyNow={buyNow}
                        isDarkMode={isDarkMode}
                    />
                )}

                <PaymentModal
                    showPaymentOptions={showPaymentOptions}
                    setShowPaymentOptions={setShowPaymentOptions}
                    cartItemsForPayment={cartItemsForPayment}
                    isDarkMode={isDarkMode}
                />
            </div>
        </div>
    );
};