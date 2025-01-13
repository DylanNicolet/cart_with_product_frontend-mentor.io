import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [], // Initial state is an empty array
    cartTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // Add a product to the cart
      state.cartList.push(action.payload.id);
      // Add product price to cart total
      state.cartTotal = state.cartTotal + action.payload.price;
    },
    removeCompletlyFromCart: (state, action) => {
      // Calculate how many of this items exist in the cart
      let numberOfRepetitions = state.cartList.filter(id => id === action.payload.id).length;
      // Calculate total price of this item
      let totalPriceOfThisItem = action.payload.price * numberOfRepetitions;

      // Remove total price from cart total
      state.cartTotal = state.cartTotal - totalPriceOfThisItem;
      // Remove a product from the cart by ID
      state.cartList = state.cartList.filter((id) => id !== action.payload.id);
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.cartList = [];
    },
  },
});

export const { addToCart, removeCompletlyFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;