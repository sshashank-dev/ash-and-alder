import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

export function Sofa(props) {
    // 1. Updated path to the single .glb file and added Draco support
    const { scene } = useGLTF("/models/sofa-v1.glb", "/draco/");

    // 2. Clone the scene for optimized performance
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useLayoutEffect(() => {
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                // Ensure the material is double-sided so no faces disappear
                child.material.side = THREE.DoubleSide;

                // Shadows are already enabled in your primitive, 
                // so we keep them enabled here too
                child.castShadow = true;
                child.receiveShadow = true;

                child.material.needsUpdate = true;
            }
        });
    }, [clonedScene]);

    return <primitive object={clonedScene} {...props} />;
}