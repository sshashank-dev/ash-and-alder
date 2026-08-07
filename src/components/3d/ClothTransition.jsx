import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ClothTransition({ scrollProgress = 0 }) {
    const meshRef = useRef();

    useFrame(({ camera }) => {
        if (!meshRef.current) return;

        // Trigger the fabric sweep near the end of the scroll (e.g., between 0.75 and 0.95)
        const triggerStart = 0.75;
        const triggerEnd = 0.95;

        const rawProgress = (scrollProgress - triggerStart) / (triggerEnd - triggerStart);
        const progress = THREE.MathUtils.clamp(rawProgress, 0, 1);

        // Keep the fabric locked right in front of the camera lens
        meshRef.current.position.copy(camera.position);
        meshRef.current.quaternion.copy(camera.quaternion);
        meshRef.current.translateZ(-0.8); // Position very close to the lens

        // Scale up to completely engulf the viewport when progress begins
        const scale = THREE.MathUtils.lerp(0.01, 25, progress);
        meshRef.current.scale.set(scale, scale, 1);

        // Hide completely when scroll hasn't reached the threshold yet
        meshRef.current.visible = progress > 0;
    });

    return (
        <mesh
            ref={meshRef}
            frustumCulled={false}
            renderOrder={999}
        >
            <planeGeometry args={[2, 2, 32, 32]} />
            <meshBasicMaterial
                color="#000000"
                side={THREE.DoubleSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}