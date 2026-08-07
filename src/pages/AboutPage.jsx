import React, { useState, useRef } from "react";
import axios from "axios";

export function AboutPage({ onClose, onOpenAbout, onOpenContact }) {
    const containerRef = useRef(null);

    // Newsletter state
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setNewsletterLoading(true);
        setNewsletterMessage("");

        try {
            const response = await axios.post("http://localhost:5000/api/newsletter", { email: newsletterEmail });
            if (response.data.success) {
                setNewsletterMessage("SUBSCRIBED SUCCESSFULLY!");
                setNewsletterEmail("");
            }
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            setNewsletterMessage(error.response?.data?.message || "FAILED TO SUBSCRIBE.");
        } finally {
            setNewsletterLoading(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-y-auto bg-white text-black font-mono selection:bg-black selection:text-white"
        >

            {/* Top Navigation */}
            <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-black/10 px-6 sm:px-12 py-5 flex items-center justify-between">
                <button
                    onClick={() => {
                        console.log("Logo clicked - navigating home");
                        onClose();
                    }}
                    className="text-xl sm:text-2xl font-black tracking-[0.3em] uppercase bg-transparent border-none p-0 cursor-pointer hover:opacity-75 transition-opacity text-left"
                >
                    ASH & ALDER
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-12 py-24">

                {/* Header Title Section with Bold Ash & Alder */}
                <div className="mb-16 border-b border-black/15 pb-10">
                    <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                        ASH & ALDER
                    </h1>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-black/60 font-bold">
                        Independent Streetwear Brand  Est. 2026
                    </p>
                </div>

                {/* Main Content Layout about Clothing & Streetwear */}
                <div className="space-y-8 text-sm leading-relaxed text-black/90 font-mono">
                    <div className="border-l-2 border-black pl-6 py-2">
                        <p className="text-lg sm:text-xl font-black uppercase tracking-tight text-black leading-snug">
                            We are brand new. This platform operates as an independent streetwear brand and digital preview space.
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-medium">
                        Ash & Alder was built from the ground up to design and drop physical apparel, heavy technical outerwear, and unique wardrobe staples. Our focus is entirely on crafting clean cuts, premium fabrics, and distinct graphics that push modern streetwear forward.
                    </p>

                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-medium">
                        Every piece and lookbook drop featured here is part of our initial collection cycle, giving you an early look at what we are putting out into the physical world.
                    </p>

                    <div className="pt-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-black mb-1">
                            Come through & check the gear.
                        </p>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                            One.
                        </p>
                    </div>
                </div>

            </div>

            {/* Footer Section */}
            <footer className="mt-32 border-t border-black/15 px-6 sm:px-12 py-16 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                    <div className="flex flex-col space-y-3 text-[10px] uppercase tracking-widest text-black/70 font-bold">
                        <span className="hover:text-black transition-colors cursor-pointer">Stay in the Know</span>
                        <span className="hover:text-black transition-colors cursor-pointer">Lookbook Archive</span>
                        <span
                            onClick={() => { if (onOpenAbout) onOpenAbout(); }}
                            className="hover:text-black transition-colors cursor-pointer"
                        >
                            About Brand
                        </span>
                        <span
                            onClick={() => { if (onOpenContact) onOpenContact(); }}
                            className="hover:text-black transition-colors cursor-pointer"
                        >
                            Contact Us
                        </span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2">Know the Ledge.</h3>
                        <p className="text-[10px] uppercase tracking-wider text-black/60 mb-4 max-w-xs font-bold">
                            Stay in the mix with new clothing drops and collection updates.
                        </p>

                        {newsletterMessage && (
                            <p className="text-[9px] font-black uppercase tracking-widest text-black mb-3">
                                {newsletterMessage}
                            </p>
                        )}

                        <form onSubmit={handleSubscribe} className="flex w-full max-w-sm shadow-sm">
                            <input
                                type="email"
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="ENTER EMAIL"
                                className="bg-white border border-black/30 px-4 py-3 text-[10px] uppercase tracking-widest outline-none w-full text-black placeholder:text-black/30 focus:border-black font-bold transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={newsletterLoading}
                                className="bg-black text-white px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                            >
                                {newsletterLoading ? "..." : "JOIN"}
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col md:items-end text-left md:text-right text-[10px] uppercase tracking-widest text-black/70 space-y-1 font-bold">
                        <span>Ash & Alder Studio</span>
                        <span>Clothing Division</span>
                        <span>Delhi INDIA / Remote</span>
                    </div>

                </div>
            </footer>
        </div>
    );
}