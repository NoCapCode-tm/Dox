import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LegalAgreements.css'; // Make sure the path matches your project structure
import HelpButton from "../components/Help/HelpButton";
import HelpDrawer from "../components/Help/HelpDrawer";


const LegalAgreements = () => {
    const navigate = useNavigate();
    const [helpOpen, setHelpOpen] = useState(false);


    return (
        <div className="legal-wrapper">
            
            {/* --- Mobile Top Navbar (Hidden on Desktop) --- */}
            <div className="legal-mobile-nav">
                <div className="legal-mobile-nav-logo">
                    <DoxLogo width="50" />
                </div>
                <div className="legal-mobile-steps">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className={`legal-mobile-step ${n === 3 ? 'active' : 'inactive'}`}>
                            {n}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Sidebar Navigation (Desktop) --- */}
            <nav className="legal-sidebar">
                {/* Logo Area */}
                <div className="legal-sidebar-logo">
                    <DoxLogo width="45" />
                </div>

                {/* Steps */}
                <div className="legal-sidebar-steps">
                    <div className="legal-sidebar-step inactive">1</div>
                    <div className="legal-sidebar-step inactive">2</div>
                    <div className="legal-sidebar-step active">3</div>
                </div>
            </nav>

            {/* --- Main Content Area --- */}
            <main className="legal-main">
                
                {/* Form Card */}
                <div className="legal-card">
                    
                    {/* Header */}
                    <div className="legal-header-container">
                        <h1 className="legal-h1">Legal Agreements</h1>
                        <p className="legal-subtitle">
                            Please review and sign the following documents to proceed with your onboarding.
                        </p>
                    </div>

                    {/* Agreement Cards */}
                    <div className="legal-agreements-list">
                        
                        {/* Offer Letter */}
                        <div className="legal-agreement-item">
                            <div className="legal-agreement-left">
                                <div className="legal-agreement-icon signed">
                                    <OfferIcon />
                                </div>
                                <div className="legal-agreement-text">
                                    <div className="legal-agreement-title-row">
                                        <h3 className="legal-agreement-title">Offer Letter</h3>
                                        <div className="legal-badge signed">
                                            <StatusSignedIcon /> Signed
                                        </div>
                                    </div>
                                    <p className="legal-agreement-desc">
                                        Your official employment offer letter containing role, compensation, and benefits details.
                                    </p>
                                </div>
                            </div>
                            <div className="legal-agreement-right">
                                <button type="button" className="legal-action-btn signed">
                                    <ButtonCheckIcon /> View Signed Document
                                </button>
                            </div>
                        </div>

                        {/* NDA */}
                        <div className="legal-agreement-item">
                            <div className="legal-agreement-left">
                                <div className="legal-agreement-icon pending">
                                    <NdaIcon />
                                </div>
                                <div className="legal-agreement-text">
                                    <div className="legal-agreement-title-row">
                                        <h3 className="legal-agreement-title">Non-Disclosure Agreement (NDA)</h3>
                                        <div className="legal-badge pending">
                                            <StatusPendingIcon /> Pending
                                        </div>
                                    </div>
                                    <p className="legal-agreement-desc">
                                        Confidentiality agreement protecting company information and intellectual property.
                                    </p>
                                </div>
                            </div>
                            <div className="legal-agreement-right">
                                <button type="button" className="legal-action-btn pending">
                                    <ButtonSignwellIcon /> Sign via Nexgn
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Navigation Buttons */}
                    <div className="legal-bottom-nav">
                        <button
                            type="button"
                            onClick={() => navigate('/welcome')}
                            className="legal-nav-btn"
                        >
                            <BackArrowIcon />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="legal-nav-btn"
                        >
                            Continue
                            <ForwardArrowIcon />
                        </button>
                    </div>

                </div>
            </main>

            <HelpButton
                onClick={() => setHelpOpen(true)}
            />

            <HelpDrawer
                open={helpOpen}
                onClose={() => setHelpOpen(false)}
                page="offerLetter"
            />
                    // Inside LegalAgreements.jsx, just before the final UNDER MAINTENANCE BREAK
                        <div className="legal-maintenance-overlay">
                            <div className="legal-maintenance-card">
                                <div className="maintenance-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                </div>

                                <h2 className="maintenance-title">System Maintenance</h2>
                                <p className="maintenance-description">
                                    Our engineering team in <strong>New Mexico, United States</strong>, is currently performing a scheduled upgrade to the Legal Agreements module to improve reliability and signing performance.
                                </p>

                                <div className="maintenance-divider"></div>

                                <div className="maintenance-notice">
                                    <p className="notice-text">
                                        Your <strong>Offer Letter and NDA</strong> will be processed and sent to your portal within <strong>24 hours</strong>.
                                    </p>
                                    <p className="notice-contact">
                                        For urgent inquiries, please reach out to our HR team at 
                                        <a href="mailto:hr@nocapcode.cloud"> hr@nocapcode.cloud</a>.
                                    </p>
                                </div>
                                {/* New Action Buttons */}
                                <div className="maintenance-actions">
                                    <button 
                                        onClick={() => navigate('/welcome')} 
                                        className="btn-primary"
                                    >
                                        Return to Homepage
                                    </button>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="btn-secondary"
                                    >
                                        Check Status Again
                                    </button>
                                </div>
                            </div>
                        </div>
        
        </div>
        
    );
};

