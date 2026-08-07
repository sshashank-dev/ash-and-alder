import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FadeIn({ children }) {
    const group = useRef();

    useFrame((state, delta) => {
        if (!group.current) return;

        // Smoothly increase opacity of all meshes inside this group
        group.current.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                // The "3" controls the fade speed. Higher = faster.
                child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, 1, delta * 3);
            }
        });
    });

    return <group ref={group}><group>{children}</group></group>;
}