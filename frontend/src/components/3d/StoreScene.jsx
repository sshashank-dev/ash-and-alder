import { useScroll, Box, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const StoreScene = () => {
    const scroll = useScroll();

    useFrame((state) => {
        // This moves the camera from Z=10 (Outside) to Z=-20 (Inside)
        state.camera.position.z = THREE.MathUtils.lerp(10, -20, scroll.offset);
    });

    return (
        <group>
            {/* The Floor */}
            <Plane args={[20, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]}>
                <meshStandardMaterial color="#111" />
            </Plane>

            {/* Left & Right Walls */}
            <Box args={[1, 10, 100]} position={[-8, 4, -20]} />
            <Box args={[1, 10, 100]} position={[8, 4, -20]} />

            {/* Your "Product" at the end */}
            <mesh position={[0, 1.5, -40]}>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <meshStandardMaterial color="white" metalness={1} roughness={0.2} />
            </mesh>
        </group>
    );
};