import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Showroom(props) {
    // Ensure the path is exactly: /models/showroom/scene.gltf
    const { scene } = useGLTF('/models/showroom/scene.gltf');

    // Use a group to center the model's pivot point if needed
    return <primitive object={scene} {...props} />;
}