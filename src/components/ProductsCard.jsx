import { useCartStore } from "../stores/cartStore";

export default function ProductsCard({id, price, image, category, name}) {
    // Zustand store
    const { cart, addToCart, removeOnceFromCart } = useCartStore();

    let quantity = cart.cartList.find(item => item.id === id)?.quantity || 0;

    return (
        <section className="products-card">
            <span
                className={"products-card__img" + (quantity > 0 ? " exists-in-cart" : "")}
                style={{ backgroundImage: `url(${image})` }}
                alt=""
            />
            
            {
                quantity > 0 ? (
                    // Buttons Increase/decrease quantity
                    <section className="products-card__btn exists-in-cart">
                        <button
                            className="products-card__quantity-btn"
                            onClick={() => removeOnceFromCart({ id, price })}
                        >
                            <span
                                className="quantity-btn-icon"
                                style={{ backgroundImage: "url('./assets/images/icon-decrement-quantity.svg')" }}
                            ></span>
                        </button>
                        <p>{quantity}</p>
                        <button
                            className="products-card__quantity-btn"
                            onClick={() => addToCart({ id, price })}
                        >
                            <span
                                className="quantity-btn-icon"
                                style={{ backgroundImage: "url('./assets/images/icon-increment-quantity.svg')" }}
                            ></span>
                        </button>
                    </section>
                ) : (
                    // Button Add to cart
                    <button
                        className="products-card__btn"
                        onClick={() => addToCart({ id, price })}
                    >
                        <span
                            className="add-cart-icon"
                            style={{ backgroundImage: "url('./assets/images/icon-add-to-cart.svg')" }}
                        ></span>
                        Add to Cart
                    </button>
                )
            }

            <section className="products-card__info">
                <p className="product-type">{category}</p>
                <h2 className="product-name">{name}</h2>
                <p className="product-price">${price.toFixed(2)}</p>
            </section>
        </section>
    );
}