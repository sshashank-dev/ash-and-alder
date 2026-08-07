
// import React, { useRef, Suspense, useState } from "react";
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import { ScrollControls, useScroll, Environment, CameraControls, PerspectiveCamera } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

// // --- Components ---
// // Ensure you have these imports as per your existing project
// import { Floor } from "./Floor";
// import { Storm } from "./Storm";
// import { Stars } from "./Stars";
// import { Car } from "./Car";
// import { Cave } from "./Cave";
// import { Mannequin } from "./Mannequin";
// import { ClothingRack } from "./ClothingRack";
// import { BasketballPlayer } from "./BasketballPlayer";
// import { Sofa } from "./Sofa";
// import { Mirror } from "./Mirror";
// import { DustParticles } from "./DustParticles";
// import { Cap } from "./Cap";

// function CameraFlyThrough() {
//     const controls = useRef();
//     const scroll = useScroll();

//     useFrame((state, delta) => {
//         const offset = scroll.offset;
//         // Lock camera at the very end (last 5%)
//         const isPresentation = offset > 0.95;

//         if (isPresentation) {
//             // Static Lock: The camera stops following the scroll and looks at the cap
//             controls.current?.setLookAt(0, 1.8, 6, 0, 1.8, 0, true);
//         } else {
//             // Fly-through: Standard movement
//             const x = THREE.MathUtils.lerp(0, 0, offset);
//             const y = THREE.MathUtils.lerp(10, 2, offset);
//             const z = THREE.MathUtils.lerp(40, 20, offset);
//             controls.current?.setLookAt(x, y, z, 0, 1.2, 0, true);
//         }
//     });

//     return (
//         <CameraControls
//             ref={controls}
//             smoothTime={0.5}
//             dollySpeed={0}
//             truckSpeed={0}
//             mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
//             touches={{ one: 0, two: 0, three: 0 }}
//         />
//     );
// }

// // Fades out the background environment at the end
// function PresentationLayer({ children }) {
//     const scroll = useScroll();
//     const group = useRef();

//     useFrame(() => {
//         const opacity = Math.max(0, 1 - scroll.offset * 10);
//         group.current.children.forEach((child) => {
//             if (child.material) child.material.opacity = opacity;
//         });
//         group.current.visible = scroll.offset < 0.98;
//     });

//     return <group ref={group}>{children}</group>;
// }

// export function Experience() {
//     return (
//         <Suspense fallback={null}>
//             <color attach="background" args={["#050505"]} />
//             <Stars />
//             <fog attach="fog" args={["#000000", 18, 70]} />
//             <DustParticles count={1500} />

//             <EffectComposer disableNormalPass multisampling={0}>
//                 <Bloom luminanceThreshold={0.8} intensity={1.2} mipmapBlur radius={0.8} />
//             </EffectComposer>

//             <Storm />
//             <PerspectiveCamera makeDefault position={[0, 10, 40]} fov={25} />
//             <Environment preset="city" />
//             <ambientLight intensity={0.02} />
//             <Floor />

//             <ScrollControls pages={3} damping={0.35} maxSpeed={0.4}>
//                 <CameraFlyThrough />

//                 {/* Store elements - Fades out */}
//                 <PresentationLayer>
//                     <Cave scale={0.3} position={[0, 0, 0]} />
//                     <group position={[0, 0.5, 2]}>
//                         <Mannequin position={[-5, 1.8, 0]} scale={2} />
//                         <ClothingRack position={[-2.5, 1.4, -4]} scale={2} />
//                         <BasketballPlayer position={[5, 1.8, 2]} scale={2} />
//                         <Sofa position={[4.5, -.2, -1]} scale={[0.03, 0.03, 0.03]} />
//                         <Mirror position={[1, 0, -2]} scale={[2, 2, 2]} />
//                     </group>
//                     <Car scale={0.4} position={[-6, 0, 15]} rotation={[0, Math.PI / 4, 0]} />
//                 </PresentationLayer>

//                 <group position={[0, 1.8, 0]}>
//                     <Cap />
//                     {/* This light only turns on at the end of the scroll */}
//                     <pointLight
//                         position={[0, 2, 2]}
//                         intensity={scroll.offset > 0.9 ? 5 : 0}
//                         color="white"
//                     />
//                 </group>
//             </ScrollControls>
//         </Suspense>
//     );
// }







