import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Welcome.css';

/* =====================================================================
   1. WEBGL SHADER (Optimized for performance)
   ===================================================================== */
const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123) * 2.0 - 1.0;
}

float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) { 
    v += a * gnoise(p);
    p = rot * p * 2.1 + shift;
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  uv *= 1.6;
  float t = u_time * 0.055;

  vec2 q = vec2(fbm(uv + vec2(0.0, 0.0) + t * 0.28), fbm(uv + vec2(5.2, 1.3) + t * 0.22));
  vec2 r = vec2(fbm(uv + 1.8 * q + vec2(1.7, 9.2) + t * 0.14), fbm(uv + 1.8 * q + vec2(8.3, 2.8) + t * 0.11));

  float f = fbm(uv + 2.5 * r + t * 0.05);
  f = f * 0.5 + 0.5;

  float pulse1 = fbm(uv * 0.45 + vec2(t * 0.18, t * 0.12));
  float pulse2 = fbm(uv * 0.3 + vec2(-t * 0.09, t * 0.15) + vec2(2.5, 1.8));
  float glow = smoothstep(0.42, 0.72, pulse1 * 0.5 + 0.5) * 0.55 + smoothstep(0.48, 0.78, pulse2 * 0.5 + 0.5) * 0.35;

  vec3 c0 = vec3(0.006, 0.022, 0.052);
  vec3 c1 = vec3(0.018, 0.058, 0.140);
  vec3 c2 = vec3(0.038, 0.160, 0.360);
  vec3 c3 = vec3(0.060, 0.310, 0.580);
  vec3 c4 = vec3(0.090, 0.430, 0.720);

  vec3 color = c0;
  color = mix(color, c1, smoothstep(0.0,  0.28, f));
  color = mix(color, c2, smoothstep(0.22, 0.52, f));
  color = mix(color, c3, smoothstep(0.45, 0.72, f));
  color = mix(color, c4, smoothstep(0.65, 0.92, f));

  color += c3 * glow * 0.6;
  color += c4 * glow * glow * 0.4;

  float grain = sin((uv.y + t * 0.04) * 38.0) * 0.012 + sin((uv.x + t * 0.03) * 27.0 + uv.y * 14.0) * 0.008;
  color += grain * vec3(0.02, 0.08, 0.18);

  vec2 vig_uv = gl_FragCoord.xy / u_resolution;
  vig_uv = vig_uv * 2.0 - 1.0;
  float vig = 1.0 - dot(vig_uv * vec2(0.75, 0.85), vig_uv * vec2(0.75, 0.85));
  color *= mix(0.35, 1.0, smoothstep(0.0, 1.0, vig));

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function initGL(canvas) {
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return null;

    const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    return { gl, prog, uTime: gl.getUniformLocation(prog, "u_time"), uRes: gl.getUniformLocation(prog, "u_resolution") };
}

/* =====================================================================
   2. REUSABLE BACKGROUND COMPONENT
   ===================================================================== */
const WebGLBackground = () => {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const rafRef = useRef(0);
    const startRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        glRef.current = initGL(canvas);

        const resize = () => {
            const { clientWidth, clientHeight } = canvas;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
            
            if (canvas.width !== clientWidth * dpr || canvas.height !== clientHeight * dpr) {
                canvas.width = clientWidth * dpr;
                canvas.height = clientHeight * dpr;
                if (glRef.current) glRef.current.gl.viewport(0, 0, canvas.width, canvas.height);
            }
        };
        resize();
        window.addEventListener("resize", resize);
        startRef.current = performance.now();

        const loop = (now) => {
            if (glRef.current) {
                const { gl, uTime, uRes } = glRef.current;
                gl.uniform1f(uTime, (now - startRef.current) / 1000);
                gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none block" />;
};

/* =====================================================================
   3. MAIN WELCOME PAGE COMPONENT
   ===================================================================== */
const Welcome = () => {
    const navigate = useNavigate();

    const cards = [
        {
            step: '01',
            status: 'completed',
            title: 'Profile Setup',
            desc: 'Provide your essential details to help us securely generate your official offer letter and agreements.',
            buttonText: 'Review Details >',
            icon: <ProfileIcon />,
            onClick: () => navigate('/dashboard'),
        },
        {
            step: '02',
            status: 'in-progress',
            title: 'Company Guidelines',
            desc: 'Familiarize yourself with our core values, internal policies, and workplace culture.',
            buttonText: 'Continue Module →',
            icon: <BookIcon />,
            onClick: () => navigate('/company-docs'),
        },
        {
            step: '03',
            status: 'not-started',
            title: 'Legal Agreements',
            desc: 'Securely review and electronically sign your offer letter and non-disclosure agreement.',
            buttonText: 'Awaiting Step 02',
            icon: <SignIcon />,
            onClick: () => navigate('/legal-agreements'),
        },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden font-sans text-white flex flex-col items-center justify-center bg-[#060D18]">
            
            <WebGLBackground />
            <div className="absolute inset-0 z-0 bg-overlay-fade pointer-events-none" />

            <header className="absolute top-8 right-8 z-20">
                <div className="w-[46px] h-[46px] rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/90 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>
            </header>

            <main className="relative z-20 flex flex-col items-center w-full max-w-[1100px] px-6 py-12">
                
                {/* PERFECTED DOX LOGO AND REFLECTION */}
                <div className="mb-24 flex flex-col items-center relative">
                    {/* Main Logo */}
                    <div className="relative z-10">
                        <LargeDoxLogo />
                    </div>

                    {/* Masked, Flipped Reflection */}
                    <div 
                        className="absolute top-[100%] mt-[2px] opacity-[0.35] scale-y-[-1] blur-[1px] select-none pointer-events-none z-0"
                        style={{
                            /* Fades out smoothly from the point where the letters touch */
                            maskImage: 'linear-gradient(to bottom, transparent 35%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 35%, black 100%)'
                        }}
                    >
                        <LargeDoxLogo />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full z-10">
                    {cards.map((card) => (
                        <GlassCard key={card.step} {...card} />
                    ))}
                </div>
            </main>

            <footer className="absolute bottom-8 z-20 text-white/50 text-[14px] tracking-wide font-light select-none">
                © 2026 NoCapCode. All rights reserved.
            </footer>
        </div>
    );
};

/* =====================================================================
   4. GLASSMORPHISM CARD COMPONENT
   ===================================================================== */
const GlassCard = ({ step, status, title, desc, icon, buttonText, onClick }) => {
    const isCompleted = status === 'completed';
    const isInProgress = status === 'in-progress';
    const isLocked = status === 'not-started';

    return (
        <div className="dox-glass-card relative flex flex-col w-full h-[360px] p-7 rounded-[20px]">
            
            <div className="absolute right-6 top-[70px] text-[110px] leading-none font-extralight text-white/[0.04] select-none pointer-events-none z-0">
                {step}
            </div>

            <div className="flex justify-between items-start w-full z-10">
                <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-white/10 text-white border border-white/10 shadow-inner">
                    {icon}
                </div>

                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase border ${
                    isCompleted ? 'border-white/30 text-white bg-white/10' : 
                    isInProgress ? 'border-[#3b82f6] text-[#60a5fa] bg-[#3b82f6]/15' : 
                    'border-white/10 text-white/40 bg-transparent'
                }`}>
                    {isCompleted && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    {isInProgress && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>}
                    {isLocked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
                    <span className="mt-[1px]">{status.replace('-', ' ')}</span>
                </div>
            </div>

            <div className="mt-auto z-10 flex flex-col">
                <h3 className="text-[18px] font-medium text-white mb-2 tracking-wide">{title}</h3>
                <p className="text-[14px] text-white/60 leading-[1.6] mb-8 min-h-[44px] pr-4 font-light">
                    {desc}
                </p>

                {isLocked ? (
                    <div className="text-[14px] text-white/30 font-medium h-[44px] flex items-center">
                        {buttonText}
                    </div>
                ) : (
                    <button
                        onClick={onClick}
                        className={`w-[160px] h-[44px] rounded-xl text-[14px] font-medium transition-all flex items-center justify-center gap-2 ${
                            isInProgress 
                                ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-500/50' 
                                : 'bg-transparent border border-white/30 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/50'
                        }`}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

/* =====================================================================
   5. ICONS
   ===================================================================== */
const ProfileIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M8 10h.01" /><path d="M12 10h4" /><path d="M12 14h4" /><path d="M8 14h.01" />
    </svg>
);

const BookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

const SignIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

const LargeDoxLogo = () => (
    <div className="w-[clamp(220px,25vw,300px)]">
        <svg width="463" height="119" viewBox="0 0 463 119" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
                <linearGradient id="paint0_linear_logo" x1="0" y1="0" x2="463" y2="119" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#8A9BB0" />
                </linearGradient>
            </defs>
            <path fillRule="evenodd" clipRule="evenodd" d="M41.1602 0C56.5284 0 68.3762 7.87699 76.2881 19.1602C84.1229 30.3336 88.2341 44.9626 88.6133 59.3682C88.9922 73.7646 85.656 88.4981 77.9355 99.791C70.0885 111.269 57.8016 119 41.1602 119H0V109H41.1602C54.2559 109 63.5555 103.106 69.6807 94.1465C75.9322 85.002 78.9554 72.4851 78.6172 59.6318C78.2791 46.7876 74.5964 34.1663 68.1006 24.9023C61.6817 15.7483 52.6601 10 41.1602 10H0V0H41.1602ZM218.285 0C233.653 0 245.501 7.87699 253.413 19.1602C261.248 30.3336 265.359 44.9626 265.738 59.3682C266.117 73.7646 262.781 88.4981 255.061 99.791C247.214 111.269 234.927 119 218.285 119H162.447C145.806 119 133.519 111.269 125.672 99.791C117.951 88.4981 114.615 73.7646 114.994 59.3682C115.373 44.9626 119.484 30.3336 127.319 19.1602C135.231 7.87707 147.079 0 162.447 0H218.285ZM334.098 0C349.466 0 361.314 7.87699 369.226 19.1602C372.852 24.3325 375.68 30.2458 377.71 36.5342C379.74 30.2459 382.568 24.3325 386.194 19.1602C394.106 7.87706 405.954 0 421.322 0H462.482V10H421.322C409.822 10 400.801 15.7483 394.382 24.9023C387.886 34.1663 384.203 46.7876 383.865 59.6318C383.527 72.4851 386.55 85.002 392.802 94.1465C398.927 103.106 408.227 109 421.322 109H462.482V119H421.322C404.681 119 392.394 111.269 384.547 99.791C381.67 95.5835 379.404 90.8979 377.71 85.9307C376.016 90.898 373.75 95.5835 370.873 99.791C363.026 111.269 350.739 119 334.098 119H292.938V109H334.098C347.193 109 356.493 103.106 362.618 94.1465C368.87 85.002 371.893 72.4851 371.555 59.6318C371.217 46.7876 367.534 34.1663 361.038 24.9023C354.619 15.7483 345.598 10 334.098 10H292.938V0H334.098ZM162.447 10C150.947 10 141.926 15.7483 135.507 24.9023C129.011 34.1663 125.328 46.7876 124.99 59.6318C124.652 72.4851 127.675 85.002 133.927 94.1465C140.052 103.106 149.352 109 162.447 109H218.285C231.381 109 240.68 103.106 246.806 94.1465C253.057 85.002 256.08 72.4851 255.742 59.6318C255.404 46.7876 251.721 34.1663 245.226 24.9023C238.807 15.7483 229.785 10 218.285 10H162.447Z" fill="url(#paint0_linear_logo)" />
        </svg>
    </div>
);

export default Welcome;