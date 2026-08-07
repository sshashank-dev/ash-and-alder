import React, { useEffect, useState } from "react";
import axios from "axios";

export function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/admin/stats", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to load dashboard metrics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center text-xs text-neutral-400">
                Loading analytics...
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">Dashboard Overview</h2>
                <p className="text-xs text-neutral-500 mt-1">Here is what is happening with your store today.</p>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-1">
                    <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Total Revenue</span>
                    <h3 className="text-2xl font-semibold text-neutral-900">${stats.totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-1">
                    <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Total Orders</span>
                    <h3 className="text-2xl font-semibold text-neutral-900">{stats.totalOrders}</h3>
                </div>
                <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-1">
                    <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Products in Stock</span>
                    <h3 className="text-2xl font-semibold text-neutral-900">{stats.totalProducts}</h3>
                </div>
                <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-1">
                    <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Registered Users</span>
                    <h3 className="text-2xl font-semibold text-neutral-900">{stats.totalUsers}</h3>
                </div>
            </div>

            {/* QUICK STATUS BANNER */}
            <div className="bg-[#141414] text-white p-6 rounded-2xl flex justify-between items-center shadow-sm border border-neutral-800/80">
                <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-200">
                        System Status: All Systems Operational
                    </h4>
                    <p className="text-xs text-neutral-400">Database connected securely to MongoDB Atlas. Payment gateways active.</p>
                </div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
        </div>
    );
}