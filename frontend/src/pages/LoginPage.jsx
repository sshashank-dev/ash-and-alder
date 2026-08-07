import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: email.trim(),
                password
            });

            const data = response.data;

            if (data && data.success && data.token) {
                localStorage.setItem("token", data.token);
                sessionStorage.setItem("token", data.token);

                localStorage.setItem("role", data.role || "user");
                sessionStorage.setItem("role", data.role || "user");

                setTimeout(() => {
                    navigate(data.role === "admin" ? "/admin" : "/", { replace: true });
                }, 50);
            } else {
                setError(data?.message || "Login failed");
                setLoading(false);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Invalid email or password."
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000000] text-white px-4">
            <div className="w-[380px] bg-[#141414] border border-neutral-800/80 rounded-2xl p-8 shadow-xl space-y-6 relative">
                {/* Back to Home Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition group mb-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to home
                </Link>

                {/* Big Ash & Alder Logo / Title */}
                <div className="text-center py-2 border-y border-neutral-800/60 my-2">
                    <span className="text-lg font-bold tracking-[0.25em] uppercase text-neutral-100 block">
                        Ash & Alder
                    </span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 block mt-0.5">
                        Est. Collection
                    </span>
                </div>

                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight text-neutral-100">
                        Welcome back
                    </h1>
                    <p className="text-xs text-neutral-400">
                        Please enter your details to sign in.
                    </p>
                </div>

                {error && (
                    <div className="text-red-400 text-xs bg-red-950/40 border border-red-900/50 p-3 rounded-xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=""
                                className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-600 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-600 transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition cursor-pointer"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-neutral-200 text-neutral-900 rounded-xl font-medium text-xs hover:bg-white transition cursor-pointer disabled:opacity-50 mt-2"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}