// CameraHandler.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, CameraControls } from "@react-three/drei";
import * as THREE from "three";

export const CameraHandler = () => {
    const controls = useRef();
    const scroll = useScroll();

    useFrame((_, delta) => {
        // 0 = Start, 1 = End
        const offset = scroll.offset;

        // Snap at the end (e.g., from 0.8 to 1.0)
        const isSnapping = offset > 0.8;

        const targetPos = isSnapping ? [0, 1.8, 12] : [0, 10, 40];
        const lookAt = [0, 1.8, 0];

        controls.current?.setLookAt(
            targetPos[0], targetPos[1], targetPos[2],
            lookAt[0], lookAt[1], lookAt[2],
            true
        );
    });

    return <CameraControls ref={controls} smoothTime={0.4} />;
};