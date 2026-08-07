import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three"; // Essential import for the Color object

export function Car(props) {
    const { scene } = useGLTF("/models/scene.gltf", "/draco/");

    useLayoutEffect(() => {
        // Cache the emissive color outside the traverse to save memory
        const whiteEmissive = new THREE.Color(0xffffff);

        scene.traverse((child) => {
            if (child.isMesh) {
                const name = child.name.toLowerCase();
                const isLight = name.includes("light") || name.includes("lamp");
                const isLogo = name.includes("logo") || name.includes("emblem") || name.includes("bmw");

                if (!isLight && !isLogo) {
                    // Update material properties directly - no new objects created
                    child.material.color.set("#050505");
                    child.material.roughness = 0.1;
                    child.material.metalness = 0.9;
                    child.material.envMapIntensity = 1.5;
                    child.material.needsUpdate = true;
                } else if (isLight) {
                    child.material.emissive = whiteEmissive;
                    child.material.emissiveIntensity = 2;
                    child.material.needsUpdate = true;
                }
            }
        });
    }, [scene]);

    return <primitive object={scene} {...props} />;
}