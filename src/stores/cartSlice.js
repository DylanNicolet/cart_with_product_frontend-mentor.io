//import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartList: [], // Initial state is an empty array
//     // Example of an item stored in cartList
//     // {
//     //   id: 1,
//     //   price: 0,
//     //   quantity: 0,
//     // }
//     cartTotal: 0,
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, price } = action.payload;

//       // Check if the product already exists in the cart
//       const existingItem = state.cartList.find(item => item.id === id);
    
//       if (existingItem) {
//         // If product exists, increment the quantity
//         existingItem.quantity += 1;
//       } else {
//         // If product does not exist, add it
//         state.cartList.push({ id, price, quantity: 1 });
//       }
    
//       // Update the cart total
//       state.cartTotal += price;
//     },
//     removeCompletlyFromCart: (state, action) => {
//       // Calculate how many of this items exist in the cart
//       let numberOfRepetitions = state.cartList.filter(id => id === action.payload.id).length;
//       // Calculate total price of this item
//       let totalPriceOfThisItem = action.payload.price * numberOfRepetitions;

//       // Remove total price from cart total
//       state.cartTotal = state.cartTotal - totalPriceOfThisItem;
//       // Remove a product from the cart by ID
//       state.cartList = state.cartList.filter((id) => id !== action.payload.id);
//     },
//     clearCart: (state) => {
//       // Clear the entire cart
//       state.cartList = [];
//     },
//   },
// });

//export const { addToCart, removeCompletlyFromCart, clearCart } = cartSlice.actions;
//export default cartSlice.reducer;