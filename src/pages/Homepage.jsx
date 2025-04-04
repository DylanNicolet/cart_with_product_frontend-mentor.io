import React, { useState, useEffect } from "react";
import ProductsCard from "../components/ProductsCard"
import data from "../data.json"
import Cart from "../components/Cart";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Homepage() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Update screen width on window resize
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Determine the image source based on screen width
    const getImageForScreen = (product) => {
        if (screenWidth < 768) {
            return product.image.mobile; // Mobile
        } else if (screenWidth < 1024) {
            return product.image.tablet; // Tablet
        } else {
            return product.image.desktop; // Desktop
        }
    };

    return (
        <main className="homepage">
            <ConfirmationModal />
            <h1 className="homepage__title">Desserts</h1>

            <section className="product-card-container">
                {data.map((product, index) => (
                    <ProductsCard 
                        key={index}
                        id={product.id}
                        image={getImageForScreen(product)} 
                        name={product.name}
                        category={product.category}
                        price={product.price}
                    />
                ))}
            </section>

            <Cart />
        </main>
    )
}