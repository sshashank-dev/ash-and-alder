import React, { useEffect, useRef, useState } from "react";
// import { Product } from "./Product";


export function CollectionPage({
    onClose,
    onSelectProduct,
}) {
    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const trackRef = useRef(null);

    const [thumbWidth, setThumbWidth] = useState(0);
    const [thumbLeft, setThumbLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    // const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'refunds' | 'terms' | 'cookies' | null

    // Heavy Inertial Smooth Scroll Physics Engine (re-runs safely on mount/return)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Force reset scroll to top on mount/return from product page
        container.scrollTop = 0;
        let targetScroll = 0;
        let currentScroll = 0;
        let animationFrameId = null;
        let isTicking = false;

        const onWheel = (e) => {
            e.preventDefault();
            targetScroll += e.deltaY * 0.5;
            const maxScroll = container.scrollHeight - container.clientHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isTicking) {
                isTicking = true;
                animationFrameId = requestAnimationFrame(updateScroll);
            }
        };

        const updateScroll = () => {
            currentScroll += (targetScroll - currentScroll) * 0.08;
            container.scrollTop = currentScroll;

            if (Math.abs(targetScroll - currentScroll) > 0.3) {
                animationFrameId = requestAnimationFrame(updateScroll);
            } else {
                isTicking = false;
            }
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", onWheel);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Custom Scrollbar Sync with Centered Initial Start
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        el.scrollLeft = maxScrollLeft / 2;

        const updateThumb = () => {
            const { scrollWidth, clientWidth, scrollLeft } = el;
            if (scrollWidth <= clientWidth) {
                setThumbWidth(0);
                return;
            }
            const widthPercentage = (clientWidth / scrollWidth) * 100;
            setThumbWidth(widthPercentage);

            const maxScroll = scrollWidth - clientWidth;
            const maxThumbTranslate = clientWidth - (clientWidth * (widthPercentage / 100));
            const leftPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * maxThumbTranslate : 0;
            setThumbLeft(leftPercentage);
        };

        updateThumb();
        el.addEventListener("scroll", updateThumb);
        window.addEventListener("resize", updateThumb);

        return () => {
            el.removeEventListener("scroll", updateThumb);
            window.removeEventListener("resize", updateThumb);
        };
    }, []);

    // Drag-to-scroll functionality for custom scrollbar
    const handleMouseDown = (e) => {
        setIsDragging(true);
        startXRef.current = e.clientX;
        if (scrollContainerRef.current) {
            scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
        }
        document.body.style.userSelect = "none";
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || !scrollContainerRef.current || !trackRef.current) return;
            const dx = e.clientX - startXRef.current;
            const trackWidth = trackRef.current.clientWidth;
            const el = scrollContainerRef.current;

            const scrollOffset = (dx / trackWidth) * el.scrollWidth;
            el.scrollLeft = scrollLeftRef.current + scrollOffset;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = "auto";
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const collectionItems = [
        { id: "01", name: "RCC IMAGER ZIP CYCLE JERSEY", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/112125_PATTA_MARTINE_PARADISE4414_510x.jpg?v=1763684688", desc: "Engineered with high-density technical weaves and intense tonal framing." },
        { id: "02", name: "RCC IMAGER ZIP CYCLE JERSEY", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/patta_patta_embro_classic_zip_up_hooded_sweater_black_POC-SS26-2050-325-0036-001_003_515x.jpg?v=1780123708", desc: "Classic zip-up hooded sweater featuring reinforced industrial stitching." },
        { id: "03", name: "EMBER-SYS LINEN-COTTON LONG SLEEVE", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/100925_DRIES_MODEL020_510x.jpg?v=1760041906", desc: "Lightweight linen-cotton blend optimized for structural draping." },
        { id: "04", name: "EMBER-SYS LINEN-COTTON LONG SLEEVE", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/073125_KAPITAL_MODEL039_515x.jpg?v=1753995926", desc: "Heavyweight seasonal edition built with tactile raw textures." },
        { id: "05", name: "BUCKLER LS SHIRT", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/UNION_SP26_ECOM19922_bf43218e-4b19-412e-88a6-3c159da236ac_510x.jpg?v=1775257841", desc: "Signature utility long sleeve constructed for everyday functional carry." },
        { id: "06", name: "Timmons Shirt", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/082525_UNION_FALL252944_515x.jpg?v=1756381319", desc: "Refined silhouette tailored with subtle industrial hardware accents." },
        { id: "07", name: "NBNK BD SHIRT", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/012826_NOBISHOP13553_515x.jpg?v=1769768858", desc: "Button-down variant optimized with crisp structural lines." },
        { id: "08", name: "UNION TEE", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_double_weave_twill_regular_collar_shirtspurple_26AAP-02-05_1004_510x.jpg?v=1784846752", desc: "Double-weave twill configuration with enhanced durability." },
        { id: "09", name: "RCC IMAGER ZIP CYCLE JERSEY", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_crest_tee_vintage_black_KTS-517-00001-002_005_634x.jpg?v=1778795391", desc: "Vintage washed base layer engineered with heavy cotton yarns." },
        { id: "10", name: "EMBERSYS TEE", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_response_tee_vintage_pastel_yellow_KTS-516-00001-740_005_634x.jpg?v=1778795446", desc: "Response tee profile featuring custom pigment treatments." },
        { id: "11", name: "AGED TEE", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_u_crew_tee_optic_white_KTS-518-00001-106_005_634x.jpg?v=1778795279", desc: "Optic white crew execution with structural neck binding." },
        { id: "12", name: "EMBER-SYS TEE", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/patta_patta_croco_t-shirt_white_POC-SS26-1000-290-0140-002_05_515x.jpg?v=1778229177", desc: "Croco graphic pattern printed on dense compact cotton." },
        { id: "13", name: "A.PRESSE No.37 Washed Wide Denim Pants", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_no_37_washed_wide_denim_pants_bleach_26AAP-04-22_004_510x.jpg?v=1783064657", desc: "Bleached wide-leg denim silhouette with articulated seams." },
        { id: "14", name: "Smoked Double-Wide Denim", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/032526_BWA_UNION_NIKES21683_510x.jpg?v=1775198987", desc: "Extra-wide profile treated with a deep smoked wash." },
        { id: "15", name: "Fathers Engine He Rose 2", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/031425_RRR_BODY027_4bb693df-8c7d-4ac8-8600-f99a82afb507_510x.jpg?v=1741924970", desc: "Experimental archive release featuring custom screen prints." },
        { id: "16", name: "No.37 Washed Wide Denim Pants", price: "499.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_no37_washed_wide_denim_pants_bleach_26SAP-04-22_01_510x.jpg?v=1777006169", desc: "Standard indigo wash variation of the signature wide silhouette." }
    ];

    const screenshotRowItems = [
        { id: "p1", name: "New Era x Union Dodgers Cap", price: "65.00 USD", image: "https://store.unionlosangeles.com/cdn/shop/files/121025_UNION_NE_FLATS004.jpg?v=1765434374&width=535", desc: "Collaboration cap featuring low-profile RT structured crown." },
        { id: "p2", name: "Women's Nike First Sight Mirage", price: "170.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/nike_womens_nike_first_sight_mirage_HQ2412-101_001_8219bcf9-c467-4a5c-8fd5-0e0951dccf35_510x.png?v=1784918295", desc: "Futuristic footwear design with sculpted foam cushioning." },
        { id: "p3", name: "CLAE x Union Los Angeles Carter Lug", price: "175.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/clae_footwear_clae_x_union_los_angeles_carter_lug_silver_mink_suede_CL26CCL01_SMS_001_510x.jpg?v=1784846393", desc: "Silver mink suede upper built on a rugged lug sole." },
        { id: "p4", name: "Lakers Jacquard Chenille 59FIFTY Pre-Curved Cap", price: "60.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/new_era_lakers_jacquard_chenille_59fifty_pre-curved_JACQCHEN__LOSLAKHC_003_510x.jpg?v=1779929450", desc: "Textured chenille patch detailing on pre-curved brim." },
        { id: "p5", name: "Sports Sock Multipack", price: "70.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/martine_rose_sports_sock_multipack_blue_1179JF04539_002_510x.jpg?v=1779927052", desc: "High-rib athletic construction with contrast branding." },
        { id: "p6", name: "Candle", price: "82.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/101124_RETAW_FLATS041_510x.jpg?v=1728677327", desc: "Custom ambient fragrance candle in minimalist glass vessel." },
        { id: "p7", name: "Women's Nike Air Force 1 '07", price: "399.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/nike_w_air_force_1_07_pony_hair_blackphantom-black_IO0442-001_03_510x.png?v=1777924341", desc: "Pony hair textured upper panels on classic Air Force tooling." },
        { id: "p8", name: "Roll Back Cap", price: "185.00 USD", image: "https://cdn.shopify.com/s/files/1/0051/0392/files/100325_MARTINE_FLATS001_510x.jpg?v=1759469902", desc: "Deconstructed cap profile with adjustable rear hardware." }
    ];

    // if (selectedProduct) {
    //     return (
    //         <Product
    //             product={selectedProduct}
    //             onBack={() => setSelectedProduct(null)}
    //         />
    //     );
    // }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-50 w-full h-full bg-[#f2f1ed] text-black font-mono overflow-y-hidden selection:bg-black selection:text-white transform-gpu will-change-scroll"
        >
            {/* FLOATING CLOSE BUTTON */}
            <div className="absolute top-6 right-6 z-40">
                <button
                    onClick={onClose}
                    className="text-xs font-medium text-white hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0"
                >
                    Close
                </button>
            </div>

            {/* FULLSCREEN VIDEO HERO SECTION */}
            <section className="relative h-screen w-full px-2 sm:px-3 flex flex-col justify-end pb-16 overflow-hidden bg-black text-white">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center opacity-90"
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                {/* STATIC HIGHER TOP-CENTERED BRAND LOGO */}
                <div className="absolute top-6 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-2.5">
                        <span className="text-xl sm:text-2xl font-black tracking-[0.25em] uppercase text-white drop-shadow-lg">
                            ASH
                        </span>
                        <span className="text-xs sm:text-base font-extrabold tracking-widest text-white/50">
                            &
                        </span>
                        <span className="text-xl sm:text-2xl font-black tracking-[0.25em] uppercase text-white drop-shadow-lg">
                            ALDER
                        </span>
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white/90">
                        RIGOROUS COLLECTION
                    </h1>
                </div>
            </section>

            {/* PRODUCT GRID SECTION */}
            <section className="px-1.5 sm:px-2 py-8 bg-[#f2f1ed]">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-1.5 gap-y-8 mb-12">
                    {collectionItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelectProduct(item)}
                            className="flex flex-col cursor-pointer group bg-transparent"
                        >
                            <div className="relative h-[380px] sm:h-[440px] w-full bg-[#f2f1ed] overflow-hidden mb-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <h3 className="text-[10px] font-bold uppercase tracking-wider text-black group-hover:text-zinc-600 transition-colors leading-snug">
                                    {item.name}
                                </h3>
                                <p className="text-[10px] font-bold text-black/60 tracking-wider mt-1">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SHOWCASE SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start pt-6 border-t border-black/15">
                    <div className="lg:col-span-3 flex flex-col justify-start pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-2">
                            BESTSELLER
                        </span>
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-black mb-4">
                            FAMOUS CREW
                        </h2>
                        <p className="text-[10px] font-bold text-black/60 tracking-wider mb-6">
                            399.00 USD
                        </p>
                        <div className="w-12 h-[1px] bg-black/30 mb-6" />
                        <p className="text-[10px] uppercase tracking-wider text-black/70 leading-relaxed max-w-xs">
                            Engineered with high-density technical weaves and intense tonal framing, matching the signature minimalist industrial archetype.
                        </p>
                    </div>

                    <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-2 shadow-2xl">
                        <div className="relative h-[550px] sm:h-[620px] w-full bg-black overflow-hidden group cursor-pointer">
                            <img
                                src="https://i.pinimg.com/originals/9e/96/88/9e96881f8baa5bf87b0b950c24cf7585.jpg"
                                alt="Famous Crew Grey Technical Hoodie"
                                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-white">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black/80 px-3 py-1 backdrop-blur-md border border-white/20">
                                    01  OVERSIZED HOODIE
                                </span>
                            </div>
                        </div>

                        <div className="relative h-[550px] sm:h-[620px] w-full bg-black overflow-hidden group cursor-pointer">
                            <img
                                src="https://i.pinimg.com/1200x/9b/26/5b/9b265b154c3eaee20718daf2b28a9f73.jpg"
                                alt="Technical Masked Outfit"
                                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-white">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black/80 px-3 py-1 backdrop-blur-md border border-white/20">
                                    02  TECH WEAVE BALACLAVA
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HORIZONTAL SCROLLING ROW */}
                <div className="mt-12 pt-6 border-t border-black/15">
                    <div
                        ref={scrollContainerRef}
                        className="w-full overflow-x-auto pb-4 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div className="flex gap-2 w-max">
                            {screenshotRowItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => onSelectProduct(item)}
                                    className="flex flex-col cursor-pointer group bg-transparent shrink-0 w-[190px] sm:w-[210px]"
                                >
                                    <div className="relative h-[260px] sm:h-[290px] w-full bg-[#f2f1ed] overflow-hidden mb-2.5 shadow-xl">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                                        <div className="absolute bottom-2 left-2 z-10 text-white">
                                            <span className="text-[8px] font-bold tracking-[0.1em] uppercase bg-black/80 px-1.5 py-0.5 backdrop-blur-md border border-white/10">
                                                0{index + 1}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="text-[9px] font-bold uppercase tracking-wider text-black group-hover:text-zinc-600 transition-colors leading-snug">
                                            {item.name}
                                        </h3>
                                        <p className="text-[9px] font-bold text-black/60 tracking-wider mt-1">
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 mb-2">
                        <div
                            ref={trackRef}
                            className="w-full h-[1px] bg-black/20 relative cursor-pointer"
                        >
                            <div
                                onMouseDown={handleMouseDown}
                                style={{
                                    width: `${thumbWidth}%`,
                                    transform: `translateX(${thumbLeft}px)`
                                }}
                                className={`absolute top-1/2 -translate-y-1/2 h-[3px] bg-black cursor-grab active:cursor-grabbing transition-colors ${isDragging ? 'bg-zinc-700' : ''}`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* STAY IN THE LOOP SECTION (FOOTER) - MODAL RENDERED HERE TO LOCK RELATIVE TO CURRENT VIEW */}
            <section className="relative px-2 pt-14 pb-12 bg-[#f2f1ed] border-t border-black/10 flex flex-col items-center text-center">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-black mb-3">
                    STAY IN THE LOOP
                </h2>
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-black/60 mb-8 max-w-sm">
                    KEEP UP TO DATE WITH NEW DROPS, LATEST COLLECTIONS AND SALES.
                </p>

                <div className="flex w-full max-w-md justify-center mb-12">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="bg-transparent border border-black/30 px-4 py-2.5 text-[10px] uppercase tracking-widest outline-none w-full text-black placeholder:text-black/40 focus:border-black transition-colors"
                    />
                    <button
                        onClick={() => alert("Subscribed successfully!")}
                        className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    >
                        SUBSCRIBE
                    </button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-[9px] uppercase tracking-[0.2em] text-black/70 gap-6">
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                        <button onClick={() => setActiveModal('privacy')} className="hover:text-black transition-colors cursor-pointer">Privacy Policy</button>
                        <button onClick={() => setActiveModal('refunds')} className="hover:text-black transition-colors cursor-pointer">Refund policy</button>
                        <button onClick={() => setActiveModal('terms')} className="hover:text-black transition-colors cursor-pointer">Terms of Service</button>
                        <button onClick={() => setActiveModal('cookies')} className="hover:text-black transition-colors cursor-pointer">Cookie preferences</button>
                    </div>

                    <div className="flex items-center gap-6">
                        <span>A U.S. / EU & ROOM</span>
                        <div className="flex gap-4 text-xs">
                            <a href="#instagram" className="hover:text-black transition-colors" aria-label="Instagram">IG</a>
                            <a href="#youtube" className="hover:text-black transition-colors" aria-label="YouTube">YT</a>
                            <a href="#tiktok" className="hover:text-black transition-colors" aria-label="TikTok">TT</a>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-hidden mt-10 select-none pointer-events-none">
                    <h1 className="text-[13vw] font-black uppercase tracking-tighter text-black/10 leading-none text-center">
                        ESSENZA
                    </h1>
                </div>

                {/* POLICY MODALS OVERLAY - ABSOLUTE CONTAINED TO FOOTER VIEWPORT AREA */}
                {activeModal && (
                    <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-[#f2f1ed] text-black w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-10 border border-black/20 shadow-2xl relative font-mono text-left">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-6 right-6 bg-black text-white px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                CLOSE [X]
                            </button>

                            {activeModal === 'privacy' && (
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-widest mb-4">Privacy Policy</h2>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        Last updated: August 2026. We respect your digital privacy. This policy outlines how we collect, use, and protect your personal data when interacting with our store and digital platform.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Information Collection</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        We gather identifiers such as your name, contact details, and shipping address strictly to fulfill transactions and enhance your user experience.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">2. Data Security</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase">
                                        Encryption protocols are implemented across all structural data transfers to safeguard your sessions and personal entries.
                                    </p>
                                </div>
                            )}

                            {activeModal === 'refunds' && (
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-widest mb-4">Refund Policy</h2>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        We maintain a rigorous standard for all archive and seasonal releases. Returns are accepted within 14 days of delivery for items in original, unworn condition with tags attached.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Processing Period</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        Once inspected at our facility, approved refunds are credited back to the original method of payment within 5 to 7 business days.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">2. Final Sale Items</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase">
                                        Markdown configurations, limited hardware drops, and experimental archive releases are marked final sale and cannot be returned.
                                    </p>
                                </div>
                            )}

                            {activeModal === 'terms' && (
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-widest mb-4">Terms of Service</h2>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        By accessing this platform, you agree to comply with our foundational terms of industrial distribution, copyright guidelines, and user conduct standards.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Intellectual Property</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        All imagery, layout code, typography systems, and graphic vectors are the explicit intellectual property of the studio.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">2. Limitation of Liability</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase">
                                        The studio is not responsible for interruptions caused by network infrastructure or third-party logistics failures.
                                    </p>
                                </div>
                            )}

                            {activeModal === 'cookies' && (
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-widest mb-4">Cookie Preferences</h2>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        Our platform uses minimal functional cookies to retain session states, cart configurations, and inertial scrolling metrics.
                                    </p>
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Essential Tracking</h3>
                                    <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
                                        Required for secure checkout navigation and interface persistence. These cannot be disabled through standard settings.
                                    </p>
                                    <button
                                        onClick={() => { alert("Preferences saved successfully."); setActiveModal(null); }}
                                        className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer mt-2"
                                    >
                                        SAVE PREFERENCES
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>


            {/* {selectedProduct && (
                <Product
                    product={selectedProduct}
                    onBack={() => setSelectedProduct(null)}
                />
            )} */}
        </div>
    );
}


// import React, { useEffect, useRef, useState } from "react";
// import { Product } from "./Product";
// import { useCart } from "./CartContext";
// import { ShoppingBag, X, ArrowRight, Plus, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";


// export function CollectionPage({ onClose }) {
//     const containerRef = useRef(null);
//     const scrollContainerRef = useRef(null);
//     const trackRef = useRef(null);

//     const [thumbWidth, setThumbWidth] = useState(0);
//     const [thumbLeft, setThumbLeft] = useState(0);
//     const [isDragging, setIsDragging] = useState(false);
//     const startXRef = useRef(0);
//     const scrollLeftRef = useRef(0);

//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'refunds' | 'terms' | 'cookies' | null

//     // Full-Page Cart View State Hooks
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

//     const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     // Heavy Inertial Smooth Scroll Physics Engine (re-runs safely on mount/return)
//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         // Force reset scroll to top on mount/return from product page
//         container.scrollTop = 0;
//         let targetScroll = 0;
//         let currentScroll = 0;
//         let animationFrameId = null;
//         let isTicking = false;

//         const onWheel = (e) => {
//             e.preventDefault();
//             targetScroll += e.deltaY * 0.5;
//             const maxScroll = container.scrollHeight - container.clientHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

//             if (!isTicking) {
//                 isTicking = true;
//                 animationFrameId = requestAnimationFrame(updateScroll);
//             }
//         };

//         const updateScroll = () => {
//             currentScroll += (targetScroll - currentScroll) * 0.08;
//             container.scrollTop = currentScroll;

//             if (Math.abs(targetScroll - currentScroll) > 0.3) {
//                 animationFrameId = requestAnimationFrame(updateScroll);
//             } else {
//                 isTicking = false;
//             }
//         };

//         container.addEventListener("wheel", onWheel, { passive: false });
//         return () => {
//             container.removeEventListener("wheel", onWheel);
//             if (animationFrameId) cancelAnimationFrame(animationFrameId);
//         };
//     }, [selectedProduct, isCartOpen]);

//     // Custom Scrollbar Sync with Centered Initial Start
//     useEffect(() => {
//         const el = scrollContainerRef.current;
//         if (!el) return;

//         const maxScrollLeft = el.scrollWidth - el.clientWidth;
//         el.scrollLeft = maxScrollLeft / 2;

//         const updateThumb = () => {
//             const { scrollWidth, clientWidth, scrollLeft } = el;
//             if (scrollWidth <= clientWidth) {
//                 setThumbWidth(0);
//                 return;
//             }
//             const widthPercentage = (clientWidth / scrollWidth) * 100;
//             setThumbWidth(widthPercentage);

//             const maxScroll = scrollWidth - clientWidth;
//             const maxThumbTranslate = clientWidth - (clientWidth * (widthPercentage / 100));
//             const leftPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * maxThumbTranslate : 0;
//             setThumbLeft(leftPercentage);
//         };

//         updateThumb();
//         el.addEventListener("scroll", updateThumb);
//         window.addEventListener("resize", updateThumb);

//         return () => {
//             el.removeEventListener("scroll", updateThumb);
//             window.removeEventListener("resize", updateThumb);
//         };
//     }, [selectedProduct, isCartOpen]);

//     // Drag-to-scroll functionality for custom scrollbar
//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         startXRef.current = e.clientX;
//         if (scrollContainerRef.current) {
//             scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
//         }
//         document.body.style.userSelect = "none";
//     };

//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             if (!isDragging || !scrollContainerRef.current || !trackRef.current) return;
//             const dx = e.clientX - startXRef.current;
//             const trackWidth = trackRef.current.clientWidth;
//             const el = scrollContainerRef.current;

//             const scrollOffset = (dx / trackWidth) * el.scrollWidth;
//             el.scrollLeft = scrollLeftRef.current + scrollOffset;
//         };

//         const handleMouseUp = () => {
//             setIsDragging(false);
//             document.body.style.userSelect = "auto";
//         };

//         if (isDragging) {
//             window.addEventListener("mousemove", handleMouseMove);
//             window.addEventListener("mouseup", handleMouseUp);
//         }
//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             window.removeEventListener("mouseup", handleMouseUp);
//         };
//     }, [isDragging]);

//     const collectionItems = [
//         { id: "01", name: "RCC IMAGER ZIP CYCLE JERSEY", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/112125_PATTA_MARTINE_PARADISE4414_510x.jpg?v=1763684688", desc: "Engineered with high-density technical weaves and intense tonal framing." },
//         { id: "02", name: "RCC IMAGER ZIP CYCLE JERSEY", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/patta_patta_embro_classic_zip_up_hooded_sweater_black_POC-SS26-2050-325-0036-001_003_515x.jpg?v=1780123708", desc: "Classic zip-up hooded sweater featuring reinforced industrial stitching." },
//         { id: "03", name: "EMBER-SYS LINEN-COTTON LONG SLEEVE", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/100925_DRIES_MODEL020_510x.jpg?v=1760041906", desc: "Lightweight linen-cotton blend optimized for structural draping." },
//         { id: "04", name: "EMBER-SYS LINEN-COTTON LONG SLEEVE", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/073125_KAPITAL_MODEL039_515x.jpg?v=1753995926", desc: "Heavyweight seasonal edition built with tactile raw textures." },
//         { id: "05", name: "BUCKLER LS SHIRT", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/UNION_SP26_ECOM19922_bf43218e-4b19-412e-88a6-3c159da236ac_510x.jpg?v=1775257841", desc: "Signature utility long sleeve constructed for everyday functional carry." },
//         { id: "06", name: "Timmons Shirt", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/082525_UNION_FALL252944_515x.jpg?v=1756381319", desc: "Refined silhouette tailored with subtle industrial hardware accents." },
//         { id: "07", name: "NBNK BD SHIRT", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/012826_NOBISHOP13553_515x.jpg?v=1769768858", desc: "Button-down variant optimized with crisp structural lines." },
//         { id: "08", name: "UNION TEE", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_double_weave_twill_regular_collar_shirtspurple_26AAP-02-05_1004_510x.jpg?v=1784846752", desc: "Double-weave twill configuration with enhanced durability." },
//         { id: "09", name: "RCC IMAGER ZIP CYCLE JERSEY", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_crest_tee_vintage_black_KTS-517-00001-002_005_634x.jpg?v=1778795391", desc: "Vintage washed base layer engineered with heavy cotton yarns." },
//         { id: "10", name: "EMBERSYS TEE", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_response_tee_vintage_pastel_yellow_KTS-516-00001-740_005_634x.jpg?v=1778795446", desc: "Response tee profile featuring custom pigment treatments." },
//         { id: "11", name: "AGED TEE", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_u_crew_tee_optic_white_KTS-518-00001-106_005_634x.jpg?v=1778795279", desc: "Optic white crew execution with structural neck binding." },
//         { id: "12", name: "EMBER-SYS TEE", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/patta_patta_croco_t-shirt_white_POC-SS26-1000-290-0140-002_05_515x.jpg?v=1778229177", desc: "Croco graphic pattern printed on dense compact cotton." },
//         { id: "13", name: "A.PRESSE No.37 Washed Wide Denim Pants", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_no_37_washed_wide_denim_pants_bleach_26AAP-04-22_004_510x.jpg?v=1783064657", desc: "Bleached wide-leg denim silhouette with articulated seams." },
//         { id: "14", name: "Smoked Double-Wide Denim", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/032526_BWA_UNION_NIKES21683_510x.jpg?v=1775198987", desc: "Extra-wide profile treated with a deep smoked wash." },
//         { id: "15", name: "Fathers Engine He Rose 2", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/031425_RRR_BODY027_4bb693df-8c7d-4ac8-8600-f99a82afb507_510x.jpg?v=1741924970", desc: "Experimental archive release featuring custom screen prints." },
//         { id: "16", name: "No.37 Washed Wide Denim Pants", price: 499.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_no37_washed_wide_denim_pants_bleach_26SAP-04-22_01_510x.jpg?v=1777006169", desc: "Standard indigo wash variation of the signature wide silhouette." }
//     ];

//     const screenshotRowItems = [
//         { id: "p1", name: "New Era x Union Dodgers Cap", price: 65.00, image: "https://store.unionlosangeles.com/cdn/shop/files/121025_UNION_NE_FLATS004.jpg?v=1765434374&width=535", desc: "Collaboration cap featuring low-profile RT structured crown." },
//         { id: "p2", name: "Women's Nike First Sight Mirage", price: 170.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/nike_womens_nike_first_sight_mirage_HQ2412-101_001_8219bcf9-c467-4a5c-8fd5-0e0951dccf35_510x.png?v=1784918295", desc: "Futuristic footwear design with sculpted foam cushioning." },
//         { id: "p3", name: "CLAE x Union Los Angeles Carter Lug", price: 175.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/clae_footwear_clae_x_union_los_angeles_carter_lug_silver_mink_suede_CL26CCL01_SMS_001_510x.jpg?v=1784846393", desc: "Silver mink suede upper built on a rugged lug sole." },
//         { id: "p4", name: "Lakers Jacquard Chenille 59FIFTY Pre-Curved Cap", price: 60.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/new_era_lakers_jacquard_chenille_59fifty_pre-curved_JACQCHEN__LOSLAKHC_003_510x.jpg?v=1779929450", desc: "Textured chenille patch detailing on pre-curved brim." },
//         { id: "p5", name: "Sports Sock Multipack", price: 70.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/martine_rose_sports_sock_multipack_blue_1179JF04539_002_510x.jpg?v=1779927052", desc: "High-rib athletic construction with contrast branding." },
//         { id: "p6", name: "Candle", price: 82.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/101124_RETAW_FLATS041_510x.jpg?v=1728677327", desc: "Custom ambient fragrance candle in minimalist glass vessel." },
//         { id: "p7", name: "Women's Nike Air Force 1 '07", price: 399.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/nike_w_air_force_1_07_pony_hair_blackphantom-black_IO0442-001_03_510x.png?v=1777924341", desc: "Pony hair textured upper panels on classic Air Force tooling." },
//         { id: "p8", name: "Roll Back Cap", price: 185.00, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/100325_MARTINE_FLATS001_510x.jpg?v=1759469902", desc: "Deconstructed cap profile with adjustable rear hardware." }
//     ];

//     return (
//         <div
//             ref={containerRef}
//             className="absolute inset-0 z-50 w-full h-full bg-[#f2f1ed] text-black font-mono overflow-y-hidden selection:bg-black selection:text-white transform-gpu will-change-scroll"
//         >
//             {/* FLOATING CLOSE COLLECTION BUTTON */}
//             <div className="absolute top-6 right-6 z-40 flex items-center gap-6">
//                 <button
//                     onClick={() => setIsCartOpen(true)}
//                     className="relative text-xs font-bold uppercase tracking-widest text-black bg-white/80 backdrop-blur-md px-4 py-2 border border-black/20 hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-sm"
//                 >
//                     <ShoppingBag className="w-4 h-4" />
//                     <span>Cart ({totalItems})</span>
//                 </button>
//                 <button
//                     onClick={onClose}
//                     className="text-xs font-medium text-black hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 uppercase tracking-widest"
//                 >
//                     Close [X]
//                 </button>
//             </div>

//             {/* FULLSCREEN VIDEO HERO SECTION */}
//             <section className="relative h-screen w-full px-2 sm:px-3 flex flex-col justify-end pb-16 overflow-hidden bg-black text-white">
//                 <div className="absolute inset-0 z-0">
//                     <video
//                         autoPlay
//                         loop
//                         muted
//                         playsInline
//                         className="w-full h-full object-cover object-center opacity-90"
//                     >
//                         <source src="/videos/hero.mp4" type="video/mp4" />
//                     </video>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
//                 </div>

//                 {/* STATIC HIGHER TOP-CENTERED BRAND LOGO */}
//                 <div className="absolute top-6 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
//                     <div className="flex items-center gap-2.5">
//                         <span className="text-xl sm:text-2xl font-black tracking-[0.25em] uppercase text-white drop-shadow-lg">
//                             ASH
//                         </span>
//                         <span className="text-xs sm:text-base font-extrabold tracking-widest text-white/50">
//                             &
//                         </span>
//                         <span className="text-xl sm:text-2xl font-black tracking-[0.25em] uppercase text-white drop-shadow-lg">
//                             ALDER
//                         </span>
//                     </div>
//                 </div>

//                 <div className="relative z-10 max-w-4xl">
//                     <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white/90">
//                         RIGOROUS COLLECTION
//                     </h1>
//                 </div>
//             </section>

//             {/* PRODUCT GRID SECTION */}
//             <section className="px-1.5 sm:px-2 py-8 bg-[#f2f1ed]">
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-1.5 gap-y-8 mb-12">
//                     {collectionItems.map((item) => (
//                         <div
//                             key={item.id}
//                             className="flex flex-col group bg-transparent"
//                         >
//                             <div
//                                 onClick={() => setSelectedProduct(item)}
//                                 className="relative h-[380px] sm:h-[440px] w-full bg-[#f2f1ed] overflow-hidden mb-2 cursor-pointer"
//                             >
//                                 <img
//                                     src={item.image}
//                                     alt={item.name}
//                                     loading="lazy"
//                                     className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
//                                 />
//                             </div>
//                             <div className="flex flex-col items-center text-center">
//                                 <h3
//                                     onClick={() => setSelectedProduct(item)}
//                                     className="text-[10px] font-bold uppercase tracking-wider text-black group-hover:text-zinc-600 transition-colors leading-snug cursor-pointer"
//                                 >
//                                     {item.name}
//                                 </h3>
//                                 <p className="text-[10px] font-bold text-black/60 tracking-wider mt-1">
//                                     {item.price.toFixed(2)} USD
//                                 </p>
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         addToCart(item);
//                                         setIsCartOpen(true);
//                                     }}
//                                     className="mt-3 bg-black text-white px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
//                                 >
//                                     <Plus className="w-3 h-3" /> Add to Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* SHOWCASE SECTION */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start pt-6 border-t border-black/15">
//                     <div className="lg:col-span-3 flex flex-col justify-start pt-2">
//                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black mb-2">
//                             BESTSELLER
//                         </span>
//                         <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-black mb-4">
//                             FAMOUS CREW
//                         </h2>
//                         <p className="text-[10px] font-bold text-black/60 tracking-wider mb-6">
//                             399.00 USD
//                         </p>
//                         <div className="w-12 h-[1px] bg-black/30 mb-6" />
//                         <p className="text-[10px] uppercase tracking-wider text-black/70 leading-relaxed max-w-xs">
//                             Engineered with high-density technical weaves and intense tonal framing, matching the signature minimalist industrial archetype.
//                         </p>
//                     </div>

//                     <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-2 shadow-2xl">
//                         <div className="relative h-[550px] sm:h-[620px] w-full bg-black overflow-hidden group cursor-pointer">
//                             <img
//                                 src="https://i.pinimg.com/originals/9e/96/88/9e96881f8baa5bf87b0b950c24cf7585.jpg"
//                                 alt="Famous Crew Grey Technical Hoodie"
//                                 className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
//                             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-white">
//                                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black/80 px-3 py-1 backdrop-blur-md border border-white/20">
//                                     01  OVERSIZED HOODIE
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="relative h-[550px] sm:h-[620px] w-full bg-black overflow-hidden group cursor-pointer">
//                             <img
//                                 src="https://i.pinimg.com/1200x/9b/26/5b/9b265b154c3eaee20718daf2b28a9f73.jpg"
//                                 alt="Technical Masked Outfit"
//                                 className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
//                             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-white">
//                                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black/80 px-3 py-1 backdrop-blur-md border border-white/20">
//                                     02  TECH WEAVE BALACLAVA
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* HORIZONTAL SCROLLING ROW */}
//                 <div className="mt-12 pt-6 border-t border-black/15">
//                     <div
//                         ref={scrollContainerRef}
//                         className="w-full overflow-x-auto pb-4 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//                     >
//                         <div className="flex gap-2 w-max">
//                             {screenshotRowItems.map((item, index) => (
//                                 <div
//                                     key={item.id}
//                                     className="flex flex-col group bg-transparent shrink-0 w-[190px] sm:w-[210px]"
//                                 >
//                                     <div
//                                         onClick={() => setSelectedProduct(item)}
//                                         className="relative h-[260px] sm:h-[290px] w-full bg-[#f2f1ed] overflow-hidden mb-2.5 shadow-xl cursor-pointer"
//                                     >
//                                         <img
//                                             src={item.image}
//                                             alt={item.name}
//                                             loading="lazy"
//                                             className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
//                                         <div className="absolute bottom-2 left-2 z-10 text-white">
//                                             <span className="text-[8px] font-bold tracking-[0.1em] uppercase bg-black/80 px-1.5 py-0.5 backdrop-blur-md border border-white/10">
//                                                 0{index + 1}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col items-center text-center">
//                                         <h3
//                                             onClick={() => setSelectedProduct(item)}
//                                             className="text-[9px] font-bold uppercase tracking-wider text-black group-hover:text-zinc-600 transition-colors leading-snug cursor-pointer"
//                                         >
//                                             {item.name}
//                                         </h3>
//                                         <p className="text-[9px] font-bold text-black/60 tracking-wider mt-1">
//                                             {item.price.toFixed(2)} USD
//                                         </p>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 addToCart(item);
//                                                 setIsCartOpen(true);
//                                             }}
//                                             className="mt-2 bg-black text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
//                                         >
//                                             <Plus className="w-2.5 h-2.5" /> Add
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="mt-6 mb-2">
//                         <div
//                             ref={trackRef}
//                             className="w-full h-[1px] bg-black/20 relative cursor-pointer"
//                         >
//                             <div
//                                 onMouseDown={handleMouseDown}
//                                 style={{
//                                     width: `${thumbWidth}%`,
//                                     transform: `translateX(${thumbLeft}px)`
//                                 }}
//                                 className={`absolute top-1/2 -translate-y-1/2 h-[3px] bg-black cursor-grab active:cursor-grabbing transition-colors ${isDragging ? 'bg-zinc-700' : ''}`}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* STAY IN THE LOOP SECTION (FOOTER) */}
//             <section className="relative px-2 pt-14 pb-12 bg-[#f2f1ed] border-t border-black/10 flex flex-col items-center text-center">
//                 <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-black mb-3">
//                     STAY IN THE LOOP
//                 </h2>
//                 <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-black/60 mb-8 max-w-sm">
//                     KEEP UP TO DATE WITH NEW DROPS, LATEST COLLECTIONS AND SALES.
//                 </p>

//                 <div className="flex w-full max-w-md justify-center mb-12">
//                     <input
//                         type="email"
//                         placeholder="Your email"
//                         className="bg-transparent border border-black/30 px-4 py-2.5 text-[10px] uppercase tracking-widest outline-none w-full text-black placeholder:text-black/40 focus:border-black transition-colors"
//                     />
//                     <button
//                         onClick={() => alert("Subscribed successfully!")}
//                         className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
//                     >
//                         SUBSCRIBE
//                     </button>
//                 </div>

//                 <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-[9px] uppercase tracking-[0.2em] text-black/70 gap-6">
//                     <div className="flex flex-wrap justify-center md:justify-start gap-6">
//                         <button onClick={() => setActiveModal('privacy')} className="hover:text-black transition-colors cursor-pointer">Privacy Policy</button>
//                         <button onClick={() => setActiveModal('refunds')} className="hover:text-black transition-colors cursor-pointer">Refund policy</button>
//                         <button onClick={() => setActiveModal('terms')} className="hover:text-black transition-colors cursor-pointer">Terms of Service</button>
//                         <button onClick={() => setActiveModal('cookies')} className="hover:text-black transition-colors cursor-pointer">Cookie preferences</button>
//                     </div>

//                     <div className="flex items-center gap-6">
//                         <span>A U.S. / EU & ROOM</span>
//                         <div className="flex gap-4 text-xs">
//                             <a href="#instagram" className="hover:text-black transition-colors" aria-label="Instagram">IG</a>
//                             <a href="#youtube" className="hover:text-black transition-colors" aria-label="YouTube">YT</a>
//                             <a href="#tiktok" className="hover:text-black transition-colors" aria-label="TikTok">TT</a>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="w-full overflow-hidden mt-10 select-none pointer-events-none">
//                     <h1 className="text-[13vw] font-black uppercase tracking-tighter text-black/10 leading-none text-center">
//                         ESSENZA
//                     </h1>
//                 </div>

//                 {/* POLICY MODALS OVERLAY */}
//                 {activeModal && (
//                     <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//                         <div className="bg-[#f2f1ed] text-black w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-10 border border-black/20 shadow-2xl relative font-mono text-left">
//                             <button
//                                 onClick={() => setActiveModal(null)}
//                                 className="absolute top-6 right-6 bg-black text-white px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer"
//                             >
//                                 CLOSE [X]
//                             </button>

//                             {activeModal === 'privacy' && (
//                                 <div>
//                                     <h2 className="text-xl font-black uppercase tracking-widest mb-4">Privacy Policy</h2>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         Last updated: August 2026. We respect your digital privacy. This policy outlines how we collect, use, and protect your personal data when interacting with our store and digital platform.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Information Collection</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         We gather identifiers such as your name, contact details, and shipping address strictly to fulfill transactions and enhance your user experience.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">2. Data Security</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase">
//                                         Encryption protocols are implemented across all structural data transfers to safeguard your sessions and personal entries.
//                                     </p>
//                                 </div>
//                             )}

//                             {activeModal === 'refunds' && (
//                                 <div>
//                                     <h2 className="text-xl font-black uppercase tracking-widest mb-4">Refund Policy</h2>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         We maintain a rigorous standard for all archive and seasonal releases. Returns are accepted within 14 days of delivery for items in original, unworn condition with tags attached.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Processing Period</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         Once inspected at our facility, approved refunds are credited back to the original method of payment within 5 to 7 business days.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">2. Final Sale Items</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase">
//                                         Markdown configurations, limited hardware drops, and experimental archive releases are marked final sale and cannot be returned.
//                                     </p>
//                                 </div>
//                             )}

//                             {activeModal === 'terms' && (
//                                 <div>
//                                     <h2 className="text-xl font-black uppercase tracking-widest mb-4">Terms of Service</h2>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         By accessing this platform, you agree to comply with our foundational terms of industrial distribution, copyright guidelines, and user conduct standards.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Intellectual Property</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         All imagery, layout code, typography systems, and graphic vectors are the explicit intellectual property of the studio.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">2. Limitation of Liability</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase">
//                                         The studio is not responsible for interruptions caused by network infrastructure or third-party logistics failures.
//                                     </p>
//                                 </div>
//                             )}

//                             {activeModal === 'cookies' && (
//                                 <div>
//                                     <h2 className="text-xl font-black uppercase tracking-widest mb-4">Cookie Preferences</h2>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         Our platform uses minimal functional cookies to retain session states, cart configurations, and inertial scrolling metrics.
//                                     </p>
//                                     <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2">1. Essential Tracking</h3>
//                                     <p className="text-[10px] text-black/70 leading-relaxed uppercase mb-4">
//                                         Required for secure checkout navigation and interface persistence. These cannot be disabled through standard settings.
//                                     </p>
//                                     <button
//                                         onClick={() => { alert("Preferences saved successfully."); setActiveModal(null); }}
//                                         className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer mt-2"
//                                     >
//                                         SAVE PREFERENCES
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </section>

//             {/* PRODUCT DETAIL MODAL */}
//             {selectedProduct && (
//                 <Product
//                     product={selectedProduct}
//                     onBack={() => setSelectedProduct(null)}
//                 />
//             )}

//             {/* ========================================== */}
//             {/* FULL-PAGE CHECKOUT & CART VIEW OVERLAY     */}
//             {/* ========================================== */}
//             {isCartOpen && (
//                 <div className="absolute inset-0 z-[110] bg-[#f2f1ed] text-black flex flex-col font-mono overflow-y-auto animate-fadeIn">
//                     {/* Cart Header */}
//                     <div className="sticky top-0 bg-[#f2f1ed]/90 backdrop-blur-md px-6 sm:px-12 py-6 border-b border-black/15 flex items-center justify-between z-20">
//                         <div className="flex items-center gap-3">
//                             <ShoppingBag className="w-6 h-6 text-black" />
//                             <h2 className="text-lg sm:text-xl font-black uppercase tracking-widest">
//                                 REVIEW CART & CHECKOUT ({totalItems})
//                             </h2>
//                         </div>
//                         <button
//                             onClick={() => setIsCartOpen(false)}
//                             className="bg-black text-white px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-2"
//                         >
//                             <span>Resume Shopping</span>
//                             <X className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Cart Body Content */}
//                     <div className="max-w-5xl w-full mx-auto px-6 py-12 flex-1">
//                         {cartItems.length === 0 ? (
//                             <div className="text-center py-32">
//                                 <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-black/20" />
//                                 <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-2">Your cart is currently empty</h3>
//                                 <p className="text-[10px] uppercase tracking-wider text-black/60 mb-8">Add rigorous technical apparel or assets from the collection to proceed.</p>
//                                 <button
//                                     onClick={() => setIsCartOpen(false)}
//                                     className="bg-black text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors cursor-pointer"
//                                 >
//                                     Explore Collection
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//                                 {/* Left Column: Itemised List */}
//                                 <div className="lg:col-span-7 space-y-6">
//                                     <div className="flex justify-between items-center pb-4 border-b border-black/15 text-[10px] font-bold uppercase tracking-widest text-black/60">
//                                         <span>Item Description</span>
//                                         <button
//                                             onClick={() => clearCart()}
//                                             className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
//                                         >
//                                             <Trash2 className="w-3.5 h-3.5" /> Clear Cart
//                                         </button>
//                                     </div>

//                                     {cartItems.map((item) => (
//                                         <div key={item.id} className="flex gap-4 items-center pb-6 border-b border-black/10">
//                                             <img
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 className="w-20 h-24 object-cover border border-black/10 bg-white"
//                                             />
//                                             <div className="flex-1">
//                                                 <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">{item.name}</h4>
//                                                 <p className="text-[10px] uppercase tracking-wider text-black/60 mb-2">${Number(item.price).toFixed(2)} USD</p>
//                                                 <div className="text-[10px] font-bold uppercase tracking-wider text-black">
//                                                     Quantity: {item.quantity}
//                                                 </div>
//                                             </div>
//                                             <div className="text-right">
//                                                 <span className="text-xs font-bold uppercase tracking-wider text-black block mb-3">
//                                                     ${(item.price * item.quantity).toFixed(2)}
//                                                 </span>
//                                                 <button
//                                                     onClick={() => removeFromCart(item.id)}
//                                                     className="text-[9px] uppercase tracking-widest text-red-600 hover:underline font-bold cursor-pointer"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Right Column: Summary & Secure Checkout */}
//                                 <div className="lg:col-span-5 bg-white p-8 border border-black/15 shadow-xl flex flex-col justify-between">
//                                     <div>
//                                         <h3 className="text-sm font-black uppercase tracking-widest mb-6 pb-4 border-b border-black/15">
//                                             ORDER SUMMARY
//                                         </h3>
//                                         <div className="space-y-3 text-[10px] uppercase tracking-wider text-black/70 mb-6">
//                                             <div className="flex justify-between">
//                                                 <span>Subtotal</span>
//                                                 <span className="font-bold text-black">${totalPrice.toFixed(2)} USD</span>
//                                             </div>
//                                             <div className="flex justify-between">
//                                                 <span>Estimated Shipping</span>
//                                                 <span className="font-bold text-black">Calculated at Checkout</span>
//                                             </div>
//                                             <div className="flex justify-between">
//                                                 <span>Taxes & Duties</span>
//                                                 <span className="font-bold text-black">Included</span>
//                                             </div>
//                                         </div>
//                                         <div className="pt-4 border-t border-black/15 flex justify-between items-center text-xs font-black uppercase tracking-widest mb-8">
//                                             <span>Total Amount</span>
//                                             <span>${totalPrice.toFixed(2)} USD</span>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={() => {
//                                             alert("Proceeding to secure checkout gateway...");
//                                         }}
//                                         className="w-full bg-black text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
//                                     >
//                                         <span>Proceed to Secure Checkout</span>
//                                         <ArrowRight className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }