import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginEmployee } from "../api/employeeApi";
import Loader from "../components/ui/Loader";

// Import standard CSS
import "./css/SignIn.css";

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
  
  // --- New State for Cookie Detection ---
  const [cookiesBlocked, setCookiesBlocked] = useState(false);

  // --- Cookie Detection Logic ---
  useEffect(() => {
    const checkCookiesEnabled = () => {
      // 1. Check browser's built-in flag
      if (!navigator.cookieEnabled) return false;
      
      // 2. Perform a hard test (write, read, delete) to catch strict privacy blockers
      try {
        document.cookie = "dox_cookietest=1; SameSite=Strict";
        const isEnabled = document.cookie.indexOf("dox_cookietest=") !== -1;
        document.cookie = "dox_cookietest=1; expires=Thu, 01-Jan-1970 00:00:00 GMT; SameSite=Strict";
        return isEnabled;
      } catch (e) {
        return false;
      }
    };

    if (!checkCookiesEnabled()) {
      setCookiesBlocked(true);
    }
  }, []);

  const canSubmit = useMemo(
    () => userId.trim().length > 0 && password.length > 0 && !cookiesBlocked,
    [userId, password, cookiesBlocked]
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
      const response = await loginEmployee({ userid: userId.trim(), password });
      console.log(response.message)
      toast.success("Login successful");
      if(response?.message?.onboarding?.status === "Completed"){
        navigate("/completion");
      }else{
        navigate("/welcome");
      }
      
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

      {/* --- Cookie Blocked Overlay --- */}
      {cookiesBlocked && (
        <div className="cookie-blocked-overlay animate-fade">
          <div className="cookie-blocked-card">
            
            <div className="cookie-header">
              <div className="cookie-icon-wrapper">
                <CookieIcon />
              </div>
              <h2>Action Required</h2>
            </div>
            
            <p className="cookie-description">
              Your browser is currently blocking cookies. DOX requires cookies to securely authenticate your session and protect your onboarding documents.
            </p>
            
            <div className="cookie-divider"></div>
            
            <div className="cookie-instructions">
              <strong>How to resolve this:</strong>
              <ul>
                <li>Disable "Block all cookies" in your browser settings.</li>
                <li>If using Incognito/Private mode, allow cookies for this site.</li>
                <li>Turn off strict tracker blockers (e.g., Brave Shields).</li>
              </ul>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              className="cookie-reload-btn"
            >
              I have enabled cookies — Reload
            </button>
            
          </div>
        </div>
      )}

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
            
            {/* Username Field */}
            <div className="signin-form-field">
              <label className="signin-field-label">Email ID</label>
              <div className="signin-input-wrapper">
                <MailIcon className="signin-input-icon" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="your.username"
                  className="signin-input with-icon"
                  required
                  disabled={cookiesBlocked}
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
                  disabled={cookiesBlocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="signin-toggle-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={cookiesBlocked}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              
              {/* Forgot Password Link */}
              <div className="signin-forgot-pwd">
                <a
                href={`mailto:hr@nocapcode.cloud?subject=${encodeURIComponent(
                    "Forgot Password Request - Dox Account Access"
                  )}&body=${encodeURIComponent(`Dear HR Team,

I hope you are doing well.

I am writing to request assistance with accessing my Dox account, as I am currently unable to log in. I would appreciate your support in resetting my password or guiding me through the recovery process.

For your reference, my details are provided below:

Full Name:
Registered Email:
Employee ID (if applicable):
Department/Team:
Issue Summary: Unable to access my Dox account

Please let me know if any additional information is required from my side to proceed further.

Thank you for your time and support. I look forward to your assistance.

Best regards,
`)}`}
                >
                Forgot Password? 
                </a>
              </div>
            </div>

          </div> 

          {/* Submit Button (Outside Glass Card) */}
          <button
            type="submit"
            disabled={!canSubmit || isLoading || cookiesBlocked}
            className={`signin-submit-btn ${cookiesBlocked ? 'disabled-by-cookies' : ''}`}
          >
            <span className="signin-btn-text">
               {isLoading ? "Signing In..." : "Log In"}
            </span>
            {!isLoading && <ArrowRightIcon />}
          </button>

        </form>

        {/* Footer Support Text */}
        <div className="signin-footer-text">
          © 2024–{new Date().getFullYear().toString().slice(-2)} NoCapCode. <br />DOX Secure Employee Onboarding & Document Management Platform.
        </div>

      </main>
    </div>
  );
};

/* --- SVGs --- */

const CookieIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
    <path d="M8.5 8.5v.01"></path>
    <path d="M16 12.5v.01"></path>
    <path d="M12 16v.01"></path>
    <path d="M11 12.5v.01"></path>
    <path d="M8 14.5v.01"></path>
  </svg>
);

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