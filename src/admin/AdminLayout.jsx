import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminNavbar } from "./components/AdminNavbar";
import { AdminSidebar } from "./components/AdminSidebar";

export function AdminLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/login", { replace: true });
    };

    return (
        <div className="flex h-screen bg-[#fafafa] font-mono text-black overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto p-10 bg-white">
                <div className="flex justify-between items-center mb-8">
                    <AdminNavbar />

                </div>

                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;