import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginEmployee } from "../api/employeeApi";
import Loader from "../components/ui/Loader";
import { setAuthSession } from "../utils/auth";

// Import standard CSS
import "./css/SignIn.css";

const AUTH_SESSION_KEY = "emp-auth-session";

/**
 * SignIn page
 */
const SignIn = () => {
  const navigate = useNavigate();
  // State for username/email
  const [userId, setUserId] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = useMemo(
    () => userId.trim().length > 0 && password.length > 0,
    [userId, password]
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
      message.includes("not found")
    );
  };

  const handleSignIn = async (e) => {
    e?.preventDefault();
    if (!canSubmit || isLoading) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      // Backend expects "userid", map the current field value.
      await loginEmployee({ userid: userId.trim(), password });
      
      setAuthSession();
      toast.success("Login successful");
      navigate("/welcome");
    } catch (error) {
      const message = isInvalidCredentialError(error)
        ? "Incorrect credentials. Please try again."
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

      {/* ── Main Content Wrapper ── */}
      <div className="signin-main-content">

        {/* Title */}
        <div className="signin-title-container">
          <span className="signin-title-white">Sign</span>
          <span className="signin-title-blue">In</span>
        </div>

        {errorMessage && (
          <div className="signin-error-box animate-fade">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* ── Form Container ── */}
        <form onSubmit={handleSignIn} className="signin-form-container">
          
          {/* Glass Card Wrapping Inputs Only */}
          <div className="signin-card">
            
            {/* Email/Username Field */}
            <div className="signin-form-field">
              <label className="signin-field-label">Email Address</label>
              <div className="signin-input-wrapper">
                <MailIcon className="signin-input-icon" />
                <input
                  type="text" /* Changed from "email" to "text" to allow plain usernames without '@' */
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="your.username"
                  className="signin-input with-icon"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="signin-form-field">
              <label className="signin-field-label">Password</label>
              <div className="signin-input-wrapper">
                <LockIcon className="signin-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="signin-input with-icon"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="signin-toggle-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

          {/* Email input */}
          <div className="signin-input-container">
            <MailIcon />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.username"
              inputMode="email"
              autoComplete="email"
              className="signin-input"
              aria-label="Email address"
            />
          </div>

          {/* Submit Button (Outside Glass Card) */}
          <button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="signin-submit-btn"
          >
            <span className="signin-btn-text">
               {isLoading ? "Signing In..." : "Sign In"}
            </span>
            {!isLoading && <ArrowRightIcon />}
          </button>

        </form>

        <div className="signin-footer-text">
          © 2024–{new Date().getFullYear().toString().slice(-2)} NoCapCode. <br />DOX Secure Employee Onboarding & Document Management Platform.
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
        <p className="signin-footer-text">
          © 2024–{new Date().getFullYear().toString().slice(-2)} NoCapCode. <br />DOX Secure Employee Onboarding & Document Management Platform.
        </p>
      </div>
    </div>
  );
};

/* --- SVGs --- */

const MailIcon = () => (
  <svg
    width="17"
    height="17"
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
    width="17"
    height="17"
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
    width="18"
    height="18"
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
    width="18"
    height="18"
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

export default SignIn;