import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { EmptyCart } from './small component/EmptyCart';
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { removeItem, clearCart } from "../redux/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const finalCartCost = cartItems.reduce((total, currentItem) => total + parseFloat(currentItem.price), 0);

    const handleRemoveItem = (item) => {
        dispatch(removeItem({ id: item.id }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        if (isLoggedIn) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 mb-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaShoppingCart className="h-6 w-6 text-teal-500" />
                        <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
                    </div>
                    {cartItems.length > 0 && (
                        <button onClick={handleClearCart} className="text-sm text-red-500 hover:text-red-700">
                            Clear Cart
                        </button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mb-8">
                    {cartItems.length === 0 ? (
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <EmptyCart />
                            <div className="text-center mt-4">
                                <Link to="/prices" className="text-blue-500 hover:underline">Browse Services</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="rounded-xl shadow-lg overflow-hidden bg-white">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="w-full sm:w-1/4 lg:w-1/5">
                                            <img className="w-full h-full object-cover" src={item.imageUrl || "/api/placeholder/400/250"} alt={item.name} />
                                        </div>
                                        <div className="flex-1 p-4 sm:p-6 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{item.name}</h3>
                                                <button onClick={() => handleRemoveItem(item)} className="p-2 rounded-full text-red-500 hover:bg-gray-100">
                                                    <MdDeleteForever className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-600">{item.description}</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t flex justify-end items-center">
                                                <span className="text-lg font-bold text-gray-800">NPR {item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <div className="mb-4 sm:mb-0 text-center sm:text-left">
                                    <p className="text-sm text-gray-600">Total ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</p>
                                    <p className="text-2xl font-bold text-gray-900">NPR {finalCartCost.toFixed(2)}</p>
                                </div>
                                <button onClick={handleCheckout} className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-md bg-blue-500 text-white hover:bg-blue-600">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;