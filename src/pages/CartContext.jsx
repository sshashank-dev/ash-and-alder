import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Robust subtotal calculation handling numbers and string prices safely
    const subtotal = cart.reduce((total, item) => {
        const numericPrice = typeof item.price === 'number'
            ? item.price
            : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;

        return total + (numericPrice * item.quantity);
    }, 0);

    const addToCart = (newItem) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(
                (item) => item.id === newItem.id && item.size === newItem.size
            );
            if (existingIndex > -1) {
                const updated = [...prevCart];
                updated[existingIndex].quantity += newItem.quantity;
                return updated;
            }
            return [...prevCart, newItem];
        });
    };

    const updateQuantity = (index, delta) => {
        setCart((prevCart) => {
            const updated = [...prevCart];
            const newQty = updated[index].quantity + delta;
            if (newQty <= 0) {
                return updated.filter((_, i) => i !== index);
            }
            updated[index].quantity = newQty;
            return updated;
        });
    };

    const removeFromCart = (id, size) => {
        setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, subtotal, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}