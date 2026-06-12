import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginEmployee } from "../api/employeeApi";
import Loader from "../components/ui/Loader";
import { setAuthSession } from "../utils/auth";
<<<<<<< HEAD

// Import standard CSS
import "./css/SignIn.css";

const AUTH_SESSION_KEY = "emp-auth-session";
=======
import { setAuthSession } from "../utils/auth";
>>>>>>> 28dccfce5f6b6f56183a75cab6ea7221a359bb5a

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
      setAuthSession();
      toast.success("Login successful");
      navigate("/welcome");
    } catch (error) {
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
    <div className="signin-wrapper">
      {isLoading && <Loader fullScreen={true} message="Signing in..." />}
      
      {/* Group 260 — "Atla" decorative text */}
      <div className="signin-bg-atla-container">
        {/* Atla shadow layer */}
        <div className="signin-bg-atla-shadow">Atla</div>
        {/* Atla gradient layer */}
        <div className="signin-bg-atla-gradient">Atla</div>
      </div>

      {/* Group 261 — "NCC" decorative text */}
      <div className="signin-bg-ncc-container">
        {/* NCC shadow layer */}
        <div className="signin-bg-ncc-shadow">NCC</div>
        {/* NCC gradient layer */}
        <div className="signin-bg-ncc-gradient">NCC</div>
      </div>

      {/* ── Main Content Wrapper ── */}
      <div className="signin-main-content">
        
        {/* Union — DOX logo pill above card */}
        <div className="signin-logo-wrap">
          <DoxLogo useFilter={true} fill="#152C4F" width="min(260px, 55vw)" />
        </div>

        {/* Title */}
        <div className="signin-title-container">
          <span className="signin-title-white">Sign</span>
          <span className="signin-title-blue">In</span>
        </div>

        {/* Subtitle */}
        <p className="signin-subtitle">Access your onboarding portal</p>

        {/* Inner fields box */}
        <div className="signin-form-box">
          
          {/* Email label */}
          <div className="signin-label">Email Address</div>

          {/* Email input */}
          <div className="signin-input-container">
            <MailIcon />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              inputMode="email"
              autoComplete="email"
              className="signin-input"
              aria-label="Email address"
            />
          </div>

          {/* Password label */}
          <div className="signin-label mt-16">Password</div>

          {/* Password input */}
          <div className="signin-input-container">
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
              className="signin-input"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="signin-toggle-btn"
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
          className="signin-submit-btn"
        >
          <span className="signin-btn-text">
            {isLoading ? "Signing In..." : "Sign In →"}
          </span>
        </button>

        {errorMessage && (
          <p className="signin-error-text">
            {errorMessage}
          </p>
        )}

      </div>

      {/* Footer — DOX logo + gradient text */}
      <div className="signin-footer">
        <DoxLogo fill="#FFFFFF" width="95" />
        <p className="signin-footer-text">
          Powered by Atlas × NoCapCode Infrastructure
        </p>
      </div>
    </div>
  );
};

/* ── SVGs ── */

const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="signin-icon-shrink"
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

const LockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="signin-icon-shrink"
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

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="signin-icon-shrink"
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

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="signin-icon-shrink"
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