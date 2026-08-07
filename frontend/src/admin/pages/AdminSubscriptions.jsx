import React, { useEffect, useState } from "react";
import axios from "axios";

export function AdminSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/admin/subscriptions", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched Subscriptions Data:", data);
                setSubscriptions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching subscriptions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubs();
    }, []);

    return (
        <div className="p-8 text-white font-sans space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold tracking-tight text-black"> Subscriptions</h1>
                <span className="text-xs text-neutral-400 font-medium">Total: {subscriptions.length}</span>
            </div>

            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 font-medium text-[11px]">
                            <th className="p-4">Subscriber Email</th>
                            <th className="p-4">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="2" className="p-8 text-center text-neutral-500 font-medium">Loading subscriptions...</td></tr>
                        ) : subscriptions.length === 0 ? (
                            <tr><td colSpan="2" className="p-8 text-center text-neutral-500 font-medium">No subscribers yet.</td></tr>
                        ) : (
                            subscriptions.map((sub) => {
                                const rawDate = sub.subscribedAt || sub.createdAt;
                                const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A";

                                return (
                                    <tr key={sub._id} className="border-b border-neutral-800/40 hover:bg-neutral-900/40 transition-colors">
                                        <td className="p-4 font-medium text-neutral-200">{sub.email}</td>
                                        <td className="p-4 text-neutral-500 text-xs">{formattedDate}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}