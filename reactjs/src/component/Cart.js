import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyCart } from './small component/EmptyCart';
import { MdDeleteForever } from "react-icons/md";
import { deleteItemCart } from "../Const/cartslice";
import PaymentOtions from './small component/PaymentOtions';
import { MyContext } from '../App';

export const Cart = () => {
    return <FlipkartCartUnified />;
};