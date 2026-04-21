import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginEmployee } from "../api/employeeApi";
import Loader from "../components/ui/Loader";

const AUTH_SESSION_KEY = "emp-auth-session";

/**
 * SignIn page
 */
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0,
    [email, password]
  );

  const isInvalidCredentialError = (error) => {
    const status = error?.status;
    const message = String(error?.message || "").toLowerCase();

    if (status === 400 || status === 401 || status === 403) {
      return true;
    }

    return (
      message.includes("invalid") ||
      message.includes("incorrect") ||
      message.includes("unauthorized") ||
      message.includes("request failed")
    );
  };

  const handleSignIn = async () => {
    if (!canSubmit || isLoading) return;

    try {
      setIsLoading(true);

      setErrorMessage("");

      // Backend expects "userid", map the current email field value.
      await loginEmployee({ userid: email.trim(), password });
      localStorage.setItem(AUTH_SESSION_KEY, "active");
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      const message = isInvalidCredentialError(error)
        ? "Incorrect credentials"
        : "Sign in failed. Please try again.";

      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(116.04deg, #0A0E14 18.26%, #112B53 51.38%, #0A0E14 78.49%)",
      }}
    >
      {isLoading && <Loader fullScreen={true} message="Signing in..." />}
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
            transform: "translate(0, -72%)",
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
            transform: "translate(0, -72%)",
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
            transform: "translate(-50%, 60%)",
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
            transform: "translate(-50%, 60%)",
            whiteSpace: "nowrap",
          }}
        >
          NCC
        </div>
      </div>

      {/* ── Main Content Wrapper ── */}
      <div
        className="relative flex flex-col items-center w-full px-4 mt-[1vh]"
        style={{ maxWidth: "471px", zIndex: 20 }}
      >
        {/* Union — DOX logo pill above card */}
        <div
          className="flex items-center justify-center mb-[6px]"
          style={{ flexShrink: 0 }}
        >
          <DoxLogo useFilter={true} fill="#152C4F" width="min(260px, 55vw)" />
        </div>

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
          className="mt-[1px] font-[Jost] text-[15px] font-normal text-center leading-[28px]"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Access your onboarding portal
        </p>

        {/* Inner fields box */}
        <div
          className="mt-[16px] w-full max-w-[350px] rounded-[16px] px-[26px] py-[19px] flex flex-col"
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSubmit && !isLoading) {
                  handleSignIn();
                }
              }}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="flex-1 bg-transparent border-none outline-none font-[Jost] text-[14px] caret-white"
              style={{ color: "rgba(255,255,255,0.65)" }}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0 bg-transparent border-none outline-none p-0 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Sign In button */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={!canSubmit || isLoading}
          className="mt-[16px] w-full max-w-[350px] h-[56px] rounded-[14px] flex items-center justify-center gap-[4px] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:opacity-90"
          style={{
            position: "relative",
            zIndex: 30,
            backgroundColor: "#314460",
            border: "1px solid #FFFFFF",
            boxShadow: "1px 1px 2px rgba(64,88,125,0.3), -1px -1px 2px rgba(34,48,67,0.5), inset -5px 5px 10px rgba(34,48,67,0.2), inset 5px -5px 10px rgba(34,48,67,0.2), inset -5px -5px 10px rgba(64,88,125,0.9), inset 5px 5px 13px rgba(34,48,67,0.9)",
          }}
        >
          <span className="font-[Jost] text-[15px] font-medium text-[#FFFFFF]">
            {isLoading ? "Signing In..." : "Sign In →"}
          </span>
        </button>

        {errorMessage ? (
          <p className="mt-[10px] text-[13px] text-[#FF9EA0] text-center max-w-[392px]">
            {errorMessage}
          </p>
        ) : null}

      </div>

      {/* Footer — DOX logo + gradient text */}
      <div
        className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px]"
        style={{ zIndex: 20 }}
      >
        <DoxLogo fill="#FFFFFF" width="95" />
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
 * EyeIcon
 */
const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M1.5 8s2.2-3.5 6.5-3.5S14.5 8 14.5 8s-2.2 3.5-6.5 3.5S1.5 8 1.5 8Z"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle
      cx="8"
      cy="8"
      r="2"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * EyeOffIcon
 */
const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M1.5 8s2.2-3.5 6.5-3.5S14.5 8 14.5 8s-2.2 3.5-6.5 3.5S1.5 8 1.5 8Z"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle
      cx="8"
      cy="8"
      r="2"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
    />
    <path
      d="M2.5 13.5 13.5 2.5"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * DoxLogo
 * @param {string} width - responsive width
 * @param {boolean} useFilter - apply Figma embossed filter (true for Union, false for footer)
 */
