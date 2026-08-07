// import React, { useLayoutEffect } from "react";
// import { useGLTF } from "@react-three/drei";

// export function BasketballPlayer(props) {
//     // Replace with the actual path to your file in the public folder
//     const { scene } = useGLTF("/models/basketball_mannequin/scene.gltf", "/draco/");

//     // This loop ensures all parts of the model look good (optional)
//     useLayoutEffect(() => {
//         scene.traverse((obj) => {
//             if (obj.isMesh) {
//                 obj.castShadow = true;
//                 obj.receiveShadow = true;
//             }
//         });
//     }, [scene]);

//     return <primitive object={scene} {...props} />;
// }



import React, { useLayoutEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export function BasketballPlayer(props) {
    // 1. Updated path to the single .glb file in the public/models/ folder
    const { scene } = useGLTF("/models/basketballplayer.glb", "/draco/");

    // 2. Clone the scene for performance
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useLayoutEffect(() => {
        clonedScene.traverse((obj) => {
            if (obj.isMesh) {
                // If this is strictly scenery/background, 
                // you can set these to false to improve FPS
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    }, [clonedScene]);

    return <primitive object={clonedScene} {...props} />;
}