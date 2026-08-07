import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useScroll, Text } from "@react-three/drei";

export function ProductShowcase() {
    const scroll = useScroll();

    const group = useRef();
    const image = useRef();
    const text = useRef();

    const cap = useLoader(TextureLoader, "/products/cap.png");

    useFrame((state) => {
        const offset = scroll.offset;

        // starts near end of showroom
        const reveal = THREE.MathUtils.smoothstep(
            offset,
            0.78,
            0.92
        );

        if (!group.current) return;

        group.current.visible = reveal > 0.001;

        // Fade to black
        group.current.position.set(0, 2, -2);

        // Floating
        group.current.position.y =
            2 + Math.sin(state.clock.elapsedTime * 2) * 0.08;

        // Scale
        const s = THREE.MathUtils.lerp(0.5, 2.4, reveal);
        group.current.scale.setScalar(s);

        // Rotation
        group.current.rotation.y =
            Math.sin(state.clock.elapsedTime * 0.8) * 0.12;

        image.current.material.opacity = reveal;

        text.current.material.opacity = reveal;
    });

    return (
        <group ref={group} visible={false}>

            {/* BLACK BACKGROUND */}
            <mesh position={[0, 0, -1]}>
                <planeGeometry args={[40, 25]} />
                <meshBasicMaterial
                    color="black"
                    transparent
                    opacity={0.92}
                />
            </mesh>

            {/* PRODUCT */}
            <mesh ref={image}>
                <planeGeometry args={[3, 3]} />

                <meshBasicMaterial
                    map={cap}
                    transparent
                    opacity={0}
                    depthWrite={false}
                />
            </mesh>

            {/* TITLE */}
            <Text
                ref={text}
                position={[0, -2.6, 0]}
                fontSize={0.35}
                letterSpacing={0.08}
                color="white"
                anchorX="center"
            >
                HEADWEAR
            </Text>

            <Text
                position={[0, -3.1, 0]}
                fontSize={0.15}
                color="#999"
                anchorX="center"
            >
                Premium Essentials
            </Text>
        </group>
    );
}