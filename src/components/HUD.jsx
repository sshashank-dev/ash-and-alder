import { Html } from "@react-three/drei";

export function HUD() {
    return (
        <Html fullscreen>
            <div style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                padding: "40px", pointerEvents: "none", color: "white",
                fontFamily: "monospace", fontSize: "10px", letterSpacing: "1px"
            }}>
                <div style={{ position: "absolute", top: "40px", left: "40px" }}>
                    [SYS_ID]: A&A_CORE_01<br />
                    [STATUS]: STABLE<br />
                    [LATENCY]: 0.0MS
                </div>
                <div style={{ position: "absolute", bottom: "40px", right: "40px" }}>
                    [COORD_X]: 000-045<br />
                    [SYSTEM_LOAD]: 08%
                </div>
            </div>
        </Html>
    );
}