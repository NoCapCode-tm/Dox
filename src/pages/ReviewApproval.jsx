import { useNavigate } from 'react-router-dom'

const ReviewApproval = () => {
    const navigate = useNavigate()

    const steps = [
        {
            title: 'Legal Agreements',
            desc: 'Offer Letter & NDA signed',
        },
        {
            title: 'Company Documentation',
            desc: 'All mandatory documents read',
        },
        {
            title: 'Bank & KYC Details',
            desc: 'Banking and identity information submitted',
        },
    ]

    return (
        <div className="relative min-h-screen w-full overflow-hidden font-[Jost] text-white" style={{ background: '#000' }}>
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-0 left-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #0A1F56 0deg, #00184D 219.41deg, #0A1F56 309.85deg, #0D2460 360deg)',
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #0A1F56 0deg, #00184D 219.41deg, #0A1F56 309.85deg, #0D2460 360deg)',
                        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                    }}
                />
            </div>

            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'url(/dox-bg.png), linear-gradient(180deg, #000000 14.42%, rgba(74, 131, 214, 0.6) 43.27%, #000000 100%)',
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    mixBlendMode: 'multiply',
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 md:px-8 py-8 md:py-10">
                <div
                    className="relative overflow-hidden rounded-[12px] border border-white/8"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(153, 153, 153, 0.02) 100%)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] min-h-[760px]">
                        <aside className="relative p-4 md:p-3">
                            <div className="hidden md:flex absolute right-0 top-[18px] bottom-[18px] pointer-events-none items-stretch">
                                <VerticalDivider />
                            </div>
                            <DoxLogo />
                            <p className="mt-1 text-[11px] leading-[16px] text-white/65">Employee Onboarding</p>
                            <div className="my-5 pr-6">
                                <HorizontalDivider />
                            </div>

                            <div className="flex md:flex-col gap-3 md:gap-8">
                                <StepBox number="1" active />
                                <StepBox number="2" />
                                <StepBox number="3" completed />
                            </div>
                        </aside>

                        <section className="relative p-5 md:p-8 lg:p-10">
                            <div className="relative z-10">
                                <h1 className="text-[28px] leading-[34px] font-normal">Review &amp; Approval</h1>
                                <p className="mt-1 max-w-[820px] text-[16px] leading-[24px] text-white/70">
                                    Your onboarding submission is being reviewed by the HR team.
                                </p>

                                <div className="mt-10 space-y-8">
                                    <InfoCard
                                        title="Under HR Review"
                                        description="Your onboarding details are currently being verified by our HR team."
                                        secondary="Expected completion: Within 48 hours"
                                        icon={<ClockIcon />}
                                        iconClassName="h-10 w-10 rounded-[10px]"
                                        tone="primary"
                                    />

                                    <InfoCard
                                        title="Completed Steps"
                                        contentClassName="pl-4 md:pl-10"
                                        description={
                                            <div className="mt-5 flex flex-col gap-4">
                                                {steps.map((step, index) => (
                                                    <CompletedStep key={index} title={step.title} desc={step.desc} />
                                                ))}
                                            </div>
                                        }
                                        tone="secondary"
                                    />

                                    <InfoCard
                                        title="HR Comments"
                                        description={
                                            <div className="mt-4 rounded-[10px] bg-white/10 px-4 py-3 text-center">
                                                <p className="text-[15px] leading-[22px] italic text-white/85 md:text-[16px] md:leading-[24px]">
                                                    No comments yet. HR will add notes here if any clarifications are needed.
                                                </p>
                                            </div>
                                        }
                                        tone="secondary"
                                    />
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/welcome')}
                                        className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 px-7 py-2.5 text-[16px] leading-[22px] text-white/90 transition-colors hover:bg-white/5"
                                    >
                                        <BackArrowIcon />
                                        Back
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

const StepBox = ({ number, active = false, completed = false }) => (
    <div
        className="flex h-[56px] w-[56px] items-center justify-center rounded-[10px] text-[34px] leading-none text-white"
        style={{ background: completed ? 'rgba(255,255,255,0.18)' : active ? 'rgba(255,255,255,0.16)' : 'rgba(75, 96, 137, 0.35)' }}
    >
        {number}
    </div>
)

const CompletedStep = ({ title, desc }) => (
    <div className="flex items-start gap-4">
        <div className="mt-[2px] h-[24px] w-[24px] shrink-0 text-[#00A63E]">
            <CheckIcon />
        </div>
        <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-white">{title}</h3>
            <p className="text-[14px] leading-[20px] font-normal text-white/65">{desc}</p>
        </div>
    </div>
)

const InfoCard = ({ title, description, secondary, icon, iconClassName = 'h-10 w-10 rounded-[10px]', contentClassName = '', tone = 'secondary' }) => (
    <div
        className="relative rounded-[10px] border border-white/8 p-4 md:p-6"
        style={{
            background: tone === 'primary' ? 'rgba(46, 109, 194, 0.2)' : 'rgba(46, 109, 194, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
        }}
    >
        <div className={`flex items-start ${icon ? 'gap-3 md:gap-4' : 'gap-0'}`}>
            {icon ? (
                <div className={`flex shrink-0 items-center justify-center bg-white/15 text-white ${iconClassName}`}>
                    {icon}
                </div>
            ) : null}
            <div className={`min-w-0 flex-1 ${contentClassName}`}>
                <h2 className="text-[22px] leading-[28px] font-normal text-white md:text-[24px] md:leading-[32px]">{title}</h2>
                {typeof description === 'string' ? (
                    <p className="mt-2 max-w-[760px] text-[16px] leading-[24px] text-white/70">{description}</p>
                ) : (
                    description
                )}
                {secondary ? <p className="mt-2 text-[15px] leading-[22px] text-white/70 md:text-[16px] md:leading-[24px]">{secondary}</p> : null}
            </div>
        </div>
    </div>
)

const VerticalDivider = () => (
    <svg width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
        <g transform="translate(0 0)"><path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" /></g>
        <g transform="translate(17 0)"><path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" /></g>
        <g transform="translate(27 0)"><path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" /></g>
        <g transform="translate(45 0)"><path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" /></g>
        <g transform="translate(56 0)"><path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" /></g>
    </svg>
)

const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="13.5" stroke="#00A63E" strokeWidth="3" />
        <path d="M24 16.5V24.5L29.5 28" stroke="#00A63E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const ChecklistIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9.5 7.5h8" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.5 12h8" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.5 16.5h8" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
        <path d="M5.5 7.5l1 1 1.7-1.8" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 12l1 1 1.7-1.8" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 16.5l1 1 1.7-1.8" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const CommentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5h14v8.2c0 .8-.7 1.5-1.5 1.5H10l-4.6 3.1v-3.1H6.5C5.7 16.2 5 15.5 5 14.7V6.5Z" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.5 10h7" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.5 13h4.5" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
)

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12.5l2.6 2.6L16 9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const BackArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M9.333 3.333L4.667 8l4.666 4.667" stroke="rgba(255,255,255,0.7)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.667 8H4.667" stroke="rgba(255,255,255,0.7)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default ReviewApproval
