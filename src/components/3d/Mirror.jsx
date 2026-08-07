// import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
// import { useEffect } from "react";
// import * as THREE from "three";

// export function Mirror(props) {
//     // Point directly to the gltf file in your mirror folder
//     const { scene } = useGLTF("/models/mirror/scene.gltf");

//     useEffect(() => {
//         scene.traverse((child) => {
//             if (child.isMesh) {
//                 // Adjust this string to match the name of the glass mesh inside your model
//                 // If you aren't sure, console.log(child.name) here to see the names
//                 if (child.name.includes("Glass")) {
//                     child.material = new MeshReflectorMaterial({
//                         resolution: 256,
//                         blur: [500, 100],
//                         mixBlur: 1,
//                         mixStrength: 40,
//                         color: "#c0c0c0",
//                         metalness: 0.8,
//                         roughness: 0.1,
//                     });
//                 }
//             }
//         });
//     }, [scene]);

//     return <primitive object={scene} {...props} />;
// }


import { useMemo } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export function Mirror(props) {
    // 1. Point to your new .glb file
    const { scene } = useGLTF("/models/mirror.glb", "/draco/");

    // 2. Clone the scene to ensure it's performant
    const sceneClone = useMemo(() => scene.clone(), [scene]);

    // 3. Find the glass mesh and swap it for a real Reflector component
    // We use useMemo to only run this once
    useMemo(() => {
        sceneClone.traverse((child) => {
            if (child.isMesh && child.name.includes("Glass")) {
                // You cannot "set" a react component here.
                // Instead, we keep the geometry and replace the material directly
                child.material = new MeshReflectorMaterial({
                    resolution: 256,
                    blur: [500, 100],
                    mixBlur: 1,
                    mixStrength: 40,
                    color: "#c0c0c0",
                    metalness: 0.8,
                    roughness: 0.1,
                });
            }
        });
    }, [sceneClone]);

    return <primitive object={sceneClone} {...props} />;
}