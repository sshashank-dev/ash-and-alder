export default function Ceiling() {
    return (
        <mesh position={[0, 6, 0]}>
            <boxGeometry args={[18, .2, 20]} />

            <meshStandardMaterial color="#111111" />
        </mesh>
    );
}