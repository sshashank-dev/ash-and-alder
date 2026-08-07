import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const success = searchParams.get("success");

    const [orderEmail, setOrderEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Optional: Fetch order details to automatically show the user's email
    useEffect(() => {
        if (orderId) {
            axios.get(`http://localhost:5000/api/orders/${orderId}`)
                .then((res) => {
                    if (res.data && res.data.email) {
                        setOrderEmail(res.data.email);
                    }
                })
                .catch((err) => console.log("Order fetched or standalone mode active"));
        }
    }, [orderId]);

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register-from-order", {
                email: orderEmail,
                password: password,
                orderId: orderId
            });
            if (res.data.success) {
                setAccountCreated(true);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Failed to create account");
        }
    };

    if (!success) {
        return (
            <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center font-mono">
                <h1 className="text-xl font-bold mb-4">INVALID REQUEST</h1>
                <Link to="/" className="text-xs uppercase tracking-widest underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center font-mono">
            <div className="max-w-md w-full border border-neutral-800 p-8 bg-neutral-950">
                <h1 className="text-2xl font-bold tracking-tight mb-1">ORDER SECURED</h1>
                <p className="text-neutral-500 text-xs mb-6">ID: {orderId || "CONFIRMED"}</p>

                {!accountCreated ? (
                    <div className="border-t border-neutral-800 pt-6">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Save Details for the Next Drop</h2>
                        <p className="text-xs text-neutral-400 mb-4">
                            Set a password for <span className="text-white underline">{orderEmail || "your email"}</span> to track orders and checkout instantly next time.
                        </p>

                        <form onSubmit={handleCreateAccount} className="space-y-4">
                            <input
                                type="password"
                                placeholder="ENTER PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-black border border-neutral-800 p-3 text-sm text-white focus:outline-none focus:border-white transition"
                            />
                            {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-3 text-xs tracking-widest uppercase hover:bg-neutral-200 transition"
                            >
                                Link Account
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="border-t border-neutral-800 pt-6 text-center">
                        <p className="text-green-400 text-xs font-bold tracking-widest uppercase">Account Linked Successfully</p>
                        <p className="text-neutral-500 text-xs mt-2 mb-6">Your order history is now tied to your profile.</p>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
                    <Link to="/" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition">
                        &larr; Back to Store
                    </Link>
                </div>
            </div>
        </div>
    );
}