import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyCart } from './small component/EmptyCart';
import { MdDeleteForever } from "react-icons/md";
import { deleteItemCart } from "../Const/cartslice";
import PaymentOtions from './small component/PaymentOtions';
export const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items)
    const dispatch = useDispatch()
    const finalCartCost = cartItems.reduce((total, currentItem) => total + currentItem.cost, 0);
    const [showPaymentOptions ,setShowPaymentOptions] = useState(false)
    const [ cartItemsForPayment, setCartItemsForPayment] = useState()

    const deleteItem = (id) => {
        
        dispatch(deleteItemCart(id))
    }

    function buyNow() {
        const data =cartItems.map((items)=>{
            return [items.name,items.selectedDevice,items.selectedMonth]
        })
        setCartItemsForPayment(data)
        setShowPaymentOptions(true)
    }

    return (
        <div className='px-8 md:px-64 py-6  max-md:p-0'>
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className='m-4 p-4 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg shadow-lg hover:shadow-2xl transform  transition-all duration-300 ease-in-out'>
                        <div className='flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-8'>
                            <div className="w-56 md:w-64">
                                <img className='w-full h-[150px] rounded-3xl object-cover' src={item.image} alt={item.name} />
                            </div>
                            <div className='flex flex-row flex-grow'>
                                <div className='flex flex-col justify-between flex-grow'>
                                    <span className='text-2xl font-extrabold text-white'>{item.name}</span>
                                    <span className='text-lg text-gray-200'>{item.month} month</span>
                                    <span className='text-lg text-gray-200'>{item.selectedDevice} user</span>
                                    <span className='text-lg text-gray-200'>Cost: {item.cost}</span>
                                </div>
                                <div className='flex items-center'>
                                    <MdDeleteForever className='h-10 w-10 text-red-600 hover:text-red-800 hover:scale-150 transition-colors duration-200 cursor-pointer' onClick={() => deleteItem(item.id)} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className='flex flex-col mt-10 text-center'>
                <span className='text-3xl font-bold text-gray-900'>Total Cost: {finalCartCost}</span>
                <button className='mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md
             hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out' onClick={() => buyNow()}>Buy Now</button>
             {
                showPaymentOptions && <PaymentOtions cartItems =  {cartItemsForPayment}/>
             }
            
            </div>
        </div>

    );


}
