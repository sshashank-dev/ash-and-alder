import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";

export function ClothingRack(props) {
    // 1. Updated path to the single .glb file
    const { scene } = useGLTF("/models/clothingrack.glb", "/draco/");

    // 2. Clone the scene for optimized performance
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useLayoutEffect(() => {
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.material.roughness = 1.0;
                child.material.metalness = 0.0;
                child.material.envMapIntensity = 0.2;

                // Disable shadows for scenery to keep frame rate high
                child.castShadow = false;
                child.receiveShadow = false;

                child.material.needsUpdate = true;
            }
        });
    }, [clonedScene]);

    return <primitive object={clonedScene} {...props} />;
}