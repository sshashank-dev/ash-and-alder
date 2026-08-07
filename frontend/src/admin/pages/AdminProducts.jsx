import React, { useEffect, useState } from "react";
import axios from "axios";

export function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: "",
        sizes: "S, M, L, XL"
    });

    const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const formattedSizes = form.sizes.split(",").map(s => ({
                size: s.trim(),
                inStock: true
            }));

            const payload = { ...form, sizes: formattedSizes };

            await axios.post("http://localhost:5000/api/admin/products", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setForm({ name: "", price: "", category: "", stock: "", image: "", description: "", sizes: "S, M, L, XL" });
            fetchProducts();
        } catch (err) {
            console.error("Failed to create product:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const token = getToken();
            await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            console.error("Failed to delete product:", err);
        }
    };

    const startEditing = (p) => {
        setEditingId(p._id);
        setEditForm({ ...p });
    };

    const handleUpdateProduct = async (id) => {
        try {
            const token = getToken();
            const res = await axios.put(`http://localhost:5000/api/admin/products/${id}`, editForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.map(p => p._id === id ? res.data : p));
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update product:", err);
        }
    };

    const toggleSizeStock = (index) => {
        const updatedSizes = [...editForm.sizes];
        updatedSizes[index].inStock = !updatedSizes[index].inStock;
        setEditForm({ ...editForm, sizes: updatedSizes });
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Product Catalog & Inventory Control</h2>

            {/* ADD PRODUCT FORM */}
            <form onSubmit={handleCreateProduct} className="bg-white border border-[#e5e5e5] p-6 rounded-lg space-y-4 max-w-2xl">
                <h3 className="text-sm font-semibold text-black">Add New Collection Item</h3>
                <div className="grid grid-cols-2 gap-3">
                    <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required className="border border-[#d4d4d4] rounded p-2 text-xs" />
                    <input type="number" name="price" placeholder="Price ($)" value={form.price} onChange={handleChange} required className="border border-[#d4d4d4] rounded p-2 text-xs" />
                    <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="border border-[#d4d4d4] rounded p-2 text-xs" />
                    <input type="number" name="stock" placeholder="Total Stock Count" value={form.stock} onChange={handleChange} required className="border border-[#d4d4d4] rounded p-2 text-xs" />
                </div>
                <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required className="w-full border border-[#d4d4d4] rounded p-2 text-xs" />
                <input type="text" name="sizes" placeholder="Sizes (comma-separated, e.g., S, M, L, XL)" value={form.sizes} onChange={handleChange} className="w-full border border-[#d4d4d4] rounded p-2 text-xs" />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border border-[#d4d4d4] rounded p-2 text-xs" />
                <button type="submit" className="bg-black text-white px-5 py-2.5 rounded text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer">
                    Save New Product
                </button>
            </form>

            {/* PRODUCT LIST & EDIT TABLE */}
            <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                    <thead className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#737373]">
                        <tr>
                            <th className="p-4">Item & Image</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock & Sizes Availability</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e5e5]">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-neutral-500">No products found in collection.</td>
                            </tr>
                        ) : (
                            products.map((p) => {
                                const isEditing = editingId === p._id;
                                return (
                                    <tr key={p._id} className="hover:bg-neutral-50 align-top">
                                        <td className="p-4 space-y-2">
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                        className="border rounded p-1 text-xs w-full font-semibold"
                                                        placeholder="Product Name"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editForm.image}
                                                        onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                                        className="border rounded p-1 text-xs w-full text-neutral-500"
                                                        placeholder="Image URL"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border" />}
                                                    <span className="font-semibold text-black">{p.name}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.category}
                                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                    className="border rounded p-1 text-xs w-28"
                                                />
                                            ) : (
                                                p.category
                                            )}
                                        </td>
                                        <td className="p-4 font-semibold">
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editForm.price}
                                                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                                    className="border rounded p-1 text-xs w-20"
                                                />
                                            ) : (
                                                `$${p.price}`
                                            )}
                                        </td>
                                        <td className="p-4 space-y-2">
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <div>
                                                        <label className="text-[10px] text-neutral-500 block">Total Stock:</label>
                                                        <input
                                                            type="number"
                                                            value={editForm.stock}
                                                            onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                                                            className="border rounded p-1 text-xs w-20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-neutral-500 block">Toggle Size Availability:</label>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {editForm.sizes && editForm.sizes.map((s, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={() => toggleSizeStock(idx)}
                                                                    className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer ${s.inStock ? "bg-black text-white border-black" : "bg-neutral-200 text-neutral-500 border-neutral-300 line-through"
                                                                        }`}
                                                                >
                                                                    {s.size}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="font-medium">Stock: {p.stock}</div>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {p.sizes && p.sizes.map((s, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${s.inStock ? "bg-neutral-100 text-black border border-neutral-300" : "bg-red-50 text-red-500 border border-red-200 line-through"
                                                                    }`}
                                                            >
                                                                {s.size}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 space-x-3">
                                            {isEditing ? (
                                                <>
                                                    <button onClick={() => handleUpdateProduct(p._id)} className="text-green-600 hover:underline font-medium cursor-pointer">Save</button>
                                                    <button onClick={() => setEditingId(null)} className="text-neutral-500 hover:underline cursor-pointer">Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditing(p)} className="text-blue-600 hover:underline font-medium cursor-pointer">Edit</button>
                                                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline font-medium cursor-pointer">Delete</button>
                                                </>
                                            )}
                                        </td>
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