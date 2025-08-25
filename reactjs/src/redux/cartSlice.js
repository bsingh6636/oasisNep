import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_CART_KEY = 'cart';

const getInitialCartItems = () => {
    try {
        const savedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        return savedCart ? JSON.parse(savedCart) : { items: [] };
    } catch (e) {
        console.error("Could not parse cart from localStorage", e);
        return { items: [] };
    }
};

const saveCartToLocalStorage = (cartState) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartState));
    } catch (e) {
        console.error("Could not save cart to localStorage", e);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: getInitialCartItems(),
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.items.push(action.payload);
                saveCartToLocalStorage(state);
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state);
        }
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
