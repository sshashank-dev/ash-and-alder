import React, { useState } from 'react';
import { ShoppingBag, X, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

export default function CollectionPage({ cartItems = [], updateQuantity, removeFromCart }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => {
        const numericPrice = typeof item.price === 'string'
            ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0
            : item.price;
        return sum + numericPrice * item.quantity;
    }, 0);

    return (
        <div className="relative min-h-screen bg-[#f2f1ed] text-black font-mono pb-20 selection:bg-black selection:text-white">
            <header className="p-6 bg-[#f2f1ed]/90 backdrop-blur-md border-b border-black/10 sticky top-0 z-30 flex justify-between items-center">
                <h1 className="text-sm font-black tracking-[0.25em] uppercase">ASH & ALDER // COLLECTION</h1>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <p className="text-[10px] tracking-widest text-black/60 uppercase">Browse archive items below...</p>
            </main>

            {/* FLOATING CART BUTTON */}
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="fixed bottom-8 right-8 z-40 bg-black text-white px-5 py-4 rounded-full shadow-2xl hover:bg-zinc-800 transition-all duration-300 flex items-center gap-3 cursor-pointer group border border-white/10"
                aria-label="Open Cart"
            >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                    CART {totalItems > 0 && `[${totalItems}]`}
                </span>
            </button>

            {/* BACKGROUND OVERLAY */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}

            {/* SLIDING CART DRAWER */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#f2f1ed] text-black z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col border-l border-black/15 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Drawer Header */}
                <div className="p-6 border-b border-black/15 flex items-center justify-between bg-[#f2f1ed]">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-4 h-4" />
                        <h2 className="text-[11px] font-black tracking-[0.2em] uppercase">
                            YOUR CART [{totalItems}]
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-[10px] font-bold tracking-widest uppercase hover:opacity-60 transition-opacity cursor-pointer p-2"
                    >
                        ✕ CLOSE
                    </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-28 text-black/40 flex flex-col items-center justify-center">
                            <ShoppingBag className="w-10 h-10 mx-auto mb-4 stroke-[1]" />
                            <p className="text-[10px] uppercase tracking-[0.2em]">Your cart is currently empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item, index) => {
                            const itemPrice = typeof item.price === 'string' ? item.price : `$${item.price}`;
                            return (
                                <div key={`${item.id}-${item.size || 'default'}`} className="flex gap-4 items-start pb-6 border-b border-black/10 group">
                                    <div className="w-20 h-24 bg-black/5 overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between h-24">
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">{item.name}</h3>
                                            {item.size && (
                                                <p className="text-[9px] uppercase tracking-widest text-black/50 mb-1">
                                                    SIZE: {item.size}
                                                </p>
                                            )}
                                            <p className="text-xs font-bold tracking-widest text-black/90">{itemPrice}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border border-black/20 bg-white">
                                                <button
                                                    onClick={() => updateQuantity && updateQuantity(index, -1)}
                                                    className="px-2 py-0.5 text-[10px] hover:bg-black/5 cursor-pointer"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-2.5 text-[10px] font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity && updateQuantity(index, 1)}
                                                    className="px-2 py-0.5 text-[10px] hover:bg-black/5 cursor-pointer"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[9px] uppercase tracking-widest text-black/40 hover:text-black transition-colors cursor-pointer flex items-center gap-1"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Drawer Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-black/15 bg-[#f2f1ed] space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                            <span className="text-black/60">SUBTOTAL</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <a
                            href="/cart"
                            onClick={(e) => {
                                // e.preventDefault(); // Uncomment if using SPA routing
                                setIsDrawerOpen(false);
                            }}
                            className="w-full bg-black text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-xl"
                        >
                            <span>PROCEED TO CHECKOUT</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}