import { createSlice } from "@reduxjs/toolkit";


const LOCAL_STORAGE_CART_KEY = 'cart'

const getInitialCartItems = () =>{
    const savedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY)
    return savedCart ? JSON.parse(savedCart) : {items : [] }
}

const saveCartToLocalStorage = (cartState) =>{
    localStorage.setItem(LOCAL_STORAGE_CART_KEY,JSON.stringify(cartState))
}
const cartslice =createSlice({
    name:"cart",
    initialState: getInitialCartItems(),
    reducers:{
        addItem:(state,action) =>{
            state.items.push(action.payload)
            saveCartToLocalStorage(state)
        },
        deleteItemCart:(state,action) =>{
            state.items = state.items.filter((items)=> items.id!==action.payload)
            saveCartToLocalStorage(state)
        }
    }

})

export const {addItem , deleteItemCart}  =cartslice.actions;
export default cartslice.reducer;
