import React, { useEffect, useState } from "react";
import axios from "axios";

export function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/admin/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const responseData = res.data;
                const ordersArray = Array.isArray(responseData)
                    ? responseData
                    : responseData.orders || responseData.data || [];

                setOrders(ordersArray);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrders(orders.map(o => o._id === orderId ? { ...o, paymentStatus: newStatus } : o));
        } catch (err) {
            console.error("Failed to update order status:", err);
        }
    };

    if (loading) return <div className="text-xs p-8 text-neutral-400 font-sans">Loading orders...</div>;

    return (
        <div className="p-8 text-white font-sans space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-[#141414]">Orders Overview</h2>
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 font-medium text-[11px]">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer Details</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/40">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-neutral-500 font-medium">No orders found in database.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-neutral-900/40 transition-colors align-top">
                                    <td className="p-4 font-mono text-[10px] text-neutral-500">{order._id}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-neutral-200">{order.firstName} {order.lastName}</div>
                                        <div className="text-neutral-400">{order.email}</div>
                                        <div className="text-[11px] text-neutral-500 mt-1">{order.address}, {order.city}</div>
                                    </td>
                                    <td className="p-4">
                                        {order.cartItems && order.cartItems.length > 0 ? (
                                            <ul className="space-y-1">
                                                {order.cartItems.map((item, idx) => (
                                                    <li key={idx} className="text-neutral-300">
                                                        <span className="font-medium text-neutral-200">{item.name || item.title || "Product"}</span> (x{item.quantity || 1})
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-neutral-500">No items list</span>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-neutral-200">${order.totalAmount?.toFixed(2) || "0.00"}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${(order.paymentStatus === "Completed" || order.paymentStatus === "Delivered")
                                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                                            : "bg-amber-950/60 text-amber-400 border border-amber-800/50"
                                            }`}>
                                            {order.paymentStatus || "Pending"}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={order.paymentStatus || "Pending"}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-200 cursor-pointer focus:outline-none focus:border-neutral-700 transition"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}