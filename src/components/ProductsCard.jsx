import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function ProductsCard(props) {
const dispatch = useDispatch();

function onAddToCart() {
    // Dispatch the product to the cart
    dispatch(addToCart({
        id: props.id,
        price: props.price
    }));
}

return (
    <section className="products-card">
    <div
        className="products-card__img"
        style={{ backgroundImage: `url(${props.image})` }}
        alt=""
    />

    <button
        className="products-card__btn products-card__addcart"
        onClick={onAddToCart}
    >
        <div
        className="add-cart-icon"
        style={{ backgroundImage: "url('./assets/images/icon-add-to-cart.svg')" }}
        ></div>
        Add to Cart
    </button>

    <section className="products-card__info">
        <p className="product-type">{props.category}</p>
        <h2 className="product-name">{props.name}</h2>
        <p className="product-price">${props.price.toFixed(2)}</p>
    </section>
    </section>
);
}