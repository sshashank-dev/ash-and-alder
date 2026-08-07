import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function StormClouds() {
    const group = useRef();
    const light = useRef();
    const { invalidate } = useThree();

    // Randomly flicker
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // A more "natural" lightning pattern: flash in bursts
        if (Math.random() > 0.99) {
            light.current.intensity = 500 + Math.random() * 500;
            invalidate();
        } else {
            light.current.intensity = THREE.MathUtils.lerp(light.current.intensity, 0, 0.2);
        }
    });

    return (
        <group ref={group} position={[0, 15, 0]}>
            {/* The Light Source hidden inside the "clouds" */}
            <pointLight ref={light} color="#77aaff" intensity={0} distance={50} decay={2} />

            {/* The Cloud Geometry: Large, semi-transparent spheres */}
            <mesh scale={[2, 1, 2]}>
                <sphereGeometry args={[15, 32, 32]} />
                <meshStandardMaterial
                    color="#222"
                    transparent
                    opacity={0.7}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}