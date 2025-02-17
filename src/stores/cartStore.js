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
            })
        }),
        {
            name: 'cart-storage',
        },
    ),
)