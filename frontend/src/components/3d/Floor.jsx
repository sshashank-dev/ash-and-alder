import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

export function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[400, 400]}
                resolution={1024}
                mixBlur={1}
                mixStrength={80}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#0b0b0b"
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}