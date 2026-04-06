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
        <div
            className="relative min-h-screen w-full overflow-hidden font-[Jost] text-white"
            style={{ background: 'linear-gradient(180deg, #050E1D 11.06%, #4A83D6 43%, #000000 100%)' }}
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
                    background:
                        'url(/dox-bg.png), linear-gradient(180deg, #000000 14.42%, rgba(74, 131, 214, 0.6) 43.27%, #000000 100%)',
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    mixBlendMode: 'multiply',
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1300px] px-3 sm:px-4 lg:px-4 py-4 sm:py-6 lg:py-[54px]">
                <div
                    className="relative rounded-[10px] p-4 sm:p-6 lg:p-0"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(153, 153, 153, 0) 100%)',
                    }}
                >
                    <div className="lg:hidden">
                        <div>
                            <DoxLogo />
                            <p className="mt-1 text-[12px] leading-[18px] text-white/65">Employee Onboarding</p>
                            <div className="mt-3 mb-4">
                                <HorizontalDivider />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <StepBox number="1" active />
                            <StepBox number="2" />
                            <StepBox number="3" completed />
                        </div>

                        <h1 className="text-[28px] sm:text-[32px] leading-[32px] sm:leading-[36px] font-normal text-white">Review &amp; Approval</h1>
                        <p className="mt-2 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[24px] font-normal text-white">
                            Your onboarding submission is being reviewed by the HR team.
                        </p>

                        <div className="mt-5 rounded-[10px] bg-[rgba(46,109,194,0.2)] p-4 sm:p-5">
                            <div className="h-[44px] w-[44px] rounded-[10px] bg-white/15 flex items-center justify-center">
                                <ReviewIcon />
                            </div>
                            <h2 className="mt-3 text-[22px] sm:text-[24px] leading-[24px] font-normal text-white">Under HR Review</h2>
                            <p className="mt-3 text-[15px] sm:text-[17px] leading-[22px] font-normal text-white/65">
                                Your onboarding details are currently being verified by our HR team.
                            </p>
                            <p className="mt-2 text-[15px] sm:text-[17px] leading-[20px] font-normal text-white/65">
                                Expected completion: Within 48 hours
                            </p>
                        </div>

                        <div className="mt-5 rounded-[10px] bg-[rgba(46,109,194,0.1)] p-4 sm:p-5">
                            <h2 className="text-[22px] sm:text-[24px] leading-[24px] font-normal text-white">Completed Steps</h2>
                            <div className="mt-5 flex flex-col gap-4">
                                {steps.map((step, index) => (
                                    <CompletedStep key={index} title={step.title} desc={step.desc} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 rounded-[10px] bg-[rgba(46,109,194,0.1)] p-4">
                            <p className="text-[16px] leading-[24px] font-normal text-white">HR Comments</p>
                            <div className="mt-3 h-[40px] rounded-[10px] bg-white/10 flex items-center justify-center px-4 text-center">
                                <p className="text-[13px] sm:text-[15px] leading-[18px] sm:leading-[22px] italic text-white">
                                    No comments yet. HR will add notes here if any clarifications are needed.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/welcome')}
                            className="mt-5 flex items-center gap-[8px] h-[40px] rounded-[10px] border border-white/70 px-[18px] text-[16px] leading-[24px] text-white/70 hover:bg-white/5 transition-colors"
                        >
                            <BackArrowIcon />
                            Back
                        </button>
                    </div>

                    <div className="hidden lg:block min-h-[880px]">
                        <div className="absolute inset-y-0 left-[188px] pointer-events-none">
                            <VerticalDivider />
                        </div>

                        <div className="absolute left-[40px] top-[40px]">
                            <DoxLogo />
                            <p className="mt-[6px] text-[12px] leading-[20px] text-white/65">Employee Onboarding</p>
                            <div className="mt-[12px]">
                                <HorizontalDivider />
                            </div>
                        </div>

                        <div className="absolute left-[56px] top-[170px] flex flex-col gap-[42px]">
                            <StepBox number="1" active />
                            <StepBox number="2" />
                            <StepBox number="3" completed />
                        </div>

                        <div className="absolute left-[229px] top-[64px] right-[40px]">
                            <h1 className="text-[36px] leading-[36px] font-normal text-white">Review &amp; Approval</h1>
                            <p className="mt-[8px] text-[24px] leading-[24px] font-normal text-white">
                                Your onboarding submission is being reviewed by the HR team.
                            </p>
                        </div>

                        <div className="absolute left-[229px] top-[173px] w-[1027px] h-[145px] rounded-[10px] bg-[rgba(46,109,194,0.2)]">
                            <div className="absolute left-[20px] top-[20px] h-[48px] w-[48px] rounded-[10px] bg-white/15 flex items-center justify-center">
                                <ReviewIcon />
                            </div>
                            <div className="absolute left-[83px] top-[32px]">
                                <h2 className="text-[24px] leading-[24px] font-normal text-white">Under HR Review</h2>
                                <p className="mt-[25px] text-[18px] leading-[24px] font-normal text-white/65 max-w-[710px]">
                                    Your onboarding details are currently being verified by our HR team.
                                </p>
                                <p className="mt-[4px] text-[18px] leading-[20px] font-normal text-white/65">
                                    Expected completion: Within 48 hours
                                </p>
                            </div>
                        </div>

                        <div className="absolute left-[229px] top-[347px] w-[1027px] h-[311px] rounded-[10px] bg-[rgba(46,109,194,0.1)]">
                            <div className="absolute left-[224px] top-[24px]">
                                <h2 className="text-[24px] leading-[24px] font-normal text-white">Completed Steps</h2>
                            </div>

                            <div className="absolute left-[40px] top-[67px] flex flex-col gap-[16px]">
                                {steps.map((step, index) => (
                                    <CompletedStep key={index} title={step.title} desc={step.desc} />
                                ))}
                            </div>
                        </div>

                        <div className="absolute left-[229px] top-[678px] w-[1027px] h-[105px] rounded-[10px] bg-[rgba(46,109,194,0.1)]">
                            <p className="absolute left-[15px] top-[15px] text-[16px] leading-[24px] font-normal text-white">HR Comments</p>
                            <div className="absolute left-[15px] right-[15px] top-[50px] h-[40px] rounded-[10px] bg-white/10 flex items-center justify-center px-4 text-center">
                                <p className="text-[16px] leading-[24px] italic text-white">
                                    No comments yet. HR will add notes here if any clarifications are needed.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/welcome')}
                            className="absolute left-[229px] top-[800px] flex items-center gap-[8px] h-[40px] rounded-[10px] border border-white/70 px-[18px] text-[16px] leading-[24px] text-white/70 hover:bg-white/5 transition-colors"
                        >
                            <BackArrowIcon />
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StepBox = ({ number, active = false, completed = false }) => (
    <div
        className="relative h-[68px] w-[68px] rounded-[10px]"
        style={{ background: completed ? 'rgba(255, 255, 255, 0.14)' : 'rgba(18, 42, 75, 0.2)' }}
    >
        <span className="absolute left-[24px] top-[21px] text-[40px] leading-[24px] font-normal text-white">{number}</span>
    </div>
)

const CompletedStep = ({ title, desc }) => (
    <div className="relative flex items-start gap-[16px]">
        <div className="mt-[2px] h-[24px] w-[24px] shrink-0 text-[#00A63E]">
            <CheckIcon />
        </div>
        <div>
            <h3 className="text-[18px] leading-[24px] font-normal text-white">{title}</h3>
            <p className="text-[14px] leading-[20px] font-normal text-white/65">{desc}</p>
        </div>
    </div>
)

const VerticalDivider = () => (
    <svg width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1L1 795.024" stroke="white" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const HorizontalDivider = () => (
    <svg width="147.5" height="2" viewBox="0 0 150 2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

const ReviewIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3a9 9 0 1 1-9 9" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 3v6h6" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
