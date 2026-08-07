import React, { useState } from "react";
import axios from "axios";

export function ContactPage({ onClose, onOpenAbout, onOpenContact }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    // Newsletter state
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage("");

        try {
            const response = await axios.post("http://localhost:5000/api/contact", formData);
            if (response.data.success) {
                setStatusMessage("MESSAGE SENT SUCCESSFULLY!");
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error("Contact submission error:", error);
            setStatusMessage(error.response?.data?.message || "FAILED TO SEND MESSAGE. TRY AGAIN.");
        } finally {
            setLoading(false);
        }
    };

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
        <div className="absolute inset-0 z-50 overflow-y-auto bg-white text-black font-mono selection:bg-black selection:text-white">

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

                {/* Header Title Section */}
                <div className="mb-16 border-b border-black/15 pb-10">
                    <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                        CONTACT
                    </h1>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-black/60 font-bold">
                        Get in Touch  Inquiries & Support
                    </p>
                </div>

                {/* Contact Information & Form Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono">

                    <div className="space-y-8">
                        <div className="border-l-2 border-black pl-6 py-2">
                            <p className="text-lg sm:text-xl font-black uppercase tracking-tight text-black leading-snug">
                                Drop us a line for collaborations, order inquiries, or general info.
                            </p>
                        </div>

                        <div className="space-y-4 text-xs tracking-wider uppercase text-black/80 font-bold">
                            <div>
                                <span className="text-black/40 block mb-1">Direct Email</span>
                                <span className="text-black">support@ashandalder.com</span>
                            </div>
                            <div>
                                <span className="text-black/40 block mb-1">Studio Headquarters</span>
                                <span className="text-black">Delhi, India // Remote</span>
                            </div>
                            <div>
                                <span className="text-black/40 block mb-1">Response Time</span>
                                <span className="text-black">Within 24-48 Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {statusMessage && (
                            <div className="p-3 bg-black text-white text-[10px] font-bold tracking-widest uppercase text-center">
                                {statusMessage}
                            </div>
                        )}

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="ENTER NAME"
                                className="bg-[#fafafa] border border-black/20 px-4 py-3 text-xs uppercase tracking-widest outline-none text-black placeholder:text-black/30 focus:border-black font-bold transition-colors"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="ENTER EMAIL"
                                className="bg-[#fafafa] border border-black/20 px-4 py-3 text-xs uppercase tracking-widest outline-none text-black placeholder:text-black/30 focus:border-black font-bold transition-colors"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="TYPE YOUR MESSAGE HERE..."
                                className="bg-[#fafafa] border border-black/20 px-4 py-3 text-xs uppercase tracking-widest outline-none text-black placeholder:text-black/30 focus:border-black font-bold transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "SENDING..." : "SEND MESSAGE"}
                        </button>
                    </form>

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