import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import {
    ScrollControls,
    useScroll,
    Environment,
    PerspectiveCamera,
} from "@react-three/drei";


import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { Floor } from "./Floor";
import { Storm } from "./Storm";
import { Stars } from "./Stars";
import { Car } from "./Car";
import { Cave } from "./Cave";
import { Mannequin } from "./Mannequin";
import { ClothingRack } from "./ClothingRack";
import { BasketballPlayer } from "./BasketballPlayer";
import { Sofa } from "./Sofa";
import { Mirror } from "./Mirror";
import { DustParticles } from "./DustParticles";

function CameraFlyThrough() {
    const { camera } = useThree();
    const scroll = useScroll();

    const progress = useRef(0);

    const currentPos = useRef(new THREE.Vector3(0, 10, 40));
    const currentTarget = useRef(new THREE.Vector3(0, 1, 0));

    const desiredPos = useRef(new THREE.Vector3());
    const desiredTarget = useRef(new THREE.Vector3());

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;

        // Keep the original speed
        progress.current = THREE.MathUtils.damp(
            progress.current,
            scroll.offset,
            1.6,
            delta
        );

        // Camera path (same as yours)
        desiredPos.current.set(
            0,
            THREE.MathUtils.lerp(10, 2, progress.current),
            THREE.MathUtils.lerp(40, 20, progress.current)
        );

        // Very subtle cinematic drift (almost unnoticeable)
        desiredPos.current.x += Math.sin(time * 0.18) * 0.03;
        desiredPos.current.y += Math.sin(time * 0.35) * 0.02;

        // Look target (same as yours)
        desiredTarget.current.set(
            0,
            THREE.MathUtils.lerp(1, 1.2, progress.current),
            THREE.MathUtils.lerp(0, -3, progress.current)
        );

        // Smooth cinematic weight
        currentPos.current.lerp(
            desiredPos.current,
            1 - Math.exp(-7 * delta)
        );

        currentTarget.current.lerp(
            desiredTarget.current,
            1 - Math.exp(-7 * delta)
        );

        camera.position.copy(currentPos.current);
        camera.lookAt(currentTarget.current);
    });

    return null;
}


function CaveAudioController({ setAudioVolume }) {

    const { camera } = useThree();

    const volume = useRef(0);
    const lastVolume = useRef(0);


    useFrame(() => {

        const cavePosition = new THREE.Vector3(0, 1, 0);

        const distance =
            camera.position.distanceTo(cavePosition);


        const near = 5;
        const far = 45;


        let target =
            1 - (distance - near) / (far - near);


        target = THREE.MathUtils.clamp(
            target,
            0,
            1
        );


        volume.current = THREE.MathUtils.lerp(
            volume.current,
            target,
            0.05
        );


        // Update React only when change is noticeable
        if (
            Math.abs(volume.current - lastVolume.current) > 0.01
        ) {
            lastVolume.current = volume.current;
            setAudioVolume(volume.current);
        }

    });


    return null;
}






export function Experience({ setAudioVolume }) {


    return (

        <Suspense fallback={null}>


            <color attach="background" args={["#050505"]} />


            <Stars />


            <fog
                attach="fog"
                args={[
                    "#000000",
                    18,
                    70
                ]}
            />


            <DustParticles count={500} />



            <EffectComposer
                disableNormalPass
                multisampling={0}
            >

                <Bloom
                    luminanceThreshold={0.9}
                    intensity={0.6}
                    mipmapBlur
                    radius={0.35}
                />

            </EffectComposer>




            <Storm />



            <PerspectiveCamera
                makeDefault
                position={[0, 10, 40]}
                fov={25}
            />



            <Environment preset="city" background={false} />


            <ambientLight intensity={0.02} />



            <Floor />

            <ScrollControls
                pages={3}
                damping={0.35}
                maxSpeed={0.4}
            >


                <CaveAudioController
                    setAudioVolume={setAudioVolume}
                />


                <CameraFlyThrough />



                <group>


                    <Cave
                        scale={0.3}
                        position={[0, 0, 0]}
                    />



                    <group position={[0, 0.5, 2]}>


                        <Mannequin
                            position={[-5, 1.8, 0]}
                            scale={2}
                        />


                        <ClothingRack
                            position={[-2.5, 1.4, -4]}
                            scale={2}
                        />


                        <BasketballPlayer
                            position={[5, 1.8, 2]}
                            scale={2}
                        />


                        <Sofa
                            position={[4.5, -0.2, -1]}
                            scale={[0.03, 0.03, 0.03]}
                        />


                        <Mirror
                            position={[1, 0, -2]}
                            scale={[2, 2, 2]}
                        />


                    </group>



                    <Car
                        scale={0.4}
                        position={[-6, 0, 15]}
                        rotation={[0, Math.PI / 4, 0]}
                    />


                </group>


            </ScrollControls>


        </Suspense>

    );

}