import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the cart item type
interface CartItem {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image: string;
    description?: string;
    priceId?: string; // if Stripe Products API is used
}

// Define the initial state type
interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
}

// Initial state
const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemToRemove = state.items.find(item => item.id === action.payload);

            if (itemToRemove) {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
                state.totalQuantity -= itemToRemove.quantity;
            }
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                } else {
                    state.items = state.items.filter(i => i.id !== item.id);
                }
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }
    },
});