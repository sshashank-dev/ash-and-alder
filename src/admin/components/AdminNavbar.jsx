import React from "react";
import { useNavigate } from "react-router-dom";

export function AdminNavbar() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("email") || "Admin";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-[#141414] border-b border-neutral-800 text-white font-sans rounded-b-2xl">
            <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">Control Panel</span>
                <span className="text-neutral-600">/</span>
                <span className="text-xs font-medium text-neutral-200">Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-400">{userEmail}</span>
                <button
                    onClick={handleLogout}
                    className="bg-neutral-800 hover:bg-neutral-700 text-xs px-3.5 py-2 rounded-2xl transition text-neutral-200 cursor-pointer"
                >
                    Log out
                </button>
            </div>
        </header>
    );
}

export default AdminNavbar;