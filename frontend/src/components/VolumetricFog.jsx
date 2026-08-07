function VolumetricFog() {
    return (
        <mesh position={[0, 0, -10]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial
                color="#222222"
                transparent
                opacity={0.3}
                depthWrite={false}
            />
        </mesh>
    );
}