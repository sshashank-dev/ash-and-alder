import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";

export function Product({ product, onBack, onNavigateToCheckout, onOpenCart }) {
    const [selectedSize, setSelectedSize] = useState("M");
    const [added, setAdded] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const { cart, addToCart } = useCart();

    const handleBack = () => {
        setIsExiting(true);
        setTimeout(() => {
            onBack();
        }, 300);
    };

    const handleAddToCartAction = (itemToAdd = product, customSize = selectedSize) => {
        if (!itemToAdd) return;

        addToCart({
            ...itemToAdd,
            size: customSize,
            quantity: 1,
        });

        if (itemToAdd.id === product?.id) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (!product) {
        return (
            <div className={`w-full h-screen bg-[#f2f1ed] text-black font-mono flex flex-col items-center justify-center transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}>
                <p className="text-xs uppercase tracking-widest mb-4">No product selected.</p>
                <button
                    onClick={handleBack}
                    className="bg-black text-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div
            className={`fixed inset-0 z-50 w-full h-screen bg-[#f2f1ed] text-black font-mono overflow-y-auto selection:bg-black selection:text-white transition-all duration-300 ease-out transform ${isExiting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
        >
            {/* TOP NAVIGATION BAR WITH CART BUTTON */}
            <div className="sticky top-0 z-40 bg-[#f2f1ed]/90 backdrop-blur-md px-6 py-5 grid grid-cols-3 items-center border-b border-black/15">
                <div className="flex justify-start">
                    <button
                        onClick={handleBack}
                        className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-60 transition-opacity cursor-pointer"
                    >
                        ← BACK TO COLLECTION
                    </button>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex items-center gap-2.5 cursor-pointer">
                        <span className="text-base sm:text-lg font-black tracking-[0.25em] uppercase text-black">
                            ASH
                        </span>
                        <span className="text-xs font-extrabold tracking-widest text-black/40">
                            &
                        </span>
                        <span className="text-base sm:text-lg font-black tracking-[0.25em] uppercase text-black">
                            ALDER
                        </span>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-6">
                    <span className="hidden sm:inline text-[10px] font-bold tracking-[0.2em] uppercase text-black/60">
                        ARCHIVE REF {product.id}
                    </span>
                    <button
                        onClick={onOpenCart}
                        className="relative text-[10px] font-bold tracking-[0.2em] uppercase bg-black text-white px-4 py-2 hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                    >
                        <span>CART</span>
                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">
                            {totalCartItems}
                        </span>
                    </button>
                </div>
            </div>

            {/* PRODUCT DETAIL CONTAINER */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 space-y-4">
                    <div className="relative w-full h-[600px] sm:h-[750px] bg-[#f2f1ed] overflow-hidden flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col sticky top-24">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 mb-2">
                        STOCKED ITEM
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-black mb-4 leading-tight">
                        {product.name}
                    </h1>
                    <p className="text-lg font-bold text-black/90 tracking-widest mb-6">
                        {product.price}
                    </p>

                    <div className="w-full h-[1px] bg-black/15 mb-6" />

                    <p className="text-[11px] uppercase tracking-wider text-black/70 leading-relaxed mb-8">
                        {product.desc || "Engineered with high-density technical weaves, structural reinforcement, and rigorous minimalist tailoring for everyday functional wear."}
                    </p>

                    {/* SIZE SELECTOR */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">
                                SELECT SIZE
                            </span>
                            <span className="text-[9px] uppercase tracking-widest text-black/50 cursor-pointer hover:underline">
                                SIZE GUIDE
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {["S", "M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 text-[10px] font-bold tracking-widest uppercase border transition-all cursor-pointer ${selectedSize === size
                                        ? "bg-black text-white border-black"
                                        : "bg-transparent text-black border-black/20 hover:border-black"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleAddToCartAction(product, selectedSize)}
                        className="w-full bg-black text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer shadow-xl mb-4"
                    >
                        {added ? "ADDED TO CART [✔]" : "ADD TO CART"}
                    </button>

                    <div className="mt-8 space-y-3 text-[9px] uppercase tracking-widest text-black/60 border-t border-black/10 pt-6">
                        <div className="flex justify-between">
                            <span>SHIPPING</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between">
                            <span>RETURNS</span>
                            <span>14-day rigorous exchange policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}