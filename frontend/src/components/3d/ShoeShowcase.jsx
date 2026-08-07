// ShoeShowcase.jsx
import React from "react";
import { motion } from "framer-motion";

export function ShoeShowcase() {
    const shoes = [
        { id: 1, name: "Sneaker A", image: "/images/shoe1.png" },
        { id: 2, name: "Sneaker B", image: "/images/shoe2.png" },
    ];

    return (
        <div style={{
            display: 'flex',
            overflow: 'hidden', // Forces it not to scroll
            width: '100%'
        }}>
            {shoes.map((shoe) => (
                <motion.div
                    key={shoe.id}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{ width: '200px' }}
                >
                    <img src={shoe.image} alt={shoe.name} style={{ width: '100%' }} />
                </motion.div>
            ))}
        </div>
    );
}