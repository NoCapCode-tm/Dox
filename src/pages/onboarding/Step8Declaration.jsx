import { useNavigate } from 'react-router-dom';
import { useOnboardingContext } from '../../context/OnboardingContext';

/**
 * Step8Declaration
 * Onboarding Step 8 of 8 — Declaration & Agreement
 * Sections:
 *   1. Application Summary 
 *   2. Declaration 
 *   3. Digital Confirmation 
 *   4. Compliance
 */
const Step8Declaration = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useOnboardingContext();
    const step8 = formData.step8;
    const step1 = formData.step1;
    const step2 = formData.step2;
    const step3 = formData.step3;
    const step4 = formData.step4;
    const step5 = formData.step5;
    const step6 = formData.step6;
    const step7 = formData.step7;

    const handleSubmit = () => {
        if (!step8.agreed) return;
        if (!step8.completionStartedAt) {
            updateFormData('step8', 'completionStartedAt', Date.now());
        }
        navigate('/completion');
    };

    return (
        <div
            className="relative min-h-screen w-full overflow-x-hidden flex flex-col font-[Jost] text-white"
            style={{
                background: 'linear-gradient(121.47deg, #0A0E14 49.53%, #161F2C 104.45%)',
            }}
        >
            {/* Grid lines */}
            <div
                className="absolute inset-0 pointer-events-none select-none z-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '115px 115px',
                }}
            />

            {/* Header */}
            <div className="w-full px-[35px] pt-[35px] pb-0 flex flex-col relative z-10">
                <DoxLogo width="69" />
                <span className="text-[12px] text-white/65 leading-[20px] mt-[6px] font-normal tracking-wide">
                    Employee Onboarding
                </span>
            </div>

            {/* Step Navbar */}
            <div className="w-full px-4 md:px-[64px] mt-[24px] relative z-10">
                <nav
                    className="w-full max-w-[1312px] mx-auto h-[81px] rounded-[10px] flex items-center px-[16px] overflow-x-auto"
                    style={{
                        backgroundColor: '#0A0E14',
                        border: '0.8px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <div className="flex items-center justify-between w-full">
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
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-[111px] pt-[48px] pb-[80px] relative z-10">

                {/* Step label */}
                <p
                    className="font-[Jost] font-medium leading-[20px] mb-[30px]"
                    style={{ fontSize: '48px', color: '#314460' }}
                >
                    Step 8 of 8
                </p>

                {/* Heading + subtitle */}
                <div className="flex flex-col gap-0 mb-[32px]">
                    <h1 className="font-[Jost] font-extralight text-[24px] leading-[40px] text-white">
                        Declaration & Agreement
                    </h1>
                    <p className="text-[16px] leading-[24px] font-normal" style={{ color: '#99A1AF' }}>
                        This section confirms authenticity and compliance with company policies.
                    </p>
                </div>

                {/* Application Summary */}
                <h2 className="font-[Jost] font-extralight text-[24px] leading-[32px] text-white mb-[24px]">
                    Application Summary
                </h2>

                <div className="flex flex-col gap-[24px] mb-[40px]">
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
                <div
                    className="w-full rounded-[14px] p-[24px] mb-[32px]"
                    style={{
                        backgroundColor: 'rgba(10,14,20,0.65)',
                        border: '0.8px solid rgba(255,255,255,0.18)',
                        boxShadow: '0 0 26px rgba(0,0,0,0.35)',
                    }}
                >
                    <h2 className="font-[Jost] font-extralight text-[24px] leading-[32px] text-white mb-[16px]">
                        Declaration
                    </h2>

                    {/* Employee Declaration */}
                    <div
                        className="w-full rounded-[10px] px-[32px] py-[32px] mb-[32px]"
                        style={{
                            backgroundColor: 'rgba(59,130,246,0.05)',
                            border: '0.8px solid rgba(59,130,246,0.2)',
                        }}
                    >
                        <h3 className="font-[Jost] font-medium text-[18px] leading-[28px] text-white mb-[12px]">
                            Employee Declaration
                        </h3>
                        <p className="font-[Jost] font-normal text-[18px] leading-[29px]" style={{ color: '#D1D5DC' }}>
                            I confirm that the information provided above is accurate and complete.{'\n'}
                            I agree to comply with NoCapCode policies and the internal handbook.{'\n'}
                            I acknowledge the confidentiality and data protection obligations.{'\n'}
                            I understand that any misrepresentation may result in termination.
                        </p>
                    </div>

                    {/* Digital Confirmation */}
                    <h3 className="font-[Jost] font-medium text-[18px] leading-[28px] text-white mb-[24px]">
                        Digital Confirmation
                    </h3>

                    <div
                        className="w-full rounded-[10px] px-[40px] py-[44px] mb-[32px]"
                        style={{
                            backgroundColor: 'rgba(10,14,20,0.6)',
                            border: '0.8px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[230px] gap-y-[24px]">

                            {/* Digital Signature — with Click button */}
                            <div className="flex flex-col gap-[12px]">
                                <label className="flex items-center gap-[4px]">
                                    <span className="font-[Jost] font-bold text-[18px] leading-[20px]" style={{ color: '#D1D5DC' }}>
                                        Digital Signature
                                    </span>
                                    <span style={{ color: '#FF6467' }} className="text-[14px]">*</span>
                                </label>
                                <div
                                    className="w-full h-[53px] rounded-[10px] px-[10px] flex items-center gap-[12px]"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '0.8px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => updateFormData('step8', 'signature', 'signed')}
                                        className="h-[40px] px-[20px] rounded-[10px] shrink-0 font-[Jost] font-medium text-[16px] text-white"
                                        style={{
                                            backgroundColor: '#314460',
                                            boxShadow:
                                                '1px 1px 2px rgba(64,88,125,0.3), -1px -1px 2px rgba(34,48,67,0.5), inset -5px 5px 10px rgba(34,48,67,0.2), inset 5px -5px 10px rgba(34,48,67,0.2), inset -5px -5px 10px rgba(64,88,125,0.9), inset 5px 5px 13px rgba(34,48,67,0.9)',
                                        }}
                                    >
                                        {step8.signature ? '✓ Signed' : 'Click'}
                                    </button>
                                    {step8.signature && (
                                        <span className="text-[14px] font-[Jost]" style={{ color: '#99A1AF' }}>Signature captured</span>
                                    )}
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="flex flex-col gap-[12px]">
                                <label className="flex items-center gap-[4px]">
                                    <span className="font-[Jost] font-bold text-[18px] leading-[20px]" style={{ color: '#D1D5DC' }}>
                                        Full Name
                                    </span>
                                    <span style={{ color: '#FF6467' }} className="text-[14px]">*</span>
                                </label>
                                <input
                                    value={step8.fullName}
                                    onChange={(e) => updateFormData('step8', 'fullName', e.target.value)}
                                    placeholder="Enter full name as per ID"
                                    className="w-full h-[53px] rounded-[10px] px-[20px] outline-none font-[Jost] text-[16px] caret-white"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '0.8px solid rgba(255,255,255,0.1)',
                                        color: step8.fullName ? '#FFFFFF' : '#6A7282',
                                    }}
                                />
                            </div>

                            {/* Date of Submission */}
                            <div className="flex flex-col gap-[12px]">
                                <label className="flex items-center gap-[4px]">
                                    <span className="font-[Jost] font-bold text-[18px] leading-[20px]" style={{ color: '#D1D5DC' }}>
                                        Date of Submission
                                    </span>
                                    <span style={{ color: '#FF6467' }} className="text-[14px]">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={step8.dateOfSubmission}
                                    onChange={(e) => updateFormData('step8', 'dateOfSubmission', e.target.value)}
                                    className="w-full h-[53px] rounded-[10px] px-[20px] outline-none font-[Jost] text-[16px] caret-white"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '0.8px solid rgba(255,255,255,0.1)',
                                        color: step8.dateOfSubmission ? '#FFFFFF' : '#6A7282',
                                        colorScheme: 'dark',
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Compliance blue card */}
                    <div
                        className="w-full rounded-[10px] px-[32px] py-[32px] mb-[32px]"
                        style={{
                            backgroundColor: 'rgba(59,130,246,0.05)',
                            border: '0.8px solid rgba(59,130,246,0.2)',
                        }}
                    >
                        <p className="font-[Outfit] font-normal text-[18px] leading-[29px]" style={{ color: '#D1D5DC' }}>
                            I confirm that the information provided above is accurate and belongs to me, and I understand that this information will be used for preparing my Offer Letter, NDA/IP Agreement, and internal onboarding records.
                        </p>
                    </div>

                    {/* I agree checkbox */}
                    <label className="flex items-center gap-[16px] cursor-pointer mb-[40px]">
                        <div
                            className="w-[24px] h-[24px] rounded-[8px] flex items-center justify-center shrink-0"
                            style={{
                                backgroundColor: step8.agreed ? '#314460' : 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                            onClick={() => updateFormData('step8', 'agreed', !step8.agreed)}
                        >
                            {step8.agreed && (
                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                                    <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <span className="font-[Jost] font-normal text-[16px] leading-[24px] text-white">
                            I agree
                        </span>
                        <span className="font-[Jost] font-normal text-[16px] leading-[24px]" style={{ color: '#FF6467' }}>*</span>
                    </label>

                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/step7')}
                        className="h-[40px] px-[20px] rounded-[10px] flex items-center gap-[8px] transition-opacity hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                    >
                        <ArrowLeftIcon />
                        <span className="text-[16px] font-normal text-white leading-[24px]">Previous</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!step8.agreed}
                        className="h-[40px] px-[24px] rounded-[10px] flex items-center gap-[8px] transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: '#314460',
                            boxShadow:
                                '1px 1px 2px rgba(64,88,125,0.3), -1px -1px 2px rgba(34,48,67,0.5), inset -5px 5px 10px rgba(34,48,67,0.2), inset 5px -5px 10px rgba(34,48,67,0.2), inset -5px -5px 10px rgba(64,88,125,0.9), inset 5px 5px 13px rgba(34,48,67,0.9)',
                        }}
                    >
                        <span className="text-[16px] font-medium text-white leading-[24px]">Next</span>
                        <ArrowRightIcon />
                    </button>
                </div>

            </main>
        </div>
    );
};

