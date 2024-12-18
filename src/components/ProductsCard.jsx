export default function ProductsCard(props) {
    return(
        <section className="products-card">
            <div className="products-card__img" style={{backgroundImage: `url(${props.image})`}} alt="" />

            <button className="products-card__addcart">
                Add to cart
            </button>

            <section className="products-card__info">
                <p className="product-type">{props.name}</p>
                <h2 className="product-name">{props.category}</h2>
                <p className="product-price">${props.price}</p>
            </section>
        </section>
    )
}