// import React, { useRef, Suspense } from "react";
// import * as THREE from "three";
// import { useFrame, useThree } from "@react-three/fiber";
// import { ScrollControls, useScroll, Environment, CameraControls, PerspectiveCamera } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { Floor } from "./Floor";
// import { Storm } from "./Storm";
// import { Stars } from "./Stars";
// import { Car } from "./Car";
// import { Cave } from "./Cave";
// import { Mannequin } from "./Mannequin";
// import { ClothingRack } from "./ClothingRack";
// import { BasketballPlayer } from "./BasketballPlayer";
// import { Sofa } from "./Sofa";
// import { Mirror } from "./Mirror";
// import { DustParticles } from "./DustParticles";


// function CameraFlyThrough({ setReveal }) {
//     const controls = useRef();
//     const scroll = useScroll();

//     const progress = useRef(0);

//     useFrame((_, delta) => {
//         // Smooth scroll interpolation
//         progress.current = THREE.MathUtils.damp(
//             progress.current,
//             scroll.offset,
//             5,
//             delta
//         );

//         // Reveal animation (0 → 1)
//         const revealProgress = THREE.MathUtils.smoothstep(
//             progress.current,
//             0.85,
//             1.0
//         );

//         setReveal(revealProgress);

//         // Camera follows full scroll (supports reverse scrolling)
//         const cameraProgress = progress.current;

//         // Camera Position
//         const x = THREE.MathUtils.lerp(0, 0, cameraProgress);
//         const y = THREE.MathUtils.lerp(10, 2, cameraProgress);
//         const z = THREE.MathUtils.lerp(40, 20, cameraProgress);

//         // Camera Look Target
//         const targetX = THREE.MathUtils.lerp(0, 0, cameraProgress);
//         const targetY = THREE.MathUtils.lerp(1, 1.2, cameraProgress);
//         const targetZ = THREE.MathUtils.lerp(0, -3, cameraProgress);

//         controls.current?.setLookAt(
//             x,
//             y,
//             z,
//             targetX,
//             targetY,
//             targetZ,
//             false
//         );
//     });

//     return (
//         <CameraControls
//             ref={controls}
//             smoothTime={0.35}
//             draggingSmoothTime={0.35}
//             dollySpeed={0}
//             truckSpeed={0}
//             mouseButtons={{
//                 left: 0,
//                 middle: 0,
//                 right: 0,
//                 wheel: 0,
//             }}
//             touches={{
//                 one: 0,
//                 two: 0,
//                 three: 0,
//             }}
//         />
//     );
// }




// export function Experience({ reveal, setReveal }) {
//     return (
//         <Suspense fallback={null}>
//             <color attach="background" args={["#050505"]} />
//             <Stars />
//             <fog attach="fog" args={["#000000", 18, 70]} />
//             <DustParticles count={1500} />

//             {/* PERFORMANCE FIX: Set multisampling to 0 to eliminate scroll stutter */}
//             <EffectComposer disableNormalPass multisampling={0}>
//                 <Bloom
//                     luminanceThreshold={0.8}
//                     intensity={1.2}
//                     mipmapBlur
//                     radius={0.8}
//                 />
//             </EffectComposer>

//             <Storm />
//             <PerspectiveCamera makeDefault position={[0, 10, 40]} fov={25} />
//             <Environment preset="city" />
//             <ambientLight intensity={0.02} />

//             <Floor />

//             <ScrollControls
//                 pages={3}
//                 damping={0.35}
//                 maxSpeed={0.4}
//             >
//                 <CameraFlyThrough setReveal={setReveal} />
//                 <group>
//                     <Cave scale={0.3} position={[0, 0, 0]} />
//                     <group position={[0, 0.5, 2]}>
//                         <Mannequin position={[-5, 1.8, 0]} scale={2} />
//                         <ClothingRack position={[-2.5, 1.4, -4]} scale={2} />
//                         <BasketballPlayer position={[5, 1.8, 2]} scale={2} />
//                         <Sofa position={[4.5, -.2, -1]} scale={[0.03, 0.03, 0.03]} />
//                         <Mirror position={[1, 0, -2]} scale={[2, 2, 2]} />
//                     </group>
//                     <Car
//                         scale={0.4}
//                         position={[-6, 0, 15]}
//                         rotation={[0, Math.PI / 4, 0]}
//                     />
//                 </group>
//             </ScrollControls>
//         </Suspense>
//     );
// }