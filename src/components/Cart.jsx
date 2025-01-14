import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCompletlyFromCart } from '../redux/cartSlice';
import emptyCartIcon from "../assets/images/illustration-empty-cart.svg"
import carbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg"
import removeItemsIcon from "../assets/images/icon-remove-item.svg"
import data from "../data.json"

export default function Cart() {
    const dispatch = useDispatch();

    // Access the cartList from Redux
    const cartList = useSelector((state) => state.cart.cartList);
    const cartTotal = useSelector((state) => state.cart.cartTotal);

    const onRemoveItemCompletlyFromCart = (productId, productPrice) => {
        // Remove the product completly from Redux memory
        dispatch(removeCompletlyFromCart({
            id: productId,
            price: productPrice
        }));
    }
    
    return (
        <section className="cart">
            <h2 className="cart__title">Your Cart ({cartList.length})</h2>

            {cartList.length ? 
                <section className='cart-list has-items'>
                    {[...new Set(cartList)].map((itemId, index) => { // Using ...new Set(cartList) ensures each product is rendered only once,
                        // Count the number of repetitions of this itemId in cartList
                        const numberOfRepetitions = cartList.filter(id => id === itemId).length;

                        // Find the item in the data array that matches the cart item ID
                        const product = data.find((product) => product.id === itemId);

                        return (
                            <div key={index} className="cart-list__item">
                                <p className='product_name'>{product.name}</p>
                                <div className="price-line">
                                    <p className="price-line__quantity">{numberOfRepetitions}x</p>
                                    <p className="price-line__price">@ ${product.price.toFixed(2)}</p>
                                    <p className="price-line__total">${(numberOfRepetitions * product.price).toFixed(2)}</p>
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