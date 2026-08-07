import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LoadingScreen() {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'black', color: 'white', fontFamily: 'monospace'
        }}>
            <DotLottieReact
                src="https://lottie.host/0d61936b-c34a-4cf5-8b66-9a60b62c1428/d5Ti33pedm.lottie" // Paste your link here
                style={{ width: '200px', height: '200px' }}
                autoplay
                loop
            />
            <p style={{ marginTop: '20px', letterSpacing: '4px', fontSize: '10px' }}>
                INITIALIZING DRIP...
            </p>
        </div>
    );
}