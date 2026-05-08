import { useNavigate } from 'react-router-dom'

const LegalAgreements = () => {
    const navigate = useNavigate()

    return (
        <div
            className="relative h-screen w-screen overflow-auto font-[Jost] text-white"
            style={{ background: 'linear-gradient(119.18deg, #0A0E14 2.67%, #141C28 96.61%)' }}
        >
            {/* Sidebar */}
            {/* DOX logo square fixed to top-left */}
            <div className="absolute top-0 left-0 z-50">
                <div
                    className="w-32 h-32 flex flex-col items-center justify-center"
                    style={{
                        background: '#0A0E14',
                        borderRight: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderBottom: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderRadius: '0px 0px 10px 0px',
                    }}
                >
                    <DoxLogo />
                    <p className="text-[10px] leading-[14px] text-white/50 mt-2">Employee Onboarding</p>
                </div>
            </div>

            {/* Sidebar (steps only) - no right border to avoid extra line */}
            <aside className="fixed left-0 top-0 h-full w-[120px] md:w-[140px] z-30 flex flex-col bg-transparent pt-36">
                <div className="flex-1 flex flex-col items-center justify-start mt-4 gap-4 px-4">
                    <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[16px] bg-white/10 text-white font-medium">1</div>
                    <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[16px] bg-white/5 text-white/60 font-medium">2</div>
                    <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[16px] bg-white/5 text-white/60 font-medium">3</div>
                </div>
            </aside>

            {/* Framed container starting from center of logo square */}
            {/* Use margins so frame participates in document flow and its bottom is visible */}
            <div className="relative" style={{ marginLeft: 64, marginTop: 64, marginRight: 24, marginBottom: 48, zIndex: 20 }}>
                <div className="w-full border border-white/10 rounded-[10px] relative">
                    {/* Main Content */}
                    {/* Frame grows with content; page scrolls when needed */}
                    <main className="w-full flex flex-col items-start justify-center">
                        <div className="w-full max-w-[900px] p-8 md:p-12 mt-8">
                            <h1 className="text-[32px] leading-tight font-normal text-white">Legal Agreements</h1>
                            <p className="mt-2 text-[16px] text-white/60">
                                Please review and sign the following documents to proceed with your onboarding.
                            </p>

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
            </div>
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
