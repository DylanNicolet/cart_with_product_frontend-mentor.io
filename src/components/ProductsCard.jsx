export default function ProductsCard(props) {

    function onAddToCart() {
        console.log(props.id);
        
        
    }

    return(
        <section className="products-card">
            <div className="products-card__img" style={{backgroundImage: `url(${props.image})`}} alt="" />

            <button className="products-card__btn products-card__addcart" onClick={onAddToCart}>
                <div className="add-cart-icon" style={{backgroundImage: "url('./assets/images/icon-add-to-cart.svg')"}}></div>
                Add to Cart
            </button>

            <section className="products-card__info">
                <p className="product-type">{props.category}</p>
                <h2 className="product-name">{props.name}</h2>
                <p className="product-price">${props.price}</p>
            </section>
        </section>
    )
}