const DoxLogo = ({ width = "95", useFilter = false, fill = "#FFFFFF" }) => (
  <svg
    width={width}
    viewBox="0 0 339 95"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="DOX logo"
  >
    {useFilter && (
      <defs>
        <filter id="dox_filter" x="0" y="0" width="338.062" height="95" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0313726 0 0 0 0 0.0705882 0 0 0 0 0.12549 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.27451 0 0 0 0 0.494118 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="3" dy="3" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0313726 0 0 0 0 0.0705882 0 0 0 0 0.12549 0 0 0 0.9 0" />
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-3" dy="-3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.27451 0 0 0 0 0.494118 0 0 0 0.9 0" />
          <feBlend mode="normal" in2="effect3_innerShadow" result="effect4_innerShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="3" dy="-3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0313726 0 0 0 0 0.0705882 0 0 0 0 0.12549 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="effect4_innerShadow" result="effect5_innerShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-3" dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0313726 0 0 0 0 0.0705882 0 0 0 0 0.12549 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="effect5_innerShadow" result="effect6_innerShadow" />
        </filter>
      </defs>
    )}
    <g filter={useFilter ? "url(#dox_filter)" : undefined}>
      <path
        d="M34.7666 3C46.7577 3 56.0143 9.02218 62.1338 17.5264C68.1563 25.896 71.2549 36.7461 71.541 47.3379C71.8268 57.9196 69.3202 68.899 63.3457 77.415C57.2191 86.1478 47.6047 92 34.7666 92H3C2.99991 91.9957 2.99999 85.9979 3 80H34.7666C43.4858 80 49.5193 76.2271 53.5215 70.5225C57.6757 64.601 59.779 56.3304 59.5449 47.6621C59.3111 39.0041 56.7596 30.604 52.3936 24.5361C48.1243 18.603 42.2529 15 34.7666 15H4.00195V3H34.7666ZM159.892 3C171.883 3 181.139 9.02218 187.259 17.5264C193.281 25.896 196.38 36.7461 196.666 47.3379C196.952 57.9196 194.445 68.899 188.471 77.415C182.344 86.1478 172.73 92 159.892 92H120.421C107.583 92 97.9684 86.1478 91.8418 77.415C85.8673 68.899 83.3607 57.9196 83.6465 47.3379C83.9326 36.7461 87.0312 25.896 93.0537 17.5264C99.1732 9.02218 108.43 3 120.421 3H159.892ZM241.704 3C253.695 3 262.952 9.02218 269.071 17.5264C270.345 19.2968 271.487 21.179 272.5 23.1455C273.513 21.179 274.655 19.2968 275.929 17.5264C282.048 9.02218 291.305 3 303.296 3H334.061V15H303.296C295.81 15 289.938 18.603 285.669 24.5361C281.303 30.604 278.751 39.0041 278.518 47.6621C278.283 56.3304 280.387 64.601 284.541 70.5225C288.543 76.2271 294.577 80 303.296 80H335.062C335.062 85.9979 335.063 91.9957 335.062 92H303.296C290.458 92 280.843 86.1478 274.717 77.415C273.915 76.2723 273.178 75.0839 272.5 73.8594C271.822 75.0839 271.085 76.2723 270.283 77.415C264.157 86.1478 254.542 92 241.704 92H209.938C209.937 91.9957 209.937 85.9979 209.938 80H241.704C250.423 80 256.457 76.2271 260.459 70.5225C264.613 64.601 266.717 56.3304 266.482 47.6621C266.249 39.0041 263.697 30.604 259.331 24.5361C255.062 18.603 249.19 15 241.704 15H210.939V3H241.704ZM120.421 15C112.935 15 107.063 18.603 102.794 24.5361C98.4279 30.604 95.8764 39.0041 95.6426 47.6621C95.4085 56.3304 97.5118 64.601 101.666 70.5225C105.668 76.2271 111.702 80 120.421 80H159.892C168.611 80 174.644 76.2271 178.646 70.5225C182.801 64.601 184.904 56.3304 184.67 47.6621C184.436 39.0041 181.885 30.604 177.519 24.5361C173.249 18.603 167.378 15 159.892 15H120.421Z"
        fill={fill}
      />
    </g>
  </svg>
);

export default SignIn;