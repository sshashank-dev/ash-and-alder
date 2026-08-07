import React, { useEffect, useState } from "react";
import axios from "axios";

export function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/admin/enquiries", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched Enquiries Data:", data);
                setEnquiries(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching enquiries", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    return (
        <div className="p-8 text-white font-sans space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold tracking-tight text-black">Customer Enquiries</h1>
                <span className="text-xs text-neutral-400 font-medium">Total: {enquiries.length}</span>
            </div>

            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 font-medium text-[11px]">
                            <th className="p-4">Sender</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-8 text-center text-neutral-500 font-medium">Loading enquiries...</td></tr>
                        ) : enquiries.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-neutral-500 font-medium">No enquiries found.</td></tr>
                        ) : (
                            enquiries.map((item) => {
                                const rawDate = item.createdAt || item.date;
                                const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A";

                                return (
                                    <tr key={item._id} className="border-b border-neutral-800/40 hover:bg-neutral-900/40 transition-colors">
                                        <td className="p-4 font-medium text-neutral-200">{item.name || "N/A"}</td>
                                        <td className="p-4 text-neutral-400">{item.email}</td>
                                        <td className="p-4 max-w-xs truncate text-neutral-300">{item.message}</td>
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