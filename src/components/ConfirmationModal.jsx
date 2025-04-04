import data from "../data.json"
import { useCartStore } from "../stores/cartStore"
import confirmationIcon from "../assets/images/icon-order-confirmed.svg"

export default function ConfirmationModal() {
    // Destructured Zustand store
    const { cart: {cartList, cartTotal} } = useCartStore();

    return (
        <section id="ConfirmationModal-overlay">
            <dialog open id="ConfirmationModal">
                <header>
                    <img src={confirmationIcon} alt="" className="confirmation-icon" />
                    <h2 className="modal-title">Order<br />Confirmed</h2>
                    <p className="modal-subtitle">We hope you enjoy your food!</p>
                </header>

                <main className="ordered-items-container">
                    <ul>
                        {cartList.map(({ id, quantity }) => {
                            const product = data.find(product => product.id === id);
                            if (!product) return null; // Prevents rendering undefined products

                            return (
                                <li key={id} className="ordered-item">
                                    <span
                                        className="product-image"
                                        style={{ backgroundImage: `url(${product.image.thumbnail})` }}
                                        alt=""
                                    />
                                    <section className="info-container">
                                        <p className="product-name">{product.name}</p>
                                        <p className="product-quantity">{quantity}x</p>
                                        <p className="product-price">@${product.price.toFixed(2)}</p>
                                    </section>
                                    <p className="product-total">${(quantity * product.price).toFixed(2)}</p>
                                </li>
                            )         
                        })}
                    </ul>

                    <section className='cart-list__total'>
                        <p className='title'>Order Total</p>
                        <p className='total'>${cartTotal.toFixed(2)}</p>
                    </section>
                </main>

                <footer>
                    <button id="close-ConfirmationModal">Start New Order</button>
                </footer>
            </dialog>
        </section>
    )
}