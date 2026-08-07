import React, { useState, useEffect } from "react";

export function UIOverlay() {
    const [fps, setFps] = useState(60);
    const [audioActive, setAudioActive] = useState(false);
    const audioRef = React.useRef(null);

    // Simple FPS counter simulation for telemetry feel
    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();

        const calcFPS = () => {
            frameCount++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = now;
            }
            requestAnimationFrame(calcFPS);
        };
        const handle = requestAnimationFrame(calcFPS);
        return () => cancelAnimationFrame(handle);
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (audioActive) {
            audioRef.current.pause();
            setAudioActive(false);
        } else {
            audioRef.current.play().catch(() => { });
            setAudioActive(true);
        }
    };

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 text-white font-mono select-none z-10">
            {/* Hidden audio element - drop an ambient track link in public/audio/ambient.mp3 */}
            <audio ref={audioRef} src="/audio/ambient.mp3" loop />

            {/* Top Bar: Telemetry & Audio Toggle */}
            <div className="flex justify-between items-start">
                <div className="border border-white/20 bg-black/60 backdrop-blur-md px-4 py-2 text-xs tracking-widest text-white/70">
                    <p>SYS.LOC // 26.9124° N, 75.7873° E</p>
                    <p className="text-emerald-400">FPS: {fps} [STABLE]</p>
                </div>

                <button
                    onClick={toggleAudio}
                    className="pointer-events-auto border border-white/30 bg-black/80 hover:bg-white hover:text-black transition-colors px-4 py-2 text-xs tracking-wider uppercase"
                >
                    AUDIO [{audioActive ? "ON" : "OFF"}]
                </button>
            </div>

            {/* Bottom Bar: Instructions / Branding */}
            <div className="flex justify-between items-end">
                <div className="border-l-2 border-white pl-4 text-xs tracking-widest text-white/60">
                    <p className="text-white font-bold">EXPERIENCE // V.026</p>
                    <p>SCROLL TO NAVIGATE ENVIRONMENT</p>
                </div>

                <div className="text-xs tracking-widest text-white/40">
                    [SECURE CONNECTION]
                </div>
            </div>
        </div>
    );
}