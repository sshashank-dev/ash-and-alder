import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, Users, LogOut } from "lucide-react";

export function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-[#121212] text-white flex flex-col justify-between p-6 select-none font-sans border-r border-neutral-800/80">
            <div className="space-y-8">
                <div>
                    <h1 className="text-sm font-bold tracking-wider uppercase text-neutral-100">
                        ASH & ALDER
                    </h1>
                    <p className="text-[10px] text-neutral-400 tracking-widest mt-0.5 font-medium">ADMIN ENVIRONMENT</p>
                </div>

                <nav className="space-y-1.5 text-xs font-medium">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all ${isActive("/admin")
                            ? "bg-neutral-800 text-white font-semibold shadow-sm"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            }`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all ${isActive("/admin/products")
                            ? "bg-neutral-800 text-white font-semibold shadow-sm"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            }`}
                    >
                        <Package className="w-4 h-4" />
                        <span>Products</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all ${isActive("/admin/orders")
                            ? "bg-neutral-800 text-white font-semibold shadow-sm"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            }`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Orders</span>
                    </Link>
                    <Link
                        to="/admin/enquiries"
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all ${isActive("/admin/enquiries")
                            ? "bg-neutral-800 text-white font-semibold shadow-sm"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>Enquiries</span>
                    </Link>
                    <Link
                        to="/admin/subscriptions"
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all ${isActive("/admin/subscriptions")
                            ? "bg-neutral-800 text-white font-semibold shadow-sm"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        <span>Subscribers</span>
                    </Link>
                </nav>
            </div>

            <div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 py-2.5 px-3 text-xs font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-xl transition-all cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Terminate Session</span>
                </button>
            </div>
        </aside>
    );
}