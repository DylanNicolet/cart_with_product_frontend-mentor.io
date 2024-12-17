export default function ProductsCard() {
	return(
		<section className="products-card">
			<img className="products-card__img" src="" alt="" />

			<button className="products-card__addcart">
				Add to cart
			</button>

			<section className="products-card__info">
				<p className="product-type">Waffle</p>
				<h2 className="product-name">Waffle with Berries</h2>
				<p className="product-price">$6.50</p>
			</section>
		</section>
	)
}