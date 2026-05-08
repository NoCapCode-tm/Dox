import { useNavigate } from 'react-router-dom'

const LegalAgreements = () => {
    const navigate = useNavigate()

    return (
        <div
            className="relative min-h-screen w-full font-[Jost] text-white"
            style={{ background: 'linear-gradient(119.18deg, #0A0E14 2.67%, #141C28 96.61%)' }}
        >
            {/* Top-Left Logo Square - No Padding */}
            <div className="absolute top-0 left-0 w-32 h-32 border border-white/20 rounded-lg flex flex-col items-center justify-center z-20">
                <DoxLogo />
                <p className="text-[10px] leading-[14px] text-white/50 mt-2">Employee Onboarding</p>
            </div>

            {/* Frame Lines Starting from Center of Logo Square */}
            {/* Top Border Line - starts from center right of logo square */}
            <div className="absolute left-32 right-0 h-px" style={{ top: '64px', background: 'rgba(173, 173, 173, 0.5)' }}></div>

            {/* Bottom Border Line */}
            <div className="absolute left-0 right-0 bottom-12 h-px" style={{ background: 'rgba(173, 173, 173, 0.5)' }}></div>

            {/* Left Border Line - starts from center bottom of logo square */}
            <div className="absolute top-32 bottom-0 w-px" style={{ left: '64px', background: 'rgba(173, 173, 173, 0.5)' }}></div>

            {/* Right Border Line */}
            <div className="absolute top-0 bottom-0 right-12 w-px" style={{ background: 'rgba(173, 173, 173, 0.5)' }}></div>

            {/* Corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/20 rounded-br-lg"></div>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-12" style={{ marginLeft: '80px', marginTop: '80px' }}>
                <div className="w-full max-w-[900px] p-8 md:p-12">
                    <h1 className="text-[32px] leading-tight font-normal text-white">Legal Agreements</h1>
                    <p className="mt-2 text-[16px] text-white/60">
                        Please review and sign the following documents to proceed with your onboarding.
                    </p>

                    {/* Agreement Cards */}
                    <div className="mt-10 space-y-6">
                        <AgreementCard
                            title="Offer Letter"
                            description="Your official employment offer letter containing role, compensation, and benefits details."
                            status="Signed"
                            signed
                            actionLabel="View Signed Document"
                            onAction={() => { }}
                            icon={<OfferIcon />}
                        />

                        <AgreementCard
                            title="Non-Disclosure Agreement (NDA)"
                            description="Confidentiality agreement protecting company information and intellectual property."
                            status="Pending"
                            actionLabel="Sign via SignWell"
                            onAction={() => { }}
                            icon={<NdaIcon />}
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-12 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/welcome')}
                            className="px-6 py-2.5 rounded-[8px] border border-white/20 text-[15px] font-medium text-white/80 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                        >
                            <BackArrowIcon />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2.5 rounded-[8px] border border-white/20 text-[15px] font-medium text-white/80 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                        >
                            Continue
                            <ForwardArrowIcon />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

const BackArrowIcon = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
        <path d="M9.8 2.2L4.8 7L9.8 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 7H14.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
)

const ForwardArrowIcon = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
        <path d="M6.2 2.2L11.2 7L6.2 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.8 7H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
)

const AgreementCard = ({ title, description, status, actionLabel, onAction, icon, signed = false }) => (
    <div
        className="relative rounded-[12px] p-6 border border-white/10"
        style={{
            background: 'rgba(255, 255, 255, 0.02)'
        }}
    >
        <div className="absolute top-6 right-6 px-3 py-1.5 rounded-[6px] text-[13px] font-medium leading-none inline-flex items-center gap-1.5" style={{
            background: signed ? 'rgba(6, 214, 160, 0.15)' : 'rgba(255,255,255,0.05)',
            color: signed ? '#06D6A0' : 'rgba(255,255,255,0.6)',
        }}>
            {signed ? <StatusSignedIcon /> : <StatusPendingIcon />}
            {status}
        </div>

        <div className="flex items-start gap-4 pr-28">
            <div className="w-12 h-12 rounded-[10px] bg-white/[0.04] border border-white/[0.05] flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="pt-0.5">
                <h3 className="text-[20px] font-medium text-white/90 leading-none">{title}</h3>
                <p className="mt-2 text-[15px] text-white/50 leading-relaxed">{description}</p>

                <button
                    type="button"
                    onClick={onAction}
                    className="mt-5 px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors inline-flex items-center gap-2"
                    style={{
                        background: signed ? 'rgba(255,255,255,0.08)' : 'transparent',
                        border: signed ? '1px solid transparent' : '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.9)'
                    }}
                >
                    {signed ? <ButtonCheckIcon /> : <ButtonSignwellIcon />}
                    {actionLabel}
                </button>
            </div>
        </div>
    </div>
)

const StatusSignedIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.9 6.2L5.2 7.4L8.1 4.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const StatusPendingIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
)

const ButtonCheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M5.5 9L8 11.4L12.5 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
)

const ButtonSignwellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M13.2 3.0H17.2V7.0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.2 3.0L8.6 11.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="6.1" width="9.9" height="9.9" rx="2.1" stroke="currentColor" strokeWidth="1.9" />
    </svg>
)

const DoxLogo = () => (
    <svg width="69" height="19" viewBox="0 0 75 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
        <g transform="translate(0 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(17 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(27 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(45 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(56 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
    </svg>
)

const OfferIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-6z" stroke="#06D6A0" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 3v6h6" stroke="#06D6A0" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 13h8M8 17h5" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const NdaIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="#BFD1FF" strokeWidth="2" />
        <path d="M8 7h8M8 11h8M8 15h5" stroke="#BFD1FF" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export default LegalAgreements
