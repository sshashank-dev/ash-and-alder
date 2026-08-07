import { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Trash2, Plus, Minus, ArrowRight, ShieldAlert } from "lucide-react";

import { Experience } from "./components/3d/Experience";
import { LoadingScreen } from "./components/LoadingScreen";
import { AboutPage } from "./pages/AboutPage";
import { CollectionPage } from "./pages/CollectionPage";
import { ContactPage } from "./pages/ContactPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Product } from "./pages/Product";
import { SoundManager } from "./components/SoundManager";
import { CartProvider, useCart } from "./pages/CartContext";

// Admin Imports
import { AdminLayout } from "./admin/AdminLayout";
import { AdminDashboard } from "./admin/pages/AdminDashboard";
import { AdminProducts } from "./admin/pages/AdminProducts";
import { AdminOrders } from "./admin/pages/AdminOrders";
import { AdminEnquiries } from "./admin/pages/AdminEnquiries";       // <-- 1. Import Enquiries page
import { AdminSubscriptions } from "./admin/pages/AdminSubscriptions"; // <-- 2. Import Subscriptions page
import LoginPage from "./pages/LoginPage";


function ReadyHandler({ setReady }) {
  const { progress, active } = useProgress();

  useEffect(() => {
    if (progress === 100 && !active) {
      const timer = setTimeout(() => {
        setReady(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, active, setReady]);

  return null;
}

// Dedicated Success Component matching your requested redirect path
function CheckoutSuccess() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 bg-[#f2f1ed] text-black font-mono flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-xl font-black uppercase tracking-[0.2em]">Order Placed Successfully</h2>
        <p className="text-[11px] text-black/60 uppercase tracking-widest leading-relaxed">
          Thank you for your acquisition. Your transaction has been processed securely. Confirmation details have been dispatched.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Return to Archive
        </button>
      </div>
    </div>
  );
}

// Admin Route Guard Component
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token || role !== "admin") {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ready, setReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [caveAudioVolume, setCaveAudioVolume] = useState(0.4);

  // ROOT CART DRAWER STATE
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  // Access global cart actions
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const isPresentation = scrollProgress > 0.9;

  // Determine active overlays based on current URL path
  const isCheckoutRoute = location.pathname === "/checkout";
  const isSuccessRoute = location.pathname === "/success";
  const isCollectionRoute = location.pathname === "/collection";
  const isAboutRoute = location.pathname === "/about";
  const isContactRoute = location.pathname === "/contact";
  const isProductRoute = location.pathname.startsWith("/product/");
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="enquiries" element={<AdminEnquiries />} />         {/* <-- 3. Enquiries Route */}
          <Route path="subscriptions" element={<AdminSubscriptions />} /> {/* <-- 4. Subscriptions Route */}
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
  const isLoginRoute = location.pathname === "/login";

  // Pause Three.js render loop when any overlay or modal is active
  const isOverlayOpen = isCheckoutRoute || isSuccessRoute || isCollectionRoute || isAboutRoute || isContactRoute || isProductRoute || isAdminRoute || isCartOpen;

  const handleOpenCart = () => {
    setIsCartOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsCartAnimating(true);
      });
    });
  };

  const handleCloseCart = () => {
    setIsCartAnimating(false);
    setTimeout(() => {
      setIsCartOpen(false);
    }, 300);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  const handleAcquireFeaturedItem = () => {
    addToCart({
      id: "featured-cap-01",
      name: "Limited Edition Cap",
      price: 45.00,
      size: "ONE SIZE",
      image: "/path-to-cap-image.jpg",
      quantity: 1,
    });
    handleOpenCart();
  };

  if (isLoginRoute) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <main className="fixed inset-0 w-full h-full bg-[#050505] overflow-hidden select-none font-mono">
      {!ready && <LoadingScreen />}

      {/* THREE JS CANVAS */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${ready && !isCheckoutRoute && !isAdminRoute
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <Canvas
          frameloop={isOverlayOpen ? "demand" : "always"}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <Suspense fallback={null}>
            <Experience
              setScrollProgress={setScrollProgress}
              scrollProgress={scrollProgress}
              setAudioVolume={setCaveAudioVolume}
            />
            <ReadyHandler setReady={setReady} />
          </Suspense>
        </Canvas>
      </div>

      {/* HEADER & UI OVERLAY (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 pointer-events-none">
          <header className="flex justify-between items-start pointer-events-auto">
            <h1
              onClick={() => navigate("/")}
              className="text-3xl font-black uppercase tracking-widest text-white cursor-pointer"
            >
              ASH & ALDER
            </h1>

            <nav className="flex gap-8 text-xs uppercase tracking-[0.25em] text-white/80 items-center pointer-events-auto">
              <SoundManager volume={caveAudioVolume} />

              <button onClick={() => navigate("/collection")} className="cursor-pointer hover:text-white transition-colors bg-transparent border-none p-0 font-mono text-xs uppercase tracking-[0.25em]">
                Collection
              </button>
              <button onClick={() => navigate("/about")} className="cursor-pointer hover:text-white transition-colors bg-transparent border-none p-0 font-mono text-xs uppercase tracking-[0.25em]">
                About
              </button>
              <button onClick={() => navigate("/contact")} className="cursor-pointer hover:text-white transition-colors bg-transparent border-none p-0 font-mono text-xs uppercase tracking-[0.25em]">
                Contact
              </button>
            </nav>
          </header>

          {/* DYNAMIC FOOTER UI */}
          <div className="flex justify-between items-end pointer-events-auto">
            <div className="text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                {isPresentation ? "FEATURED ASSET // 01" : "Scroll To Navigate"}
              </p>
              <p className="text-sm font-bold tracking-widest mt-1">
                {isPresentation ? "LIMITED EDITION CAP" : "EXPERIENCE V.026"}
              </p>
              <div className={`h-px bg-white mt-2 transition-all duration-500 ${isPresentation ? "w-48 bg-emerald-400" : "w-24 bg-white/40"}`} />
            </div>

            {isPresentation && (
              <button
                onClick={handleAcquireFeaturedItem}
                className="pointer-events-auto border border-white/30 bg-white text-black hover:bg-black hover:text-white hover:border-white transition-all duration-300 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
              >
                ACQUIRE [ $45.00 ]
              </button>
            )}
          </div>
        </div>
      )}

      {/* ROUTED OVERLAYS */}
      <Routes>
        <Route
          path="/about"
          element={
            <AboutPage
              onClose={() => navigate("/")}
              onOpenAbout={() => navigate("/about")}
              onOpenContact={() => navigate("/contact")}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactPage
              onClose={() => navigate("/")}
              onOpenAbout={() => navigate("/about")}
              onOpenContact={() => navigate("/contact")}
            />
          }
        />
        <Route
          path="/collection"
          element={
            <CollectionPage
              onClose={() => navigate("/")}
              onSelectProduct={(product) => {
                navigate(`/product/${product.id}`, { state: { product } });
              }}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/product/:id"
          element={
            <ProductWrapper
              onBack={() => navigate("/collection")}
              onOpenCart={handleOpenCart}
              onNavigateToCheckout={() => navigate("/checkout")}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              onBackToShop={() => navigate("/collection")}
            />
          }
        />
        <Route
          path="/success"
          element={<CheckoutSuccess />}
        />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
        </Route>
      </Routes>

      {/* GLOBAL SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end pointer-events-auto">
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${isCartAnimating ? "opacity-100" : "opacity-0"
              }`}
            onClick={handleCloseCart}
          />

          <div
            className={`relative w-full max-w-lg h-full bg-[#f2f1ed] text-black font-mono flex flex-col shadow-2xl z-10 overflow-hidden transition-transform duration-300 ease-out ${isCartAnimating ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="px-6 py-5 border-b border-black/15 flex justify-between items-center bg-[#f2f1ed]">
              <h2 className="text-xs font-black tracking-[0.2em] uppercase flex items-center gap-2">
                <span>YOUR CART</span>
                <span className="bg-black text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                  {totalCartItems}
                </span>
              </h2>
              <button
                onClick={handleCloseCart}
                className="text-[10px] font-bold uppercase tracking-widest hover:opacity-60 cursor-pointer p-1"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <p className="text-[10px] uppercase tracking-widest text-black/50 mb-4">
                    Your cart is currently empty.
                  </p>
                  <button
                    onClick={() => {
                      handleCloseCart();
                      navigate("/collection");
                    }}
                    className="bg-black text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-zinc-800 transition-colors"
                  >
                    Explore Archive
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 p-4 bg-white/60 border border-black/10 rounded-sm shadow-sm transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover bg-black/5 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xs font-bold uppercase tracking-wider">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart ? removeFromCart(item.id, item.size) : updateQuantity(index, -item.quantity)}
                              className="text-black/40 hover:text-black transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[9px] tracking-widest text-black/60 mt-1">
                            SIZE: {item.size}
                          </p>
                          <p className="text-xs font-bold tracking-widest mt-1">
                            {item.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5">
                          <div className="flex items-center border border-black/20 bg-white">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="px-2 py-0.5 text-[10px] hover:bg-black/5 cursor-pointer text-black"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-[10px] font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="px-2 py-0.5 text-[10px] hover:bg-black/5 cursor-pointer text-black"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-black/15 bg-white/80 backdrop-blur-md space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-black/60">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold tracking-[0.2em] uppercase">
                    <span>SUBTOTAL</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleCloseCart();
                    navigate("/checkout");
                  }}
                  className="w-full bg-black text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT PAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

// Helper wrapper to extract router state for individual product view
import { useLocation as useRRLocation } from "react-router-dom";
function ProductWrapper({ onBack, onOpenCart, onNavigateToCheckout }) {
  const location = useRRLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <Product
        product={{ id: "fallback", name: "Selected Item", price: "$45.00", image: "" }}
        onBack={onBack}
        onOpenCart={onOpenCart}
        onNavigateToCheckout={onNavigateToCheckout}
      />
    );
  }

  return (
    <Product
      product={product}
      onBack={onBack}
      onOpenCart={onOpenCart}
      onNavigateToCheckout={onNavigateToCheckout}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </BrowserRouter>
  );
}