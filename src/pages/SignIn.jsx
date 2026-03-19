import { useMemo, useState } from "react";

/**
 * SignIn page
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
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(116.04deg, #0A0E14 18.26%, #112B53 51.38%, #0A0E14 78.49%)",
      }}
    >
      {/* Group 260 — "Atla" decorative text*/}
      <div
        className="absolute pointer-events-none select-none w-full"
        style={{
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        {/* Atla shadow layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "55vw",
            fontWeight: 400,
            lineHeight: "1",
            color: "rgba(0,0,0,0.46)",
            filter: "blur(11.1px)",
            top: 0,
            left: "-3vw",
            transform: "translate(0, -68%)",
            whiteSpace: "nowrap",
          }}
        >
          Atla
        </div>

        {/* Atla gradient layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "55vw",
            fontWeight: 400,
            lineHeight: "1",
            background:
              "linear-gradient(95.73deg, #000000 8.34%, #FFFFFF 63.47%, #0A0E14 94.62%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            top: 0,
            left: "-3vw",
            transform: "translate(0, -68%)",
            whiteSpace: "nowrap",
          }}
        >
          Atla
        </div>
      </div>

      {/*Group 261 — "NCC" decorative text*/}
      <div
        className="absolute pointer-events-none select-none w-full"
        style={{
          bottom: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        {/* NCC shadow layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "40vw",
            fontWeight: 400,
            lineHeight: "1",
            color: "rgba(0,0,0,0.49)",
            filter: "blur(13.65px)",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 45%)",
            whiteSpace: "nowrap",
          }}
        >
          NCC
        </div>
        {/* NCC gradient layer */}
        <div
          className="absolute"
          style={{
            fontFamily: "Jomolhari, serif",
            fontSize: "40vw",
            fontWeight: 400,
            lineHeight: "1",
            background:
              "linear-gradient(93.02deg, #6C6C6C 24.98%, #FFFFFF 45.65%, #050505 75.35%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 45%)",
            whiteSpace: "nowrap",
          }}
        >
          NCC
        </div>
      </div>

      {/* ── Main Content Wrapper ── */}
      <div
        className="relative flex flex-col items-center w-full px-4"
        style={{ maxWidth: "471px", zIndex: 20 }}
      >
        {/* Union — background pill behind DOX logo, sits above card  */}
        <div
          className="flex items-center justify-center mb-[18px]"
          style={{
            width: "332.06px",
            height: "89px",
          }}
        >
          <DoxLogo />
        </div>

        {/* Card */}
        <div
          className="w-full max-w-[456px] rounded-[10px] px-[26px] pt-[18px] pb-[26px] flex flex-col items-center"
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
            className="mt-[10px] font-[Jost] text-[15px] font-normal text-center leading-[28px]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Access your onboarding portal
          </p>

          {/* Inner fields box — radius:16px */}
          <div
            className="mt-[24px] w-full max-w-[392px] rounded-[16px] px-[26px] py-[19px] flex flex-col"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "0.8px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Email label */}
            <div className="h-[20px] flex items-center font-[Jost] text-[14px] font-medium text-[#FFFFFF]">
              Email Address
            </div>

            {/* Email input */}
            <div
              className="mt-[6px] w-full h-[45px] rounded-[10px] flex items-center gap-[10px] px-[16px]"
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
            <div className="mt-[16px] h-[20px] flex items-center font-[Jost] text-[14px] font-medium text-[#FFFFFF]">
              Password
            </div>

            {/* Password input */}
            <div
              className="mt-[6px] w-full h-[45px] rounded-[10px] flex items-center gap-[10px] px-[16px]"
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

        </div>

        {/* Sign In button */}
          <button
            type="button"
            onClick={handleSignIn}
            disabled={!canSubmit}
            className="mt-[25px] w-full max-w-[392px] h-[56px] rounded-[14px] flex items-center justify-center gap-[4px] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:opacity-90"
            style={{
              backgroundColor: "#314460",
              border: "1px solid #FFFFFF",
              boxShadow:
                "1px 1px 2px rgba(64,88,125,0.3), -1px -1px 2px rgba(34,48,67,0.5), inset -5px 5px 10px rgba(34,48,67,0.2), inset 5px -5px 10px rgba(34,48,67,0.2), inset -5px -5px 10px rgba(64,88,125,0.9), inset 5px 5px 13px rgba(34,48,67,0.9)",
            }}
          >
            <span className="font-[Jost] text-[15px] font-medium text-[#FFFFFF]">
              Sign In →
            </span>
          </button>

        {/* Footer — DOX logo + gradient text */}
        <div className="flex flex-col items-center gap-[8px] mt-[20px]">
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

/**
 * MailIcon
 */
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

/**
 * LockIcon
 */
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
 * DoxLogo
 */
const DoxLogo = () => (
  <svg
    width="100%"
    height="22"
    viewBox="0 0 95 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="DOX logo"
  >
    {/* Vector 4: D (left stroke) */}
    <path
      d="M 1.25 1.25 C 9.88 1.25, 16.63 6, 16.63 11 C 16.63 16, 9.88 20.75, 1.25 20.75"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Vector 5: O left */}
    <path
      d="M 16.63 1.25 C 8 1.25, 1.25 6, 1.25 11 C 1.25 16, 8 20.75, 16.63 20.75"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      transform="translate(23.18, 0)"
    />
    {/* Vector 6: O right, mirrored */}
    <path
      d="M 16.63 1.25 C 8 1.25, 1.25 6, 1.25 11 C 1.25 16, 8 20.75, 16.63 20.75"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      transform="translate(55.19, 0) matrix(-1, 0, 0, 1, 0, 0)"
    />
    {/* Vector 7: X left (stroke) */}
    <path
      d="M 1.25 1.25 C 9.88 1.25, 16.63 6, 16.63 11 C 16.63 16, 9.88 20.75, 1.25 20.75"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      transform="translate(61.74, 0)"
    />
    {/* Vector 8: X right, mirrored */}
    <path
      d="M 1.25 1.25 C 9.88 1.25, 16.63 6, 16.63 11 C 16.63 16, 9.88 20.75, 1.25 20.75"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      transform="translate(93.75, 0) matrix(-1, 0, 0, 1, 0, 0)"
    />
  </svg>
);

export default SignIn;