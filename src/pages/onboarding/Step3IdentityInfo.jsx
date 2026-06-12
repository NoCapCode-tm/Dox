import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { showMissingRequiredFieldsToast } from '../../utils/requiredFieldToast';
import { useOnboardingContext } from '../../context/OnboardingContext';
import { saveStep3IdentityInfo, getCurrentUser } from '../../api/employeeApi';
import Loader from '../../components/ui/Loader';

// Import your standard CSS
import './css/Step3IdentityInfo.css';

const REQUIRED_STEP3_FIELDS = [
  { key: 'govid1', label: 'Government-issued ID Number' },
  { key: 'govid1image', label: 'Upload Government-issued ID' },
  { key: 'passportimage', label: 'Passport-size Photograph' },
];

/**
 * Step3IdentityInfo
 */
const Step3IdentityInfo = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useOnboardingContext();
  const form = formData.step3;
  const [isSavingStep, setIsSavingStep] = useState(false);
  const [stepError, setStepError] = useState('');

  /** Prefill form data from database on component mount */
  useEffect(() => {
    const prefillFormData = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData?.message) {
          const data = userData.message;
          const serverGovId = data.documents?.govid1?.number != null ? String(data.documents.govid1.number) : '';
          const serverSecondaryId = data.documents?.govid2?.number != null ? String(data.documents.govid2.number) : '';

          // Preserve values already present in context when navigating back.
          updateFormData('step3', 'govid1', form.govid1 || serverGovId);
          updateFormData('step3', 'govid2', form.govid2 || serverSecondaryId);
        }
      } catch (error) {
        console.warn('Could not prefill Step 3 data:', error?.message);
      }
    };
    prefillFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Update a text field */
  const handleChange = (field, value) => {
    updateFormData('step3', field, value);
  };

  /** Update a file field */
  const handleFile = (field, file) => {
    updateFormData('step3', field, file);
  };

  const handleNext = async () => {
    if (showMissingRequiredFieldsToast(form, REQUIRED_STEP3_FIELDS).length > 0) {
      return;
    }

    try {
      setIsSavingStep(true);
      setStepError('');
      await saveStep3IdentityInfo(form);
      toast.success('Step 3 filled');
      navigate('/onboarding/step4');
    } catch (error) {
      setStepError(error?.message || 'Unable to save Step 3. Please try again.');
    } finally {
      setIsSavingStep(false);
    }
  };

  return (
    <div className="step3-wrapper">
      {isSavingStep && <Loader fullScreen={true} message="Saving and loading next step..." />}
      
      {/* Grid lines */}
      <div className="step3-grid-lines" />

      {/* Header */}
      <div className="step3-header">
        <DoxLogo width="69" />
        <span>Employee Onboarding</span>
      </div>

      {/* Step Navbar */}
      <div className="step3-nav-container">
        <nav className="step3-nav">
          <div className="step3-nav-inner">
            <NavItem label="Home" icon={<HomeIcon />} />
            <NavItem label="Personal Info" icon={<PersonIcon />} />
            <NavItem label="Emergency Info" icon={<SirenIcon />} />
            <NavItem label="Identity" icon={<IdIcon />} active />
            <NavItem label="Education" icon={<EducationIcon />} />
            <NavItem label="Profile" icon={<ProfileIcon />} />
            <NavItem label="Bank Details" icon={<BankIcon />} />
            <NavItem label="System Info" icon={<SystemIcon />} />
            <NavItem label="Declaration" icon={<DeclarationIcon />} />
          </div>
        </nav>
      </div>

      {/* Page Content */}
      <main className="step3-main">

        {/* Step label */}
        <p className="step3-step-label">Step 3 of 8</p>

        {/* Heading + subtitle */}
        <div className="step3-heading-container">
          <h1 className="step3-h1">Identity Information</h1>
          <p className="step3-subtitle">
            Upload your identity details for verification and official documentation.
          </p>
        </div>

        {/* Form Card */}
        <div className="step3-form-card">
          <div className="step3-form-grid">

            {/* Row 1 */}
            <FormField label="Government-issued ID Number" required>
              <TextInput
                value={form.govid1}
                onChange={(v) => handleChange('govid1', v)}
                placeholder="e.g. ABCDE1234F (PAN) or 1234 5678 9012 (Aadhaar)"
              />
            </FormField>

            <FormField label="Upload Government-issued ID ( JPG/PNG )" required>
              <FileInput
                file={form.govid1image}
                onChange={(f) => handleFile('govid1image', f)}
              />
            </FormField>

            {/* Row 2 */}
            <FormField label="Secondary Government-issued ID Number" ifAvailable>
              <TextInput
                value={form.govid2}
                onChange={(v) => handleChange('govid2', v)}
                placeholder="e.g. MH04 20110012345 (Driving License)"
              />
            </FormField>

            <FormField label="Upload Secondary ID ( JPG/PNG )" ifAvailable>
              <FileInput
                file={form.govid2image}
                onChange={(f) => handleFile('govid2image', f)}
              />
            </FormField>

            {/* Row 3 */}
            <FormField label="Passport-size Photograph ( JPG/PNG )" required>
              <FileInput
                file={form.passportimage}
                onChange={(f) => handleFile('passportimage', f)}
              />
            </FormField>

            <FormField label="Student/University ID Card ( JPG/PNG )" ifStudent>
              <FileInput
                file={form.studentIdFile}
                onChange={(f) => handleFile('studentIdFile', f)}
              />
            </FormField>

          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="step3-button-container">
          <button
            type="button"
            onClick={() => navigate('/onboarding/step2')}
            className="step3-prev-btn"
          >
            <ArrowLeftIcon />
            <span className="step3-btn-text">Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSavingStep}
            className="step3-next-btn"
          >
            <span className="step3-btn-text">
              <span className="step3-btn-text-sm">{isSavingStep ? 'Saving...' : 'Next'}</span>
              <span className="step3-btn-text-lg">{isSavingStep ? 'Saving Step 3...' : 'Next: Education Details'}</span>
            </span>
            <ArrowRightIcon />
          </button>
        </div>

        {stepError && <p className="step3-error-text">{stepError}</p>}

      </main>
    </div>
  );
};

