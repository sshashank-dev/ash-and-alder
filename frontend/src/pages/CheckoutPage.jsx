import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export function CheckoutPage({ onBackToShop }) {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        postalCode: "",
        country: "United States",
        phone: "",
        discountCode: "",
        cardNumber: "",
        cardExpiration: "",
        cardSecurityCode: "",
        cardName: "",
        useShippingAsBilling: true
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // 1. Clear cart contents upon checkout completion
        if (typeof clearCart === "function") {
            clearCart();
        }

        // 2. Route user to the dedicated success path mapped in App.jsx
        navigate("/success");
    };

    const cartSubtotal = cart.reduce((sum, item) => {
        const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
        return sum + numericPrice * item.quantity;
    }, 0);

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const shippingFee = cartSubtotal > 0 ? 15.0 : 0.0;
    const orderTotal = cartSubtotal + shippingFee;

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* TOP NAVIGATION BAR */}
            <div className="sticky top-0 z-40 bg-white px-10 py-14 flex justify-between items-center border-b border-[#e5e5e5]">
                <div className="flex items-center">
                    <button
                        onClick={onBackToShop}
                        className="text-sm font-normal text-black hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1"
                    >
                        <span>← Back to shop</span>
                    </button>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="text-8xl font-black tracking-[0.1em] uppercase text-black leading-none" style={{ fontFamily: "Impact, sans-serif" }}>
                        ASH&ALDER
                    </span>
                </div>

                <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
            </div>

            {/* CHECKOUT CONTAINER */}
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: CONTROLLED WIDTH WRAPPER ALIGNED TO RIGHT OF ITS SPACE */}
                    <div className="lg:col-span-7 flex flex-col lg:items-end">
                        <div className="w-full max-w-[540px] space-y-6">

                            {/* EXPRESS CHECKOUT SECTION */}
                            <div className="space-y-2.5 flex flex-col items-center w-full mx-auto">
                                <p className="text-[11px] text-[#737373] mb-1 w-full text-center">Express checkout</p>

                                <button
                                    type="button"
                                    onClick={() => alert("Google Pay integration")}
                                    className="w-[280px] bg-black text-white py-3 flex items-center justify-center gap-2 text-xs font-medium hover:bg-neutral-900 transition-colors cursor-pointer rounded-2xl shadow-sm"
                                >
                                    <span className="font-bold tracking-tight text-sm flex items-center gap-1.5">
                                        <svg className="w-6.5 h-6.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" /><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.14C3.18 21.35 7.28 24 12 24z" /><path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.39-1.5-.39-2.24s.14-1.52.39-2.24V6.2H1.2C.43 8.16 0 9.92 0 12s.43 3.84 1.2 5.38l4.07-3.14z" /><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.28 0 3.18 2.65 1.2 6.62l4.07 3.14c.95-2.85 3.6-4.96 6.73-4.96z" /></svg>
                                        <span>Pay</span>
                                    </span>
                                </button>

                                <div className="w-full flex items-center my-4 relative">
                                    <div className="flex-grow border-t border-[#e5e5e5]"></div>
                                    <span className="flex-shrink mx-4 text-[11px] text-[#737373] bg-white px-1">OR</span>
                                    <div className="flex-grow border-t border-[#e5e5e5]"></div>
                                </div>
                            </div>

                            {/* SECTION 1: CONTACT */}
                            <div className="space-y-2.5 w-full">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-semibold text-black">Contact</h3>
                                    <span className="text-xs text-black">
                                        Have an account? <span className="underline cursor-pointer">Log in</span>
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black transition-all"
                                />
                                <div className="flex items-center gap-2 pt-0.5">
                                    <input
                                        type="checkbox"
                                        id="newsletter"
                                        className="accent-black w-3.5 h-3.5 rounded border-[#d4d4d4] cursor-pointer"
                                        defaultChecked
                                    />
                                    <label htmlFor="newsletter" className="text-xs cursor-pointer text-black">
                                        Email me with news and offers
                                    </label>
                                </div>
                            </div>

                            {/* SECTION 2: DELIVERY */}
                            <div className="space-y-3 pt-2 w-full">
                                <h3 className="text-base font-semibold text-black">Delivery</h3>
                                <div className="relative border border-[#d4d4d4] rounded-md bg-white focus-within:border-black w-full">
                                    <label className="block text-[10px] text-[#737373] px-3.5 pt-1">Country/Region</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent px-3.5 pb-2 text-xs text-black focus:outline-none cursor-pointer appearance-none"
                                    >
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="India">India</option>
                                    </select>
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373] pt-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First name"
                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last name"
                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="Company (optional)"
                                    className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                />
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Address"
                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 pr-10 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                    />
                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] cursor-pointer">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    placeholder="Apartment, suite, etc. (optional)"
                                    className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                />
                                <div className="grid grid-cols-3 gap-2.5">
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                    />
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="State"
                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="ZIP code"
                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                />
                            </div>

                            {/* SECTION 3: SHIPPING METHOD */}
                            <div className="space-y-3 pt-2 w-full">
                                <h3 className="text-base font-semibold text-black">Shipping method</h3>
                                <div className="bg-[#f9f9f9] border border-[#d4d4d4] rounded-md p-4 text-xs text-[#737373] text-center">
                                    Enter your shipping address to view available shipping methods.
                                </div>
                            </div>

                            {/* SECTION 4: PAYMENT */}
                            <div className="space-y-3 pt-2 w-full">
                                <div>
                                    <h3 className="text-base font-semibold text-black">Payment</h3>
                                    <p className="text-xs text-[#737373] mt-0.5">All transactions are secure and encrypted.</p>
                                </div>

                                <div className="border border-[#d4d4d4] rounded-lg overflow-hidden bg-white divide-y divide-[#d4d4d4]">
                                    <div className={`p-4 transition-colors ${paymentMethod === "credit-card" ? "bg-[#fffbf0] border-amber-400" : "bg-white"}`}>
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="credit-card"
                                                    checked={paymentMethod === "credit-card"}
                                                    onChange={() => setPaymentMethod("credit-card")}
                                                    className="accent-black w-4 h-4"
                                                />
                                                <span className="text-xs font-semibold text-black">Credit card</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="px-1.5 py-0.5 bg-[#00579f] text-white font-bold text-[9px] rounded">VISA</span>
                                                <span className="px-1.5 py-0.5 bg-[#eb001b] text-white font-bold text-[9px] rounded">MC</span>
                                                <span className="px-1.5 py-0.5 bg-[#ff6000] text-white font-bold text-[9px] rounded">DISCOVER</span>
                                                <span className="px-1.5 py-0.5 bg-black text-white font-bold text-[9px] rounded">+3</span>
                                            </div>
                                        </label>

                                        {paymentMethod === "credit-card" && (
                                            <div className="mt-4 space-y-3 pt-2">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        placeholder="Card number"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 pr-10 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                                    />
                                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373]">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2.5">
                                                    <input
                                                        type="text"
                                                        name="cardExpiration"
                                                        placeholder="Expiration date (MM / YY)"
                                                        value={formData.cardExpiration}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                                    />
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="cardSecurityCode"
                                                            placeholder="Security code"
                                                            value={formData.cardSecurityCode}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 pr-8 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] cursor-pointer">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    placeholder="Name on card"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white border border-[#d4d4d4] rounded-md px-3.5 py-2.5 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                                />
                                                <div className="flex items-center gap-2 pt-1">
                                                    <input
                                                        type="checkbox"
                                                        id="useShippingAsBilling"
                                                        name="useShippingAsBilling"
                                                        checked={formData.useShippingAsBilling}
                                                        onChange={handleInputChange}
                                                        className="accent-black w-3.5 h-3.5 rounded border-[#d4d4d4] cursor-pointer"
                                                    />
                                                    <label htmlFor="useShippingAsBilling" className="text-xs cursor-pointer text-black">
                                                        Use shipping address as billing address
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 bg-white flex items-center justify-between cursor-pointer">
                                        <label className="flex items-center gap-3 cursor-pointer w-full">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cash-app"
                                                checked={paymentMethod === "cash-app"}
                                                onChange={() => setPaymentMethod("cash-app")}
                                                className="accent-black w-4 h-4"
                                            />
                                            <span className="text-xs font-semibold text-black">Cash App Pay</span>
                                        </label>
                                        <span className="px-2 py-1 bg-[#00D632] text-white font-bold text-xs rounded flex items-center justify-center min-w-[24px]">$</span>
                                    </div>

                                    <div className="p-4 bg-white flex items-center justify-between cursor-pointer">
                                        <label className="flex items-center gap-3 cursor-pointer w-full">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="afterpay"
                                                checked={paymentMethod === "afterpay"}
                                                onChange={() => setPaymentMethod("afterpay")}
                                                className="accent-black w-4 h-4"
                                            />
                                            <span className="text-xs font-semibold text-black">Afterpay</span>
                                        </label>
                                        <span className="px-2 py-1 bg-[#00D632] text-white font-bold text-xs rounded flex items-center justify-center min-w-[24px]">$</span>
                                    </div>
                                </div>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <div className="pt-2 w-full">
                                <button
                                    type="submit"
                                    className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white py-4 rounded-md font-bold text-sm transition-colors cursor-pointer shadow-sm tracking-wide"
                                >
                                    Pay now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
                    <div className="lg:col-span-5 bg-[#fafafa] p-6 border border-[#e5e5e5] rounded-lg space-y-5 sticky top-28">
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                            {cart.length === 0 ? (
                                <div className="text-center py-8 text-xs text-[#737373]">Your cart is empty.</div>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            {item.image && (
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-[#e5e5e5]" />
                                            )}
                                            <div>
                                                <h4 className="text-xs font-semibold text-black">{item.name}</h4>
                                                <p className="text-[11px] text-[#737373]">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-black">
                                            ${(parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-[#e5e5e5] pt-4 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="discountCode"
                                    value={formData.discountCode}
                                    onChange={handleInputChange}
                                    placeholder="Discount code"
                                    className="w-full bg-white border border-[#d4d4d4] rounded-md px-3 py-2 text-xs text-black placeholder-[#737373] focus:outline-none focus:border-black"
                                />
                                <button
                                    type="button"
                                    onClick={() => alert("Discount code applied")}
                                    className="bg-black text-white px-4 py-2 text-xs font-medium rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-[#e5e5e5] pt-4 space-y-2 text-xs">
                            <div className="flex justify-between text-[#737373]">
                                <span>Subtotal ({totalCartItems} items)</span>
                                <span className="text-black">${cartSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[#737373]">
                                <span>Shipping</span>
                                <span className="text-black">{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Calculated at next step"}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-[#e5e5e5]">
                                <span>Total</span>
                                <span>USD ${orderTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}