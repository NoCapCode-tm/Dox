import { useMemo, useState } from "react";

/**
 * SignIn page — matches updated Figma "Desktop - 9" design.
 * Responsive layout using flexbox. Background is a diagonal blue gradient.
 * Decorative large text sits behind the form as visual layer.
 */
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** Only enable button when both fields have content */
  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0,
    [email, password]
  );

  const handleSignIn = () => {
    if (!canSubmit) return;
    // Replace with real auth call when backend is wired up
    console.log("Sign in with", email.trim());
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(116.04deg, #0A0E14 18.26%, #112B53 51.38%, #0A0E14 78.49%)",
      }}
    >
      {/* ── Decorative "Atla" text — top, behind form ── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none select-none overflow-hidden"
        style={{ height: "180px" }}
      >
        {/* Shadow layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "clamp(200px, 40vw, 800px)",
            fontWeight: 400,
            lineHeight: "27px",
            color: "rgba(0,0,0,0.46)",
            filter: "blur(11.1px)",
            top: "-200px",
            left: "-46px",
            whiteSpace: "nowrap",
          }}
        >
          Atla
        </div>
        {/* Gradient layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "clamp(200px, 40vw, 800px)",
            fontWeight: 400,
            lineHeight: "27px",
            background: "linear-gradient(95.73deg, #000000 8.34%, #FFFFFF 63.47%, #0A0E14 94.62%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            top: "-220px",
            left: "-46px",
            whiteSpace: "nowrap",
          }}
        >
          Atla
        </div>
      </div>

      {/* ── Decorative "NCC" text — bottom, behind form ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden"
        style={{ height: "180px" }}
      >
        {/* Shadow layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "clamp(200px, 40vw, 800px)",
            fontWeight: 400,
            lineHeight: "27px",
            color: "rgba(0,0,0,0.49)",
            filter: "blur(13.65px)",
            bottom: "-600px",
            left: "-192px",
            whiteSpace: "nowrap",
          }}
        >
          NCC
        </div>
        {/* Gradient layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "clamp(200px, 40vw, 800px)",
            fontWeight: 400,
            lineHeight: "27px",
            background: "linear-gradient(93.02deg, #6C6C6C 24.98%, #FFFFFF 45.65%, #050505 75.35%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            bottom: "-600px",
            left: "-136px",
            whiteSpace: "nowrap",
          }}
        >
          NCC
        </div>
      </div>

      {/* ── Main content — DOX logo + card + footer ── */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">

        {/* DOX logo — above card */}
        <div className="mb-[16px]">
          <DoxLogo />
        </div>

        {/* ── Card — max-w:456px, radius:10px ── */}
        <div
          className="w-full max-w-[456px] rounded-[10px] px-[32px] pt-[22px] pb-[32px] flex flex-col items-center"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Title */}
          <div className="flex items-center gap-[6px] h-[33px]">
            <span
              className="font-[Jost] text-[24px] text-[#FFFFFF]"
              style={{ fontWeight: 200 }}
            >
              Sign
            </span>
            <span
              className="font-[Jost] text-[24px] text-[#86B2F4]"
              style={{ fontWeight: 200 }}
            >
              In
            </span>
          </div>

          {/* Subtitle */}
          <p
            className="mt-[12px] font-[Jost] text-[15px] font-normal text-center leading-[28px] m-0"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Access your onboarding portal
          </p>

          {/* Inner fields box — radius:16px */}
          <div
            className="mt-[30px] w-full max-w-[392px] rounded-[16px] px-[33px] py-[24px] flex flex-col"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "0.8px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Email label */}
            <div className="h-[20px] flex items-center font-[Jost] text-[14px] font-medium text-[#FFFFFF]">
              Email Address
            </div>

            {/* Email input — height:45, radius:10px */}
            <div
              className="mt-[8px] w-full h-[45px] rounded-[10px] flex items-center gap-[10px] px-[16px]"
              style={{ backgroundColor: "rgba(201,201,201,0.1)" }}
            >
              <MailIcon />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                inputMode="email"
                autoComplete="email"
                className="flex-1 bg-transparent border-none outline-none font-[Jost] text-[14px] caret-white"
                style={{ color: "rgba(255,255,255,0.65)" }}
                aria-label="Email address"
              />
            </div>

            {/* Password label */}
            <div className="mt-[20px] h-[20px] flex items-center font-[Jost] text-[14px] font-medium text-[#FFFFFF]">
              Password
            </div>

            {/* Password input — height:45, radius:10px */}
            <div
              className="mt-[8px] w-full h-[45px] rounded-[10px] flex items-center gap-[10px] px-[16px]"
              style={{ backgroundColor: "rgba(201,201,201,0.1)" }}
            >
              <LockIcon />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                className="flex-1 bg-transparent border-none outline-none font-[Jost] text-[14px] caret-white"
                style={{ color: "rgba(255,255,255,0.65)" }}
                aria-label="Password"
              />
            </div>
          </div>

          {/* Sign In button — height:56, radius:14px, with exact Figma box shadow */}
          <button
            type="button"
            onClick={handleSignIn}
            disabled={!canSubmit}
            className="mt-[31px] w-full max-w-[392px] h-[56px] rounded-[14px] flex items-center justify-center gap-[4px] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:opacity-90"
            style={{
              backgroundColor: "#314460",
              border: "1px solid #FFFFFF",
              boxShadow: "1px 1px 2px rgba(64,88,125,0.3), -1px -1px 2px rgba(34,48,67,0.5), inset -5px 5px 10px rgba(34,48,67,0.2), inset 5px -5px 10px rgba(34,48,67,0.2), inset -5px -5px 10px rgba(64,88,125,0.9), inset 5px 5px 13px rgba(34,48,67,0.9)",
            }}
          >
            <span className="font-[Jost] text-[15px] font-medium text-[#FFFFFF]">
              Sign In →
            </span>
          </button>
        </div>

        {/* ── Footer — DOX logo + gradient text ── */}
        <div className="flex flex-col items-center gap-[8px] mt-[32px]">
          <DoxLogo />
          <p
            className="font-[Jost] text-[14px] font-normal text-center m-0"
            style={{
              background: "linear-gradient(90deg, #195AC0 0%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Powered by Atlas × NoCapCode Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

/** Mail icon — 15×15, stroke rgba(255,255,255,0.65) */
const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M2.5 4.5h11v7h-11v-7Z"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M2.8 4.9 8 8.5l5.2-3.6"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/** Lock icon — 15×15, stroke rgba(255,255,255,0.65) */
const LockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M4.5 7v-1.5a3.5 3.5 0 1 1 7 0V7"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4 7.2h8v6H4v-6Z"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * DoxLogo — width:94.88, height:22, stroke #FFFFFF at 2.5px.
 * Matches Figma Group 173 — 5 vector paths forming DOX wordmark.
 */
const DoxLogo = () => (
  <svg
    width="95"
    height="22"
    viewBox="0 0 95 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="DOX logo"
  >
    <path
      d="M2 2h5.5C12.5 2 16 5.5 16 11s-3.5 9-8.5 9H2V2Z"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinejoin="round"
      fill="none"
    />
    <ellipse
      cx="33"
      cy="11"
      rx="8"
      ry="9"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M54 2l14 18M68 2L54 20"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default SignIn;