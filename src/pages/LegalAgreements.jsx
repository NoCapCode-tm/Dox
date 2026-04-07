import { useNavigate } from 'react-router-dom'

const LegalAgreements = () => {
    const navigate = useNavigate()

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden font-[Jost] text-white"
            style={{ background: '#000' }}
        >
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-0 left-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #0A1F56 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #0A1F56 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                    }}
                />
            </div>

            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        'url(/dox-bg.png), linear-gradient(180deg, #000000 14.42%, rgba(74, 131, 214, 0.6) 43.27%, #000000 100%)',
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    mixBlendMode: 'multiply',
                }}
            />

            <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-8 py-8 md:py-10">
                <div
                    className="rounded-[12px] border border-white/8 overflow-hidden"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(10, 15, 26, 0.84) 0%, rgba(8, 12, 20, 0.8) 100%)',
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] min-h-[760px]">
                        <aside className="relative p-4 md:p-3">
                            <div className="hidden md:flex absolute right-0 top-[18px] bottom-[18px] pointer-events-none items-stretch">
                                <VerticalDivider />
                            </div>
                            <DoxLogo />
                            <p className="text-[11px] leading-[16px] text-white/65 mt-1">Employee Onboarding</p>
                            <div className="my-5 pr-6">
                                <HorizontalDivider />
                            </div>

                            <div className="flex md:flex-col gap-3 md:gap-8">
                                <StepBadge number="1" active />
                                <StepBadge number="2" />
                                <StepBadge number="3" />
                            </div>
                        </aside>

                        <section className="relative p-5 md:p-8 lg:p-10">
                            <div className="pointer-events-none absolute inset-0" style={{
                                background: 'radial-gradient(60% 36% at 50% 40%, rgba(78, 138, 235, 0.45) 0%, rgba(78, 138, 235, 0.2) 45%, rgba(78, 138, 235, 0) 100%)',
                                mixBlendMode: 'screen',
                            }} />

                            <div className="relative z-10">
                                <h1 className="text-[28px] leading-[34px] font-normal">Legal Agreements</h1>
                                <p className="mt-1 text-white/70 text-[16px] leading-[24px] max-w-[820px]">
                                    Please review and sign the following documents to proceed with your onboarding.
                                </p>

                                <div className="mt-10 space-y-8">
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

                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/welcome')}
                                        className="px-7 py-2.5 rounded-[10px] border border-white/50 text-[16px] leading-[22px] text-white/90 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                                    >
                                        <BackArrowIcon />
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/dashboard')}
                                        className="px-7 py-2.5 rounded-[10px] border border-white/40 text-[16px] leading-[22px] text-white/90 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                                    >
                                        Continue
                                        <ForwardArrowIcon />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StepBadge = ({ number, active = false }) => (
    <div
        className="w-[56px] h-[56px] rounded-[10px] flex items-center justify-center text-[34px] leading-none"
        style={{
            background: active ? 'rgba(255,255,255,0.18)' : 'rgba(75, 96, 137, 0.35)',
            color: '#ffffff',
        }}
    >
        {number}
    </div>
)

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
        className="relative rounded-[12px] p-4 md:p-6 border border-white/8"
        style={{ background: 'linear-gradient(180deg, rgba(45, 76, 137, 0.72) 0%, rgba(15, 37, 78, 0.72) 100%)' }}
    >
        <div className="absolute top-4 right-4 px-2 py-0.5 rounded-[6px] text-[12px] leading-[16px] inline-flex items-center gap-1" style={{
            background: signed ? 'rgba(6, 214, 160, 0.2)' : 'rgba(255,255,255,0.16)',
            color: signed ? '#06D6A0' : 'rgba(255,255,255,0.85)',
        }}>
            {signed ? <StatusSignedIcon /> : <StatusPendingIcon />}
            {status}
        </div>

        <div className="flex items-start gap-3 pr-20">
            <div className="w-10 h-10 rounded-[10px] bg-white/16 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="text-[35, 40, 46, 1] text-[24px] leading-[32px] font-normal text-white">{title}</h3>
                <p className="mt-2 text-[16px] leading-[24px] text-white/70 max-w-[760px]">{description}</p>
            </div>
        </div>

        <button
            type="button"
            onClick={onAction}
            className="mt-6 px-4 py-2.5 rounded-[10px] border border-white/50 text-[16px] leading-[22px] text-white/90 hover:bg-white/6 transition-colors inline-flex items-center gap-2"
            style={{ background: signed ? 'rgba(92, 141, 231, 0.4)' : 'transparent' }}
        >
            {signed ? <ButtonCheckIcon /> : <ButtonSignwellIcon />}
            {actionLabel}
        </button>
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

const VerticalDivider = () => (
    <svg className="h-full w-auto" width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
        <path d="M1 1L1 795.024" stroke="white" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const HorizontalDivider = () => (
    <svg width="118" height="2" viewBox="0 0 150 2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1H148.5" stroke="white" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round" />
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
