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

      <main className="signin-main">
        
        {/* ── Title & Subtitle ── */}
        <div className="signin-header-section">
          <div className="signin-title-container">
            <span className="signin-title-white">Sign</span>
            <span className="signin-title-blue">In</span>
          </div>
          <p className="signin-subtitle">Access your onboarding portal</p>
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

      </main>
    </div>
  );
};

/* --- SVGs --- */

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SignIn;