/* --- Icons --- */

const StatusSignedIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 6.5L5 8L8.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StatusPendingIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="2.5" y="4" width="7" height="4" rx="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
);

const ButtonCheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M5.5 9L8 11.4L12.5 6.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
    </svg>
);

const ButtonSignwellIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 4H5C4.44772 4 4 4.44772 4 5V15C4 15.5523 4.44772 16 5 16H15C15.5523 16 16 15.5523 16 15V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 4L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 4H15V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const OfferIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#06D6A0" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke="#06D6A0" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 13H16M8 17H12" stroke="#06D6A0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const NdaIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#D1D5DC" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke="#D1D5DC" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 13H16M8 17H12" stroke="#D1D5DC" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const BackArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ForwardArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const DoxLogo = ({ width = '50', fill = '#FFFFFF' }) => (
    <svg width={width} viewBox="0 0 339 95" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
        <g>
            <path d="M34.7666 3C46.7577 3 56.0143 9.02218 62.1338 17.5264C68.1563 25.896 71.2549 36.7461 71.541 47.3379C71.8268 57.9196 69.3202 68.899 63.3457 77.415C57.2191 86.1478 47.6047 92 34.7666 92H3C2.99991 91.9957 2.99999 85.9979 3 80H34.7666C43.4858 80 49.5193 76.2271 53.5215 70.5225C57.6757 64.601 59.779 56.3304 59.5449 47.6621C59.3111 39.0041 56.7596 30.604 52.3936 24.5361C48.1243 18.603 42.2529 15 34.7666 15H4.00195V3H34.7666ZM159.892 3C171.883 3 181.139 9.02218 187.259 17.5264C193.281 25.896 196.38 36.7461 196.666 47.3379C196.952 57.9196 194.445 68.899 188.471 77.415C182.344 86.1478 172.73 92 159.892 92H120.421C107.583 92 97.9684 86.1478 91.8418 77.415C85.8673 68.899 83.3607 57.9196 83.6465 47.3379C83.9326 36.7461 87.0312 25.896 93.0537 17.5264C99.1732 9.02218 108.43 3 120.421 3H159.892ZM241.704 3C253.695 3 262.952 9.02218 269.071 17.5264C270.345 19.2968 271.487 21.179 272.5 23.1455C273.513 21.179 274.655 19.2968 275.929 17.5264C282.048 9.02218 291.305 3 303.296 3H334.061V15H303.296C295.81 15 289.938 18.603 285.669 24.5361C281.303 30.604 278.751 39.0041 278.518 47.6621C278.283 56.3304 280.387 64.601 284.541 70.5225C288.543 76.2271 294.577 80 303.296 80H335.062C335.062 85.9979 335.063 91.9957 335.062 92H303.296C290.458 92 280.843 86.1478 274.717 77.415C273.915 76.2723 273.178 75.0839 272.5 73.8594C271.822 75.0839 271.085 76.2723 270.283 77.415C264.157 86.1478 254.542 92 241.704 92H209.938C209.937 91.9957 209.937 85.9979 209.938 80H241.704C250.423 80 256.457 76.2271 260.459 70.5225C264.613 64.601 266.717 56.3304 266.482 47.6621C266.249 39.0041 263.697 30.604 259.331 24.5361C255.062 18.603 249.19 15 241.704 15H210.939V3H241.704ZM120.421 15C112.935 15 107.063 18.603 102.794 24.5361C98.4279 30.604 95.8764 39.0041 95.6426 47.6621C95.4085 56.3304 97.5118 64.601 101.666 70.5225C105.668 76.2271 111.702 80 120.421 80H159.892C168.611 80 174.644 76.2271 178.646 70.5225C182.801 64.601 184.904 56.3304 184.67 47.6621C184.436 39.0041 181.885 30.604 177.519 24.5361C173.249 18.603 167.378 15 159.892 15H120.421Z" fill={fill}/>
        </g>
    </svg>
);

export default LegalAgreements;