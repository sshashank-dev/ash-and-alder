import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export function DustParticles({ count = 1500 }) {
    const points = useRef();

    // 1. Texture is cached by Three.js/Drei, no load penalty after first fetch
    const circleTexture = useTexture("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png");

    // 2. Memoized positions ensure zero CPU overhead after initial render
    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 100;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 50;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return temp;
    }, [count]);

    // 3. Minimal footprint: Direct property assignment
    useFrame(({ clock }) => {
        if (points.current) {
            points.current.rotation.y = clock.getElapsedTime() * 0.01;
        }
    });

    return (
        <points ref={points} frustumCulled={true}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation={true}
                alphaMap={circleTexture}
                alphaTest={0.001}
                depthWrite={false}
            />
        </points>
    );
}