import { useMemo, useState } from "react";

/**
 * SignIn page — pixel-perfect match to Figma "Desktop - 6".
 * Layout uses Tailwind arbitrary values from exact Figma inspect values.
 * Page canvas: 1440×1024. Card: 456×456 at top:232 left:492.
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
    <div className="relative w-[1440px] h-[1024px] bg-[#0A0E14] mx-auto overflow-hidden">

      {/* ── Card — 456×456, top:232, left:492, radius:10px ── */}
      <div className="absolute top-[232px] left-[492px] w-[456px] h-[456px] rounded-[10px] bg-[rgba(255,255,255,0.05)]">

        {/* Title — top:22, left:193, width:71, height:33 */}
        <div className="absolute top-[22px] left-[193px] w-[71px] h-[33px] flex items-center gap-[6px]">
          <span className="font-[Jost] text-[24px] font-light text-[#FFFFFF] whitespace-nowrap">
            Sign
          </span>
          <span className="font-[Jost] text-[24px] font-light text-[#86B2F4]">
            In
          </span>
        </div>

        {/* Subtitle — top:67, left:130, width:196, height:28 */}
        <p className="absolute top-[67px] left-[130px] w-[196px] h-[28px] font-[Jost] text-[15px] font-normal text-[rgba(255,255,255,0.65)] text-center leading-[28px] m-0">
          Access your onboarding portal
        </p>

        {/* Inner fields box — top:125, left:32, width:392, height:222, radius:16px */}
        <div className="absolute top-[125px] left-[32px] w-[392px] h-[222px] rounded-[16px] border-[0.8px] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-[33px] py-[24px] box-border">

          {/* Email label — height:20 */}
          <div className="h-[20px] flex items-center font-[Jost] text-[14px] font-medium text-[#FFFFFF] mb-[8px]">
            Email Address
          </div>

          {/* Email input — width:326, height:45, radius:10px */}
          <div className="w-[326px] h-[45px] rounded-[10px] bg-[#C9C9C91A] flex items-center gap-[10px] px-[16px] box-border">
            <MailIcon />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              inputMode="email"
              autoComplete="email"
              className="flex-1 bg-transparent border-none outline-none font-[Jost] text-[14px] text-[rgba(255,255,255,0.65)] placeholder:text-[rgba(255,255,255,0.65)] caret-white"
              aria-label="Email address"
            />
          </div>

          {/* Password label — margin-top:20px */}
          <div className="h-[20px] flex items-center font-[Jost] text-[14px] font-medium text-[#FFFFFF] mt-[20px] mb-[8px]">
            Password
          </div>

          {/* Password input — width:326, height:45, radius:10px */}
          <div className="w-[326px] h-[45px] rounded-[10px] bg-[#C9C9C91A] flex items-center gap-[10px] px-[16px] box-border">
            <LockIcon />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              className="flex-1 bg-transparent border-none outline-none font-[Jost] text-[14px] text-[rgba(255,255,255,0.65)] placeholder:text-[rgba(255,255,255,0.65)] caret-white"
              aria-label="Password"
            />
          </div>
        </div>

        {/* Sign In button — top:378, left:32, width:392, height:56, radius:14px */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={!canSubmit}
          className="absolute top-[378px] left-[32px] w-[392px] h-[56px] rounded-[14px] bg-[#314460] border border-[#FFFFFF] flex items-center justify-center gap-[4px] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        >
          <span className="font-[Jost] text-[15px] font-medium text-[#FFFFFF]">
            Sign In →
          </span>
        </button>
      </div>

      {/* ── DOX logo — top:930, left:673, width:94.875, height:22 ── */}
      <div className="absolute top-[930px] left-[673px] w-[94px] h-[22px]">
        <DoxLogo />
      </div>

      {/* ── Footer text — top:967, left:485, width:471, height:27 ── */}
      <p className="absolute top-[967px] left-[485px] w-[471px] h-[27px] font-[Jost] text-[24px] font-normal text-[rgba(255,255,255,0.65)] leading-[27px] text-center m-0">
        Powered by Atlas × NoCapCode Infrastructure
      </p>
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
 * DoxLogo — width:94.875, height:22, stroke #FFFFFF at 2.5px.
 * Matches Figma Group 173 DOX wordmark exactly.
 */
const DoxLogo = () => (
  <svg
    width="94.875"
    height="22"
    viewBox="0 0 95 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="DOX logo"
  >
    {/* D */}
    <path
      d="M2 2h5.5C12.5 2 16 5.5 16 11s-3.5 9-8.5 9H2V2Z"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinejoin="round"
      fill="none"
    />
    {/* O */}
    <ellipse
      cx="33"
      cy="11"
      rx="8"
      ry="9"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      fill="none"
    />
    {/* X */}
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