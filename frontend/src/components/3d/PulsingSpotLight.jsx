import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";

export function PulsingSpotLight({ position, targetPosition, color = "#ffffff" }) {
    const lightRef = useRef();

    useFrame((state) => {
        // Pulse intensity between 1 and 2 based on time
        const t = state.clock.getElapsedTime();
        if (lightRef.current) {
            lightRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.5;
        }
    });

    return (
        <SpotLight
            ref={lightRef}
            position={position}
            angle={0.3}
            penumbra={0.5}
            intensity={1.5}
            color={color}
            target-position={targetPosition}
        />
    );
}