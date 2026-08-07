import { useMemo } from "react";

export function Stars() {
    const count = 50000;

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Wide background
            positions[i * 3] = (Math.random() - 0.5) * 250;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 150;

            // Just behind the store
            positions[i * 3 + 2] = -30 - Math.random() * 40;
        }

        return positions;
    }, []);

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={particles}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                color="white"
                size={0.08}
                sizeAttenuation
                transparent
                opacity={1}
                depthWrite={false}
            />
        </points>
    );
}