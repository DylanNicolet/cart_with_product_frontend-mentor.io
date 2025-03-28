import React, { useState, useEffect } from 'react';
import emptyCartIcon from "../assets/images/illustration-empty-cart.svg"
import carbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg"
import removeItemsIcon from "../assets/images/icon-remove-item.svg"
import data from "../data.json"
import { useCartStore } from "../stores/cartStore"

export default function Cart() {
    // Destructured Zustand store
    const { cart: {cartList, cartTotal}, removeCompletlyFromCart } = useCartStore();

    // Total quantity of items in cart
    const totalItemQuantityInCart = cartList.reduce((total, item) => total + item.quantity, 0)
    
    return (
        <section className="cart">
            <h2 className="cart__title">Your Cart ({totalItemQuantityInCart})</h2>

            {cartList.length ? 
                <section className='cart-list has-items'>
                    {cartList.map(({ id, quantity }) => {
                        const product = data.find(product => product.id === id);
                        if (!product) return null; // Prevents rendering undefined products

                        return (
                            <div key={id} className="cart-list__item">
                                <p className="product_name">{product.name}</p>
                                <div className="price-line">
                                    <p className="price-line__quantity">{quantity}x</p>
                                    <p className="price-line__price">@ ${product.price.toFixed(2)}</p>
                                    <p className="price-line__total">
                                        ${(quantity * product.price).toFixed(2)}
                                    </p>
                                </div>
                                <button 
                                    className="btn-remove-from-cart" 
                                    onClick={() => removeCompletlyFromCart(product.id)}
                                >
                                    <img src={removeItemsIcon} alt="" />
                                </button>
                            </div>
                        );
                    })}

                    <div className='cart-list__total'>
                        <p className='title'>Order Total</p>
                        <p className='total'>${cartTotal.toFixed(2)}</p>
                    </div>

                    <div className='cart-list__carbon-neutral'>
                        <img src={carbonNeutralIcon} alt="" />
                        <p>This is a <b>carbon-neutral</b> delivery</p>
                    </div>

                    <button className='cart-list__btn-confirm-order'>Confirm Order</button>
                </section>
                : 
                <section className='cart-list no-items'>
                    <img className="cart-list__empty-icon" src={emptyCartIcon} alt=''/>
                    <p className="cart-list__message">Your added items will appear here</p>
                </section>
            }
        </section>
    )
}