import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export function Lightning() {
    const light = useRef();
    const { invalidate } = useThree();

    // We use a counter to make the flash last longer than 1 frame
    const flashDuration = useRef(0);

    useFrame(() => {
        // Randomly trigger a flash (lower chance = fewer flashes)
        if (Math.random() > 0.99 && flashDuration.current === 0) {
            flashDuration.current = 5; // Flash lasts for 5 frames
        }

        if (flashDuration.current > 0) {
            // Bright flash: use high intensity
            light.current.intensity = 500;
            flashDuration.current -= 1;
            invalidate(); // Keep rendering while flashing
        } else {
            light.current.intensity = 0;
        }
    });

    return (
        <pointLight
            ref={light}
            position={[0, 10, 0]}
            color="#ffffff"
            intensity={0}
            distance={100}
            decay={2}
        />
    );
}