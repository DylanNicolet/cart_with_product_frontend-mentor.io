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
                const updatedCartList = state.cart.cartList.map(item => 
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );

                // If the product does not exist in the cart, add it
                const isProductInCart = updatedCartList.some(item => item.id === product.id);
                if (!isProductInCart) {
                    updatedCartList.push({ id: product.id, price: product.price, quantity: 1 });
                }

                const updatedCartTotal = updatedCartList.reduce((total, item) => total + (item.price * item.quantity), 0);

                return {
                    cart: {
                        cartList: updatedCartList,
                        cartTotal: updatedCartTotal,
                    }
                };
            }),
            // Remove an item once from cart (reduce quantity by 1)
            removeOnceFromCart: (product) => set((state) => {
                const updatedCartList = state.cart.cartList.reduce((acc, item) => {
                    if (item.id === product.id) {
                        // If the product exists, reduce its quantity
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 });
                        }
                    } else {
                        // Otherwise, just keep the item
                        acc.push(item);
                    }
                    return acc;
                }, []);

                const updatedCartTotal = updatedCartList.reduce((total, item) => total + (item.price * item.quantity), 0);

                return {
                    cart: {
                        cartList: updatedCartList,
                        cartTotal: updatedCartTotal,
                    }
                };
            }),
            // Remove an item from cart completly
            removeCompletlyFromCart: (productId) => set((state) => {
                const updatedCartList = state.cart.cartList.filter(item => item.id !== productId);
                const updatedCartTotal = updatedCartList.reduce((total, item) => total + (item.price * item.quantity), 0);
            
                return {
                    cart: {
                        cartList: updatedCartList,
                        cartTotal: updatedCartTotal,
                    }
                };
            }),
        }),
        {
            name: 'cart-storage',
        },
    ),
)