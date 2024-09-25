import { configureStore } from "@reduxjs/toolkit";
import  cartReducer from "./cartslice"
const reduxstore = configureStore({
    reducer : {
        cart:cartReducer
    }
})

export default reduxstore;