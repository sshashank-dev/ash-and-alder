export default function DisplayPlatform({ position }) {
    return (
        <mesh
            position={position}
            receiveShadow
            castShadow
        >
            <cylinderGeometry args={[1, 1, .5, 40]} />

            <meshStandardMaterial
                color="#202020"
                roughness={0.15}
            />
        </mesh>
    );
}