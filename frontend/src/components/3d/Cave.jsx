import { useGLTF } from "@react-three/drei";
import { useLayoutEffect } from "react";

export function Cave(props) {
    const { scene } = useGLTF("/models/cave-compressed.glb", "/draco/");

    useLayoutEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.roughness = 1.0;
                child.material.metalness = 0.0;
                child.material.envMapIntensity = 0.2;
                child.material.needsUpdate = true;
            }
        });
    }, [scene]);

    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/cave-compressed.glb", "/draco/");