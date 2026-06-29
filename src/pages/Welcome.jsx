import React, { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "../api/employeeApi";
import { clearAuthSession } from "../utils/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
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

    const [user, setUser] = useState(null);

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
    const loadUser = async () => {
        try {
            const response = await getCurrentUser();

            console.log("Current User:", response);

            setUser(response.message);
        } catch (err) {
            console.error(err);
        }
    };

    loadUser();
    }, []);

    useEffect(() => {
    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setShowProfileMenu(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

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

    const handleLogout = () => {
        // Remove auth session
        localStorage.removeItem("emp-auth-session");
        localStorage.removeItem("emp-auth-token");

        // Clear session storage
        sessionStorage.clear();

        // Delete cookies
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date(0).toUTCString() + ";path=/"
                );
        });

        // Close profile menu
        setShowProfileMenu(false);

        // Show success toast
        toast.success("Signed out successfully");

        // Redirect after a short delay so the toast is visible
        setTimeout(() => {
            window.location.replace("/login");
        }, 1200);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden font-sans text-white flex flex-col items-center justify-center bg-[#060D18]">
            
            <WebGLBackground />
            <div className="absolute inset-0 z-0 bg-overlay-fade pointer-events-none" />

            <header className="absolute top-8 right-8 z-20">
                <div className="relative" ref={menuRef}>

                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="w-[46px] h-[46px] rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/90 backdrop-blur-md hover:bg-white/10 transition"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0b1320]/95 backdrop-blur-xl shadow-xl overflow-hidden">

                            <div className="px-4 py-3 border-b border-white/10">
                                <p className="text-[15px] font-semibold text-white">
                                    {user?.name}
                                </p>

                                <p className="text-[11px] text-white/50 truncate mt-0.5">
                                    {user?.email}
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 flex items-center justify-between text-red-400 hover:bg-red-500/10 transition"
                            >
                                <span>Sign Out</span>

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>

                            </button>

                        </div>
                    )}

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
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9H17V7H12V9ZM12 6H17V4H12V6ZM3 12H11V11.45C11 10.7 10.6333 10.1042 9.9 9.6625C9.16667 9.22083 8.2 9 7 9C5.8 9 4.83333 9.22083 4.1 9.6625C3.36667 10.1042 3 10.7 3 11.45V12ZM7 8C7.55 8 8.02083 7.80417 8.4125 7.4125C8.80417 7.02083 9 6.55 9 6C9 5.45 8.80417 4.97917 8.4125 4.5875C8.02083 4.19583 7.55 4 7 4C6.45 4 5.97917 4.19583 5.5875 4.5875C5.19583 4.97917 5 5.45 5 6C5 6.55 5.19583 7.02083 5.5875 7.4125C5.97917 7.80417 6.45 8 7 8ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V2H2V14ZM2 14V2V14Z" fill="#B0C6FF"/>
    </svg>

);

const BookIcon = () => (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 5.9V4.2C13.55 3.96667 14.1125 3.79167 14.6875 3.675C15.2625 3.55833 15.8667 3.5 16.5 3.5C16.9333 3.5 17.3583 3.53333 17.775 3.6C18.1917 3.66667 18.6 3.75 19 3.85V5.45C18.6 5.3 18.1958 5.1875 17.7875 5.1125C17.3792 5.0375 16.95 5 16.5 5C15.8667 5 15.2583 5.07917 14.675 5.2375C14.0917 5.39583 13.5333 5.61667 13 5.9ZM13 11.4V9.7C13.55 9.46667 14.1125 9.29167 14.6875 9.175C15.2625 9.05833 15.8667 9 16.5 9C16.9333 9 17.3583 9.03333 17.775 9.1C18.1917 9.16667 18.6 9.25 19 9.35V10.95C18.6 10.8 18.1958 10.6875 17.7875 10.6125C17.3792 10.5375 16.95 10.5 16.5 10.5C15.8667 10.5 15.2583 10.575 14.675 10.725C14.0917 10.875 13.5333 11.1 13 11.4ZM13 8.65V6.95C13.55 6.71667 14.1125 6.54167 14.6875 6.425C15.2625 6.30833 15.8667 6.25 16.5 6.25C16.9333 6.25 17.3583 6.28333 17.775 6.35C18.1917 6.41667 18.6 6.5 19 6.6V8.2C18.6 8.05 18.1958 7.9375 17.7875 7.8625C17.3792 7.7875 16.95 7.75 16.5 7.75C15.8667 7.75 15.2583 7.82917 14.675 7.9875C14.0917 8.14583 13.5333 8.36667 13 8.65ZM5.5 12C6.28333 12 7.04583 12.0875 7.7875 12.2625C8.52917 12.4375 9.26667 12.7 10 13.05V3.2C9.31667 2.8 8.59167 2.5 7.825 2.3C7.05833 2.1 6.28333 2 5.5 2C4.9 2 4.30417 2.05833 3.7125 2.175C3.12083 2.29167 2.55 2.46667 2 2.7V12.6C2.58333 12.4 3.1625 12.25 3.7375 12.15C4.3125 12.05 4.9 12 5.5 12ZM12 13.05C12.7333 12.7 13.4708 12.4375 14.2125 12.2625C14.9542 12.0875 15.7167 12 16.5 12C17.1 12 17.6875 12.05 18.2625 12.15C18.8375 12.25 19.4167 12.4 20 12.6V2.7C19.45 2.46667 18.8792 2.29167 18.2875 2.175C17.6958 2.05833 17.1 2 16.5 2C15.7167 2 14.9417 2.1 14.175 2.3C13.4083 2.5 12.6833 2.8 12 3.2V13.05ZM11 16C10.2 15.3667 9.33333 14.875 8.4 14.525C7.46667 14.175 6.5 14 5.5 14C4.8 14 4.1125 14.0917 3.4375 14.275C2.7625 14.4583 2.11667 14.7167 1.5 15.05C1.15 15.2333 0.8125 15.225 0.4875 15.025C0.1625 14.825 0 14.5333 0 14.15V2.1C0 1.91667 0.0458333 1.74167 0.1375 1.575C0.229167 1.40833 0.366667 1.28333 0.55 1.2C1.31667 0.8 2.11667 0.5 2.95 0.3C3.78333 0.1 4.63333 0 5.5 0C6.46667 0 7.4125 0.125 8.3375 0.375C9.2625 0.625 10.15 1 11 1.5C11.85 1 12.7375 0.625 13.6625 0.375C14.5875 0.125 15.5333 0 16.5 0C17.3667 0 18.2167 0.1 19.05 0.3C19.8833 0.5 20.6833 0.8 21.45 1.2C21.6333 1.28333 21.7708 1.40833 21.8625 1.575C21.9542 1.74167 22 1.91667 22 2.1V14.15C22 14.5333 21.8375 14.825 21.5125 15.025C21.1875 15.225 20.85 15.2333 20.5 15.05C19.8833 14.7167 19.2375 14.4583 18.5625 14.275C17.8875 14.0917 17.2 14 16.5 14C15.5 14 14.5333 14.175 13.6 14.525C12.6667 14.875 11.8 15.3667 11 16Z" fill="#B0C6FF"/>
    </svg>

);

const SignIcon = () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9ZM2 2V7V2V7V18V2Z" fill="#C2C6D7"/>
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