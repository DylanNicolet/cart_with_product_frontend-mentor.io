import React, { useState, useEffect } from 'react';
import emptyCartIcon from "../assets/images/illustration-empty-cart.svg"
import carbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg"
import removeItemsIcon from "../assets/images/icon-remove-item.svg"
import data from "../data.json"
import { useCartStore } from "../stores/cartStore"

export default function Cart() {
    // Access the cartList from Redux
    // const cartList = useSelector((state) => state.cart.cartList);
    // const cartTotal = useSelector((state) => state.cart.cartTotal);

    const cartList = useCartStore((state) => state.cart.cartList)
    const cartTotal = useCartStore((state) => state.cart.cartTotal)

    const onRemoveItemCompletlyFromCart = (productId, productPrice) => {
        // Remove the product completly from Redux memory
        // dispatch(removeCompletlyFromCart({
        //     id: productId,
        //     price: productPrice
        // }));
    }
    
    return (
        <section className="cart">
            <h2 className="cart__title">Your Cart ({cartList.length})</h2>

            {cartList.length ? 
                <section className='cart-list has-items'>
                    {[...new Set(cartList)].map((item, index) => { // Using ...new Set(cartList) ensures each product is rendered only once,
                        // Count the number of repetitions of this item in cartList
                        const numberOfRepetitions = cartList.filter(id => id === item.id).length;

                        // Find the item in the data array that matches the cart item ID
                        const product = data.find((product) => product.id === item.id);

                        return (
                            <div key={index} className="cart-list__item">
                                <p className='product_name'>{product.name}</p>
                                <div className="price-line">
                                    <p className="price-line__quantity">{item.quantity}x</p>
                                    <p className="price-line__price">@ ${product.price.toFixed(2)}</p>
                                    <p className="price-line__total">${(item.quantity * product.price).toFixed(2)}</p>
                                </div>
                                <img src={removeItemsIcon} className='btn-remove-from-cart' onClick={(e) => onRemoveItemCompletlyFromCart(product.id, product.price)} />
                            </div>
                        )
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