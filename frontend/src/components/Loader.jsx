import { Html, useProgress } from "@react-three/drei";

export function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{ color: "white", fontSize: "1.2rem", fontFamily: "sans-serif" }}>
                {Math.round(progress)} % loaded
            </div>
        </Html>
    );
}