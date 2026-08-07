// export function Lights() {
//     return (
//         <>
//             <ambientLight intensity={0.25} />

//             <directionalLight
//                 position={[5, 10, 5]}
//                 intensity={2}
//                 castShadow
//             />

//             <spotLight
//                 position={[0, 6, 3]}
//                 angle={0.35}
//                 intensity={40}
//                 penumbra={1}
//                 castShadow
//             />
//         </>
//     );
// }











// import React from "react";

// export function Lights() {
//     return (
//         <>
//             <ambientLight intensity={0.12} />

//             {/* KEY spot on hero podium */}
//             <spotLight
//                 position={[0, 5.5, 1.5]}
//                 angle={0.5}
//                 penumbra={0.6}
//                 intensity={120}
//                 distance={20}
//                 color="#ffffff"
//                 castShadow
//                 shadow-mapSize-width={1024}
//                 shadow-mapSize-height={1024}
//                 target-position={[0, 1, -2]}
//             />

//             {/* Left podium spot */}
//             <spotLight position={[-3, 5, 1]} angle={0.45} penumbra={0.7}
//                 intensity={55} distance={14} color="#ffffff" target-position={[-3, 0.6, -0.5]} />

//             {/* Right podium spot */}
//             <spotLight position={[3, 5, 1]} angle={0.45} penumbra={0.7}
//                 intensity={55} distance={14} color="#ffffff" target-position={[3, 0.6, -0.5]} />

//             {/* Wash on back rack wall */}
//             <spotLight position={[0, 5.5, -8]} angle={0.9} penumbra={0.85}
//                 intensity={70} distance={14} color="#f0eadf" target-position={[0, 1.8, -11.7]} />

//             {/* Cool back rim */}
//             <pointLight position={[0, 4, -11]} intensity={10} distance={10} color="#7aa2ff" />
//             {/* Warm floor bounce */}
//             <pointLight position={[0, 0.3, 3]} intensity={8} distance={10} color="#ffb27a" />
//             {/* Side shelf accents */}
//             <pointLight position={[-5.4, 2.2, -6]} intensity={6} distance={4} color="#ffffff" />
//             <pointLight position={[5.4, 2.2, -6]} intensity={6} distance={4} color="#ffffff" />
//         </>
//     );
// }




export function Lights() {
    return (
        <>
            <ambientLight intensity={0.8} />

            <directionalLight
                position={[5, 8, 5]}
                intensity={2}
                castShadow
            />

            <spotLight
                position={[0, 5, 2]}
                intensity={30}
                angle={0.4}
                penumbra={1}
                castShadow
            />
        </>
    );
}