import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Storm() {
    const { scene, invalidate } = useThree();
    const flashRef = useRef(0);
    const ambientIntensity = useRef(0.02);

    useFrame(() => {
        // Unpredictable storm logic: lightning strikes in bursts
        if (Math.random() > 0.992 && flashRef.current === 0) {
            flashRef.current = 4; // Flash duration
        }

        if (flashRef.current > 0) {
            // "Real" lightning: bright white flash that washes out the whole scene
            scene.background = new THREE.Color("#ffffff");
            ambientIntensity.current = 2.0;
            flashRef.current -= 1;
            invalidate();
        } else {
            // Return to dark, stormy void
            scene.background = new THREE.Color("#000000");
            ambientIntensity.current = 0.02;
        }
    });

    return <ambientLight intensity={ambientIntensity.current} color="#aaccff" />;
}