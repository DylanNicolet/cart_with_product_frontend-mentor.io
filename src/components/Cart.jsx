import emptyCartIcon from "../assets/images/illustration-empty-cart.svg"

export default function Cart() {
	return (
		<section className="cart">
			<h2 className="cart__title">Your Cart (0)</h2>

			<img className="cart__empty-icon" src={emptyCartIcon} />
			<p className="cart__message">Your added items will appear here</p>
		</section>
	)
}