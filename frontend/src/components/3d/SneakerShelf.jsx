import React from "react";

export function SneakerShelf({ position }) {
    return (
        <group position={position}>
            {/* Shelf Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 0.1, 1]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* 3 Floating "Box" placeholders (represented as sleek cubes) */}
            {[0, 0.7, -0.7].map((x, i) => (
                <mesh key={i} position={[x, 0.4, 0]}>
                    <boxGeometry args={[0.5, 0.6, 0.4]} />
                    {/* We use emissive material so it glows slightly like a hype display */}
                    <meshStandardMaterial color="#333" emissive="#111" />
                </mesh>
            ))}
        </group>
    );
}