import React, { useState, useEffect } from "react";
import ProductsCard from "../components/ProductsCard"
import data from "../data.json"

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
        <main>
            <h1>Desserts</h1>

            {data.map((product) => (
                <ProductsCard 
                    key={product.price}
                    image={getImageForScreen(product)} 
                    name={product.name}
                    category={product.category}
                    price={product.price}
                />
            ))}
        </main>
    )
}