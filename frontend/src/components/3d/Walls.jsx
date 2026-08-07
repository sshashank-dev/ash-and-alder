export default function Walls() {
    return (
        <group>

            {/* Back */}

            <mesh position={[0, 3, -10]}>
                <boxGeometry args={[18, 6, 0.2]} />

                <meshStandardMaterial color="#171717" />
            </mesh>

            {/* Left */}

            <mesh position={[-9, 3, 0]}>
                <boxGeometry args={[0.2, 6, 20]} />

                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Right */}

            <mesh position={[9, 3, 0]}>
                <boxGeometry args={[0.2, 6, 20]} />

                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

        </group>
    );
}