function HangingCloth(props) {
    return (
        <mesh {...props} castShadow>
            {/* Capsule shape represents a piece of clothing */}
            <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
        </mesh>
    );
}