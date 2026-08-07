// import { useGLTF } from "@react-three/drei";
// import { useLayoutEffect } from "react";

// export function Mannequin(props) {
//     const { scene } = useGLTF("/models/male_mannequin/scene.gltf", "/draco/");

//     useLayoutEffect(() => {
//         scene.traverse((child) => {
//             if (child.isMesh) {
//                 child.material.roughness = 1.0;
//                 child.material.metalness = 0.0;
//                 child.material.envMapIntensity = 0.2;
//                 child.material.needsUpdate = true;
//             }
//         });
//     }, [scene]);

//     return <primitive object={scene} {...props} />;
// }



import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";

export function Mannequin(props) {
    // 1. Updated path to point to the new single .glb file
    const { scene } = useGLTF("/models/male_mannequin.glb", "/draco/");

    // 2. Clone the scene for performance (shares geometry in memory)
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useLayoutEffect(() => {
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.material.roughness = 1.0;
                child.material.metalness = 0.0;
                child.material.envMapIntensity = 0.2;

                // Disable shadows for scenery performance
                child.castShadow = false;
                child.receiveShadow = false;

                child.material.needsUpdate = true;
            }
        });
    }, [clonedScene]);

    return <primitive object={clonedScene} {...props} />;
}