/* ── ReviewSection ── */

/**
 * ReviewSection 
 * @param {string} title
 * @param {React.ReactNode} icon
 * @param {function} onEdit
 * @param {{ label: string, value: string }[]} items
 */
const ReviewSection = ({ title, icon, onEdit, items }) => (
    <div
        className="w-full rounded-[14px] px-[24px] py-0"
        style={{
            backgroundColor: 'rgba(10,14,20,0.75)',
            border: '0.8px solid rgba(255,255,255,0.1)',
        }}
    >
        {/* Header row */}
        <div
            className="flex items-center justify-between py-[12px]"
            style={{ borderBottom: '0.8px solid rgba(255,255,255,0.1)' }}
        >
            <div className="flex items-center gap-[12px]">
                <div
                    className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(49,68,96,0.2)' }}
                >
                    <span style={{ color: '#314460' }}>{icon}</span>
                </div>
                <span className="font-[Jost] font-medium text-[18px] leading-[28px] text-white">
                    {title}
                </span>
            </div>
            <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-[4px] font-[Jost] font-normal text-[14px] leading-[20px] hover:opacity-80"
                style={{ color: '#314460' }}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 13h12M9.5 1.5l3 3L4 13H1v-3L9.5 1.5Z" stroke="#314460" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Edit
            </button>
        </div>

        {/* Key-value rows */}
        <div className="flex flex-col gap-[12px] py-[16px]">
            {items.map((item, i) => (
                <div key={i} className="flex items-start justify-between">
                    <span className="font-[Jost] font-normal text-[14px] leading-[20px]" style={{ color: '#99A1AF' }}>
                        {item.label}
                    </span>
                    <span className="font-[Jost] font-normal text-[14px] leading-[20px] text-white text-right ml-[24px]">
                        {item.value}
                    </span>
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
            className="flex items-center gap-[8px] px-[16px] py-[10px] rounded-[10px] cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: active ? '#314460' : 'transparent' }}
        >
            <span style={{ color: active ? '#51A2FF' : 'rgba(255,255,255,0.65)' }}>{icon}</span>
            <span
                className="font-[Jost] font-normal text-[15px] leading-[20px]"
                style={{ color: active ? '#51A2FF' : 'rgba(255,255,255,0.65)' }}
            >
                {label}
            </span>
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

export default Step8Declaration;