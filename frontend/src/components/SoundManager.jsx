import React, { useEffect, useRef, useState } from "react";

export function SoundManager({ volume }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            // Keep playbackRate normal (1.0) so speed doesn't change
            audioRef.current.playbackRate = 1.0;

            // Cap the maximum volume so it stays soft like a quiet mall ambiance (never blasting loud)
            const maxMallVolume = 0.50;
            const adjustedVolume = volume * maxMallVolume;

            audioRef.current.volume = Math.max(0, Math.min(maxMallVolume, adjustedVolume));
        }
    }, [volume]);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    return (
        <>
            {/* Drop your streetwear/ambient audio file at public/audio/beat.mp3 */}
            <audio ref={audioRef} src="/audio/beat.mp3" loop />
            <button
                onClick={toggleAudio}
                className="cursor-pointer hover:text-white transition-colors flex items-center gap-2 pointer-events-auto"
            >
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-white/40"}`} />
                AUDIO [{isPlaying ? "ON" : "OFF"}]
            </button>
        </>
    );
}