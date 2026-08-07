import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";

export function ShoeRack(props) {
    // 1. Updated path to point to your new single file and added Draco support
    const { scene } = useGLTF("/models/shoes-v1.glb", "/draco/");

    // 2. Clone the scene to save memory and prevent re-parsing
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useLayoutEffect(() => {
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.material.roughness = 1.0;
                child.material.metalness = 0.0;
                child.material.envMapIntensity = 0.2;

                // 3. Disable shadows to keep frame rate high for scenery
                child.castShadow = false;
                child.receiveShadow = false;

                child.material.needsUpdate = true;
            }
        });
    }, [clonedScene]);

    return <primitive object={clonedScene} {...props} />;
}