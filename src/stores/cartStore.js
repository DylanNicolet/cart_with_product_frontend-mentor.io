import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart : {
                cartList: [],
                cartTotal: 0,
            },
            // Add new item to cart
            addToCart: (product) => set((state) => {
                const existingProductIndex = state.cart.cartList.findIndex(item => item.id === product.id);
                let updatedCartList;
                
                if (existingProductIndex !== -1) {
                    // If the product exists, update the quantity
                    updatedCartList = state.cart.cartList.map((item, index) => 
                        index === existingProductIndex 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                    );
                } else {
                    // If the product does not exist, add it to the cart
                    updatedCartList = [...state.cart.cartList, { id: product.id, price: product.price, quantity: 1 }];
                }
                
                // Update the cart total
                const updatedCartTotal = state.cart.cartTotal + product.price;
                
                // Return the updated cart state
                return {
                    cart: {
                        cartList: updatedCartList,
                        cartTotal: updatedCartTotal,
                    }
                };
            }),
            // Remove an item once from cart (reduce quantity by 1)
            removeOnceFromCart: (product) => set((state) => {
                const existingProductIndex = state.cart.cartList.findIndex(item => item.id === product.id);
                
                if (existingProductIndex === -1) {
                    return state; // No changes if product is not in the cart
                }
            
                const updatedCartList = state.cart.cartList
                    .map((item, index) => index === existingProductIndex ? { ...item, quantity: item.quantity - 1 } : item)
                    .filter(item => item.quantity > 0); // Remove items with quantity 0
            
                const updatedCartTotal = Math.max(state.cart.cartTotal - product.price, 0); // Ensure total doesn't go negative
            
                return {
                    cart: {
                        cartList: updatedCartList,
                        cartTotal: updatedCartTotal,
                    }
                };
            }),
            // Remove an item from cart
            // removeCompletlyFromCart: (productId) => set((state) => {
            //     const productToRemove = state.cart.cartList.find(item => item.id === productId);
            //     const updatedCartList = state.cart.cartList.filter(item => item.id !== productId);
            //     const updatedCartTotal = state.cart.cartTotal - (productToRemove.price * productToRemove.quantity);
                
            //     return {
            //         cart: {
            //             cartList: updatedCartList,
            //             cartTotal: updatedCartTotal,
            //         }
            //     };
            // }),
        }),
        {
            name: 'cart-storage',
        },
    ),
)