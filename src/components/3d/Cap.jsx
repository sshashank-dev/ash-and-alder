import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const Cap = (props) => {
    const capRef = useRef();

    const { scene } = useGLTF("/models/cap.glb");

    useFrame((state) => {
        if (capRef.current) {
            capRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        }
    });

    return (
        <group ref={capRef} {...props}>
            {/* Reduce these numbers to make the cap smaller */}
            <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
        </group>
    );
};

useGLTF.preload("/models/cap.glb");