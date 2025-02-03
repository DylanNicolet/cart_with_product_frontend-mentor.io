import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart : {
                cartList: [],
                cartTotal: 69,
            },
            // Add new item to cart
            addToCart : () => set({})
        }),
        {
            name: 'cart-storage',
        },
    ),
)