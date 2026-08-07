// export function Store() {
//     return (
//         <group>

//             {/* Floor */}

//             <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
//                 <planeGeometry args={[30, 30]} />
//                 <meshStandardMaterial color="#101010" />
//             </mesh>

//             {/* Left Wall */}

//             <mesh position={[-6, 3, -5]}>
//                 <boxGeometry args={[0.2, 6, 12]} />
//                 <meshStandardMaterial color="#151515" />
//             </mesh>

//             {/* Right Wall */}

//             <mesh position={[6, 3, -5]}>
//                 <boxGeometry args={[0.2, 6, 12]} />
//                 <meshStandardMaterial color="#151515" />
//             </mesh>

//             {/* Back Wall */}

//             <mesh position={[0, 3, -11]}>
//                 <boxGeometry args={[12, 6, 0.2]} />
//                 <meshStandardMaterial color="#181818" />
//             </mesh>

//             {/* Ceiling */}

//             <mesh position={[0, 6, -5]}>
//                 <boxGeometry args={[12, 0.2, 12]} />
//                 <meshStandardMaterial color="#111111" />
//             </mesh>

//             {/* Clothing Rack */}

//             <mesh position={[-2.5, 1.3, -5]} castShadow>
//                 <boxGeometry args={[2.8, 2.6, 0.4]} />
//                 <meshStandardMaterial color="#222222" />
//             </mesh>

//             <mesh position={[2.5, 1.3, -5]} castShadow>
//                 <boxGeometry args={[2.8, 2.6, 0.4]} />
//                 <meshStandardMaterial color="#222222" />
//             </mesh>

//             {/* Center Product */}

//             <mesh position={[0, 1.2, -2]} castShadow>
//                 <torusKnotGeometry args={[0.8, 0.25, 180, 32]} />
//                 <meshStandardMaterial
//                     color="#ffffff"
//                     metalness={1}
//                     roughness={0.15}
//                 />
//             </mesh>
//         </group>
//     );
// }




import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// This component is scaled down to match your model's tiny dimensions
function HangingCloth({ position }) {
    return (
        <mesh
            position={position}
            castShadow
            // 1. Force the engine to render these even if it thinks they are too small
            frustumCulled={false}
        >
            {/* 2. Increased size slightly to make sure they are visible */}
            <capsuleGeometry args={[0.0001, 0.0005, 4, 8]} />
            <meshStandardMaterial
                color={new THREE.Color().setHSL(Math.random(), 0.3, 0.3)}
                roughness={0.6}
            />
        </mesh>
    )
}

export function Store(props) {
    const { nodes, materials } = useGLTF('https://raw.githubusercontent.com/sshashank-dev/my-3d-store/refs/heads/main/scene.gltf')

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.9,
        roughness: 0.2,
    });

    return (
        <group {...props} dispose={null}>
            {/* Interior light to illuminate the dark matte materials */}
            <pointLight position={[0, 0.0005, 0]} intensity={0.00005} color="#ffdfaa" distance={0.005} />

            <group rotation={[-Math.PI / 2, 0, 0]}>
                <lineSegments geometry={nodes.Material2.geometry} material={materials.edge_color114114114255} />

                <mesh castShadow receiveShadow geometry={nodes.Material2_1.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_2.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_3.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_4.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_5.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_6.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_7.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_8.geometry} material={metalMaterial} />

                <mesh castShadow receiveShadow geometry={nodes.Material3.geometry} material={materials.Color_M00} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_9.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_10.geometry} material={metalMaterial} />
                <mesh castShadow receiveShadow geometry={nodes.Material2_11.geometry} material={metalMaterial} />

                {/* Clothing placed with tiny coordinates to match your scale */}
                {[-0.0003, -0.0001, 0.0001, 0.0003].map((x, i) => (
                    <HangingCloth key={i} position={[x, 0.005, 0.0005]} />
                ))}            </group>
        </group>
    )
}