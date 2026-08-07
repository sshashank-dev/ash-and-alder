"use client";

import { Experience } from "@/components/3d/Experience";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
    // We create a container ref to track scroll
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    // Fade out UI as soon as user starts scrolling
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <main ref={containerRef} className="relative h-[300vh] w-full bg-black">
            {/* The 3D Canvas stays fixed while the page scrolls */}
            <div className="fixed inset-0 z-0">
                <Experience />
            </div>

            {/* UI Overlay with Motion */}
            <motion.div
                style={{ opacity }}
                className="fixed inset-0 z-10 flex h-full flex-col justify-between p-12 pointer-events-none"
            >
                <header className="flex justify-between items-start">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                        Drip Trip
                    </h1>
                    <nav className="flex gap-8 text-white font-medium uppercase text-sm tracking-widest pointer-events-auto">
                        <span className="cursor-pointer hover:underline">Collection</span>
                        <span className="cursor-pointer hover:underline">About</span>
                    </nav>
                </header>

                <div className="text-white">
                    <p className="text-xs uppercase tracking-widest opacity-60">
                        Scroll to Navigate
                    </p>
                    <div className="h-px w-24 bg-white mt-2" />
                </div>
            </motion.div>
        </main>
    );
}