/* Sub-components */

const FormField = ({ label, required, ifAvailable, ifStudent, children }) => (
  <div className="step3-form-field">
    <label className="step3-field-label-container">
      <span className="step3-field-label">{label}</span>
      {required && <span className="step3-field-asterisk">*</span>}
      {ifAvailable && <span className="step3-field-hint">(If Available)</span>}
      {ifStudent && <span className="step3-field-hint">(If Student)</span>}
    </label>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="step3-input"
  />
);

const FileInput = ({ file, onChange }) => {
  return (
    <div className="step3-file-container">
      <label className="step3-file-label">
        <div className="step3-file-btn">
          <span className="step3-file-btn-text">Choose file</span>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png"
          className="step3-hidden-input"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>
      {file ? (
        <span className="step3-file-name">{file.name}</span>
      ) : (
        <span className="step3-file-empty">No file chosen</span>
      )}
    </div>
  );
};

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
      className={`step3-nav-item ${active ? 'active' : ''}`}
    >
      <span className="step3-nav-icon">{icon}</span>
      <span className="step3-nav-label">{label}</span>
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

const PersonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 13c0-3 2.5-4.5 5.5-4.5S13 10 13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SirenIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M7.5 1v2M2.5 3.5l1.5 1.5M12.5 3.5l-1.5 1.5M1 9h13M3.5 9V6.5a4 4 0 0 1 8 0V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M5.5 9v1a2 2 0 0 0 4 0V9" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IdIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 6h4M8 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const EducationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M7.5 2L14 5.5L7.5 9L1 5.5L7.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M4 7v3.5c0 1 1.5 2 3.5 2s3.5-1 3.5-2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5 7.5h5M7.5 5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const BankIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1.5" y="5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 7.5h12" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 5L7.5 1.5L13.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const SystemIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5 13h5M7.5 11v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const DeclarationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
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

export default Step3IdentityInfo;