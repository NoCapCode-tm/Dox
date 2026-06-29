import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { showMissingRequiredFieldsToast } from '../../utils/requiredFieldToast';
import { useOnboardingContext } from '../../context/OnboardingContext';
import { saveStep8Declaration, getCurrentUser } from '../../api/employeeApi';
import Loader from '../../components/ui/Loader';
import HelpButton from "../../components/Help/HelpButton";
import HelpDrawer from "../../components/Help/HelpDrawer";

// Import standard CSS
import './css/Step8Declaration.css';

const REQUIRED_STEP8_FIELDS = [
    { key: 'signature', label: 'Digital Signature' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'dateOfSubmission', label: 'Date of Submission' },
    { key: 'agreed', label: 'I agree' },
];

/**
 * Step8Declaration
 * Onboarding Step 8 of 8 — Declaration & Agreement
 */
const Step8Declaration = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useOnboardingContext();
    const [isSavingStep, setIsSavingStep] = useState(false);
    const [stepError, setStepError] = useState('');
    const [helpOpen, setHelpOpen] = useState(false);
    
    const step8 = formData.step8;
    const step1 = formData.step1;
    const step2 = formData.step2;
    const step3 = formData.step3;
    const step4 = formData.step4;
    const step5 = formData.step5;
    const step6 = formData.step6;
    const step7 = formData.step7;

    /** Prefill form data from database on component mount */
    useEffect(() => {
        const prefillFormData = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData?.message) {
                    const data = userData.message;
                    updateFormData('step8', 'signature', step8.signature || data.signature || '');
                    updateFormData('step8', 'fullName', step8.fullName || data.name || '');
                }
            } catch (error) {
                console.warn('Could not prefill Step 8 data:', error?.message);
            }
        };
        prefillFormData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        if (showMissingRequiredFieldsToast(step8, REQUIRED_STEP8_FIELDS).length > 0) {
            return;
        }

        try {
            setIsSavingStep(true);
            setStepError('');
            await saveStep8Declaration(step8);
            toast.success('Step 8 filled');
            if (!step8.completionStartedAt) {
                updateFormData('step8', 'completionStartedAt', Date.now());
            }
            navigate('/completion');
        } catch (error) {
            setStepError(error?.message || 'Unable to save Step 8. Please try again.');
        } finally {
            setIsSavingStep(false);
        }
    };

    return (
        <div className="step8-wrapper">
            {isSavingStep && <Loader fullScreen={true} message="Saving and completing onboarding..." />}
            
            {/* Header */}
            <div className="step8-header">
                <DoxLogo width="69" />
                <span>Employee Onboarding</span>
            </div>

            {/* Step Navbar */}
            <div className="step8-nav-container">
                <nav className="step8-nav">
                    <div className="step8-nav-inner">
                        <NavItem label="Home" icon={<HomeIcon />} />
                        <NavItem label="Personal Info" icon={<PersonIcon />} />
                        <NavItem label="Emergency Info" icon={<SirenIcon />} />
                        <NavItem label="Identity" icon={<IdIcon />} />
                        <NavItem label="Education" icon={<EducationIcon />} />
                        <NavItem label="Profile" icon={<ProfileIcon />} />
                        <NavItem label="Bank Details" icon={<BankIcon />} />
                        <NavItem label="System Info" icon={<SystemIcon />} />
                        <NavItem label="Declaration" icon={<DeclarationIcon />} active />
                    </div>
                </nav>
            </div>

            {/* Page Content */}
            <main className="step8-main">

                {/* Step label */}
                <p className="step8-step-label">Step 8 of 8</p>

                {/* Heading + subtitle */}
                <div className="step8-heading-container">
                    <h1 className="step8-h1">Declaration & Agreement</h1>
                    <p className="step8-subtitle">
                        This section confirms authenticity and compliance with company policies.
                    </p>
                </div>

                {/* Application Summary */}
                <h2 className="step8-section-h2">Application Summary</h2>

                <div className="step8-summary-list">
                    <ReviewSection
                        title="Basic Personal Information"
                        icon={<PersonIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step1')}
                        items={[
                            { label: 'Full Name', value: step1.fullName || '—' },
                            { label: 'Email', value: step1.personalEmail || '—' },
                            { label: 'Phone Number', value: step1.phoneWithCode || '—' },
                            { label: 'Date of Birth', value: step1.dateOfBirth || '—' },
                            { label: 'Gender', value: step1.gender || '—' },
                            { label: 'Permanent Address', value: step1.permanentAddress || '—' },
                            { label: 'Communication Address', value: step1.communicationAddress || '—' },
                            { label: 'Country of citizenship', value: step1.countryOfCitizenship || '—' },
                        ]}
                    />

                    <ReviewSection
                        title="Emergency Contact Information"
                        icon={<SirenIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step2')}
                        items={[
                            { label: 'Emergency Contact Name', value: step2.contactName || '—' },
                            { label: 'Emergency Contact Number', value: step2.contactPhone || '—' },
                            { label: 'Relationship to Employee', value: step2.relationship || '—' },
                            { label: 'Emergency Contact Email', value: step2.contactEmail || '—' },
                            { label: 'Country of Residence', value: step2.countryOfResidence || '—' },
                        ]}
                    />

                    <ReviewSection
                        title="Identity Information"
                        icon={<IdIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step3')}
                        items={[
                            { label: 'Government-issued ID Number', value: step3.govIdNumber || '—' },
                            { label: 'Uploaded Government-issued ID', value: step3.govIdFile ? 'Uploaded' : '—' },
                            { label: 'Secondary Government-issued ID', value: step3.secondaryIdNumber || '—' },
                            { label: 'Uploaded Secondar-ID', value: step3.secondaryIdFile ? 'Uploaded' : '—' },
                            { label: 'Passport-size Photograph', value: step3.passportPhoto ? 'Uploaded' : '—' },
                            { label: 'Student/University ID', value: step3.studentIdFile ? 'Uploaded' : '—' },
                        ]}
                    />

                    <ReviewSection
                        title="Education Details"
                        icon={<EducationIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step4')}
                        items={[
                            { label: 'Highest Qualification', value: step4.highestQualification || '—' },
                            { label: 'College / University Name', value: step4.universityName || '—' },
                            { label: 'Current Year / Semester', value: step4.currentYearSemester || '—' },
                            { label: 'Course / Program Name', value: step4.courseName || '—' },
                            { label: 'Expected Graduation Year', value: step4.graduationYear || '—' },
                        ]}
                    />

                    <ReviewSection
                        title="Professional Profile"
                        icon={<ProfileIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step5')}
                        items={[
                            { label: 'Areas of Expertise', value: step5.areasOfExpertise || '—' },
                            { label: 'Organization / Company Name', value: step5.orgName || '—' },
                            { label: 'Duration', value: step5.duration || '—' },
                            { label: 'Portfolio Link', value: step5.portfolioLink || '—' },
                            { label: 'LinkedIn Profile URL', value: step5.linkedinUrl || '—' },
                            { label: 'Technical Skills', value: step5.technicalSkills || '—' },
                            { label: 'Role Title', value: step5.roleTitle || '—' },
                            { label: 'Key Responsibilities', value: step5.keyResponsibilities || '—' },
                            { label: 'GitHub Profile', value: step5.githubProfile || '—' },
                        ]}
                    />

                    <ReviewSection
                        title="Payment & Financial Information"
                        icon={<BankIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step6')}
                        items={[
                            { label: 'Account Holder Name', value: step6.india?.accountHolderName || step6.intl?.accountHolderName || '—' },
                            { label: 'Account Number', value: step6.india?.accountNumber || step6.intl?.ibanAccountNumber || '—' },
                            { label: 'Bank Name', value: step6.india?.bankName || step6.intl?.bankName || '—' },
                            { label: 'IFSC Code', value: step6.india?.ifscCode || '—' },
                            { label: 'Branch Name', value: step6.india?.branchName || '—' },
                            { label: 'UPI ID', value: step6.india?.upiId || '—' },
                            { label: 'IBAN / Account Number', value: step6.intl?.ibanAccountNumber || '—' },
                            { label: 'SWIFT Code', value: step6.intl?.swiftCode || '—' },
                            { label: 'Payment Platform', value: step6.intl?.paymentPlatform || '—' },
                        ]}
                    />

                    <ReviewSection
                        title="Work Environment & Technical Setup"
                        icon={<SystemIcon size={20} />}
                        onEdit={() => navigate('/onboarding/step7')}
                        items={[
                            { label: 'Laptop Availability', value: step7.laptopAvailability || '—' },
                            { label: 'Operating System', value: step7.operatingSystem || '—' },
                            { label: 'Time Zone', value: step7.timeZone || '—' },
                            { label: 'Primary Device Type', value: step7.primaryDeviceType || '—' },
                            { label: 'Internet Reliability', value: step7.internetReliability || '—' },
                            { label: 'Weekly Availability', value: step7.weeklyAvailability || '—' },
                        ]}
                    />
                </div>

                {/* Declaration + confirmation container */}
                <div className="step8-decl-wrapper">
                    
                    <h2 className="step8-decl-h2">Declaration</h2>

                    {/* Employee Declaration */}
                    <div className="step8-notice-card">
                        <h3 className="step8-notice-title">Employee Declaration</h3>
                        <p className="step8-notice-text">
                            I confirm that all information provided is accurate and complete.<br />
                            I agree to comply with NoCapCode policies and the internal handbook.<br />
                            I acknowledge the confidentiality and data protection obligations.<br />
                            I understand that any misrepresentation may result in termination.
                        </p>
                    </div>

                    {/* Digital Confirmation */}
                    <h3 className="step8-confirm-title">Digital Confirmation</h3>

                    <div className="step8-form-card">
                        <div className="step8-form-grid">

                            {/* Digital Signature */}
                            <div className="step8-form-field">
                                <label className="step8-field-label-container">
                                    <span className="step8-field-label">Digital Signature</span>
                                    <span className="step8-field-asterisk">*</span>
                                </label>
                                <div className="step8-sign-container">
                                    <button
                                        type="button"
                                        onClick={() => updateFormData('step8', 'signature', 'signed')}
                                        className="step8-sign-btn"
                                    >
                                        {step8.signature ? '✓ Signed' : 'Click'}
                                    </button>
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="step8-form-field">
                                <label className="step8-field-label-container">
                                    <span className="step8-field-label">Full Name</span>
                                    <span className="step8-field-asterisk">*</span>
                                </label>
                                <input
                                    value={step8.fullName || ''}
                                    onChange={(e) => updateFormData('step8', 'fullName', e.target.value)}
                                    placeholder="Enter full name"
                                    className="step8-input"
                                />
                            </div>

                            {/* Date of Submission */}
                            <div className="step8-form-field">
                                <label className="step8-field-label-container">
                                    <span className="step8-field-label">Date of Submission</span>
                                    <span className="step8-field-asterisk">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={step8.dateOfSubmission || ''}
                                    onChange={(e) => updateFormData('step8', 'dateOfSubmission', e.target.value)}
                                    className={`step8-date ${!step8.dateOfSubmission ? 'empty' : ''}`}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Compliance blue card */}
                    <div className="step8-notice-card-alt">
                        <p className="step8-notice-text-alt">
                            I confirm that all the information provided is accurate and belongs to me, and I understand that this information will be used for preparing my Offer Letter, NDA/IP Agreement, and internal onboarding records.
                        </p>
                    </div>

                    {/* I agree checkbox */}
                    <label className="step8-agree-label">
                        <div
                            className={`step8-checkbox-box ${step8.agreed ? 'checked' : ''}`}
                            onClick={() => updateFormData('step8', 'agreed', !step8.agreed)}
                        >
                            {step8.agreed && (
                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                                    <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <span className="step8-agree-text">I agree</span>
                        <span className="step8-field-asterisk">*</span>
                    </label>

                </div>

                {/* Navigation Buttons */}
                <div className="step8-button-container">
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/step7')}
                        className="step8-prev-btn"
                    >
                        <ArrowLeftIcon />
                        <span className="step8-btn-text">Previous</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSavingStep}
                        className="step8-submit-btn"
                    >
                        <span className="step8-btn-text">{isSavingStep ? 'Saving...' : 'Submit'}</span>
                        <ArrowRightIcon />
                    </button>
                </div>

                {stepError && <p className="step8-error-text">{stepError}</p>}

            </main>
      
        <HelpButton
            onClick={() => setHelpOpen(true)}
        />

        <HelpDrawer
            open={helpOpen}
            onClose={() => setHelpOpen(false)}
            page="step8"
        />
            
        </div>
    );
};

/* ── ReviewSection Component ── */

const ReviewSection = ({ title, icon, onEdit, items }) => (
    <div className="step8-review-card">
        {/* Header row */}
        <div className="step8-review-header">
            <div className="step8-review-header-left">
                <div className="step8-review-icon">
                    {icon}
                </div>
                <span className="step8-review-title">
                    {title}
                </span>
            </div>
            <button
                type="button"
                onClick={onEdit}
                className="step8-review-edit-btn"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 13h12M9.5 1.5l3 3L4 13H1v-3L9.5 1.5Z" stroke="#314460" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Edit
            </button>
        </div>

        {/* Key-value rows */}
        <div className="step8-review-content">
            {items.map((item, i) => (
                <div key={i} className="step8-review-row">
                    <span className="step8-review-label">{item.label}</span>
                    <span className="step8-review-value">{item.value}</span>
                </div>
            ))}
        </div>
    </div>
);

/* Sub-components */

const NavItem = ({ label, icon, active }) => {
    const navigate = useNavigate();
    const routeByLabel = {
        Home: '/dashboard',
        'Personal Info': '/onboarding/step1',
        'Emergency Info': '/onboarding/step2',
        Identity: '/onboarding/step3',
        Education: '/onboarding/step4',
        Profile: '/onboarding/step5',
        'Bank Details': '/onboarding/step6',
        'System Info': '/onboarding/step7',
        Declaration: '/onboarding/step8',
    };
    const targetPath = routeByLabel[label];

    return (
        <button
            type="button"
            onClick={() => targetPath && !active && navigate(targetPath)}
            className={`step8-nav-item ${active ? 'active' : ''}`}
        >
            <span className="step8-nav-icon">{icon}</span>
            <span className="step8-nav-label">{label}</span>
        </button>
    );
};

/* Icon Components */

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.6667 8H3.33334" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 3.33334L3.33334 8.00001L8 12.6667" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HomeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M1.5 6L7.5 1L13.5 6V13H9.5V9H5.5V13H1.5V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
);

const PersonIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 13c0-3 2.5-4.5 5.5-4.5S13 10 13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const SirenIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M7.5 1v2M2.5 3.5l1.5 1.5M12.5 3.5l-1.5 1.5M1 9h13M3.5 9V6.5a4 4 0 0 1 8 0V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5.5 9v1a2 2 0 0 0 4 0V9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
);

const IdIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 6h4M8 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const EducationIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M7.5 2L14 5.5L7.5 9L1 5.5L7.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 7v3.5c0 1 1.5 2 3.5 2s3.5-1 3.5-2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const ProfileIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 7.5h5M7.5 5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const BankIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1.5" y="5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 7.5h12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 5L7.5 1.5L13.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
);

const SystemIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 13h5M7.5 11v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const DeclarationIcon = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="3" y="1" width="9" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.5 5h4M5.5 7.5h4M5.5 10h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const DoxLogo = ({ width = '69', fill = '#FFFFFF' }) => (
    <svg width={width} viewBox="0 0 339 95" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
        <g>
            <path
                d="M34.7666 3C46.7577 3 56.0143 9.02218 62.1338 17.5264C68.1563 25.896 71.2549 36.7461 71.541 47.3379C71.8268 57.9196 69.3202 68.899 63.3457 77.415C57.2191 86.1478 47.6047 92 34.7666 92H3C2.99991 91.9957 2.99999 85.9979 3 80H34.7666C43.4858 80 49.5193 76.2271 53.5215 70.5225C57.6757 64.601 59.779 56.3304 59.5449 47.6621C59.3111 39.0041 56.7596 30.604 52.3936 24.5361C48.1243 18.603 42.2529 15 34.7666 15H4.00195V3H34.7666ZM159.892 3C171.883 3 181.139 9.02218 187.259 17.5264C193.281 25.896 196.38 36.7461 196.666 47.3379C196.952 57.9196 194.445 68.899 188.471 77.415C182.344 86.1478 172.73 92 159.892 92H120.421C107.583 92 97.9684 86.1478 91.8418 77.415C85.8673 68.899 83.3607 57.9196 83.6465 47.3379C83.9326 36.7461 87.0312 25.896 93.0537 17.5264C99.1732 9.02218 108.43 3 120.421 3H159.892ZM241.704 3C253.695 3 262.952 9.02218 269.071 17.5264C270.345 19.2968 271.487 21.179 272.5 23.1455C273.513 21.179 274.655 19.2968 275.929 17.5264C282.048 9.02218 291.305 3 303.296 3H334.061V15H303.296C295.81 15 289.938 18.603 285.669 24.5361C281.303 30.604 278.751 39.0041 278.518 47.6621C278.283 56.3304 280.387 64.601 284.541 70.5225C288.543 76.2271 294.577 80 303.296 80H335.062C335.062 85.9979 335.063 91.9957 335.062 92H303.296C290.458 92 280.843 86.1478 274.717 77.415C273.915 76.2723 273.178 75.0839 272.5 73.8594C271.822 75.0839 271.085 76.2723 270.283 77.415C264.157 86.1478 254.542 92 241.704 92H209.938C209.937 91.9957 209.937 85.9979 209.938 80H241.704C250.423 80 256.457 76.2271 260.459 70.5225C264.613 64.601 266.717 56.3304 266.482 47.6621C266.249 39.0041 263.697 30.604 259.331 24.5361C255.062 18.603 249.19 15 241.704 15H210.939V3H241.704ZM120.421 15C112.935 15 107.063 18.603 102.794 24.5361C98.4279 30.604 95.8764 39.0041 95.6426 47.6621C95.4085 56.3304 97.5118 64.601 101.666 70.5225C105.668 76.2271 111.702 80 120.421 80H159.892C168.611 80 174.644 76.2271 178.646 70.5225C182.801 64.601 184.904 56.3304 184.67 47.6621C184.436 39.0041 181.885 30.604 177.519 24.5361C173.249 18.603 167.378 15 159.892 15H120.421Z"
                fill={fill}
            />
        </g>
    </svg>
);

export default Step8Declaration;