import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function useCaveAudio() {
    const { camera } = useThree();

    const volume = useRef(0);

    const cavePosition = new THREE.Vector3(0, 1, 0);

    useFrame(() => {

        const distance = camera.position.distanceTo(cavePosition);


        // Far = silent
        // Close = loud

        const minDistance = 5;
        const maxDistance = 45;


        let targetVolume =
            1 -
            (distance - minDistance) /
            (maxDistance - minDistance);


        targetVolume = THREE.MathUtils.clamp(
            targetVolume,
            0,
            1
        );


        // smooth volume
        volume.current = THREE.MathUtils.lerp(
            volume.current,
            targetVolume,
            0.05
        );

    });


    return volume.current;
}