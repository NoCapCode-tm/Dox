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
            className="relative h-screen w-screen overflow-auto font-[Jost] text-white"
            style={{ background: 'linear-gradient(119.18deg, #0A0E14 2.67%, #141C28 96.61%)' }}
        >
            {/* Sidebar */}
            {/* DOX logo square */}
            <div className="absolute top-0 left-0 z-50">
                <div
                    className="flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        width: '12vw',
                        height: '16vh',
                        background: '#0A0E14',
                        borderRight: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderBottom: '0.5px solid rgba(173, 173, 173, 0.5)',
                        borderRadius: '0px 0px 10px 0px',
                    }}
                >
                    <DoxLogo />
                    <p className="leading-none text-white/50 mt-1" style={{ fontSize: 'clamp(12px, 0.65vw, 12px)' }}>Employee Onboarding</p>
                </div>
            </div>

            {/* Sidebar steps */}
            <aside className="fixed left-0 top-0 h-full z-30 flex flex-col bg-transparent" style={{ paddingTop: '32vh' }}>
                <div className="flex flex-col gap-9">
                    {/* Inactive step 1 */}
                    <div
                        className="flex items-center justify-center font-medium"
                        style={{
                            width: '5vw',
                            height: '10vh',
                            fontSize: '2.2vw',
                            background: '#0A0E14',
                            border: '0.5px solid rgba(173, 173, 173, 0.5)',
                            borderRadius: '0px 10px 10px 0px',
                            color: '#848689',
                        }}
                    >
                        1
                    </div>
                    {/* Inactive step 2 */}
                    <div
                        className="flex items-center justify-center font-medium"
                        style={{
                            width: '5vw',
                            height: '10vh',
                            fontSize: '2.2vw',
                            background: '#0A0E14',
                            border: '0.5px solid rgba(173, 173, 173, 0.5)',
                            borderRadius: '0px 10px 10px 0px',
                            color: 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        2
                    </div>
                    {/* Active step 3 */}
                    <div
                        className="flex items-center justify-center font-medium text-white"
                        style={{
                            width: '5vw',
                            height: '10vh',
                            fontSize: '2.2vw',
                            background: '#1C2027',
                            border: '0.5px solid rgba(173, 173, 173, 0.5)',
                            borderRadius: '0px 10px 10px 0px',
                        }}
                    >
                        3
                    </div>
                </div>
            </aside>

            {/* Framed container - starts from center of small DOX square */}
            <div className="relative" style={{ marginLeft: '4.5vw', marginTop: '8vh', marginRight: '3vw', marginBottom: '5vh', zIndex: 20 }}>
                <div className="w-full border rounded-[10px] relative pb-10" style={{ borderColor: 'rgba(173, 173, 173, 0.5)' }}>
                    {/* Main Content */}
                    <main className="w-full flex flex-col items-start justify-center">
                        <div className="w-full max-w-[1027px] p-8 md:p-12 mt-4 mx-auto">
                            <h1 className="text-[36px] leading-[36px] font-normal text-white">Review &amp; Approval</h1>
                            <p className="mt-4 text-[24px] text-white">
                                Your onboarding submission is being reviewed by the HR team.
                            </p>

                            <div className="mt-10 space-y-6">
                                {/* Under HR Review */}
                                <div className="border rounded-[10px] p-6 flex gap-5 items-start" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                                    <div className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                                        <ClockIcon />
                                    </div>
                                    <div className="pt-1">
                                        <h2 className="text-[24px] leading-none text-white font-normal mb-3">Under HR Review</h2>
                                        <p className="text-[18px] text-white/65 leading-snug">Your onboarding details are currently being verified by our HR team.</p>
                                        <p className="text-[18px] text-white/65 mt-1 leading-snug">Expected completion: Within 48 hours</p>
                                    </div>
                                </div>

                                {/* Completed Steps */}
                                <div className="border rounded-[10px] p-8" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', background: 'rgba(0, 0, 0, 0.004)' }}>
                                    <h2 className="text-[24px] leading-none text-white font-normal mb-8">Completed Steps</h2>
                                    <div className="flex flex-col gap-6 ml-10">
                                        {steps.map((step, index) => (
                                            <div key={index} className="flex gap-4 items-start">
                                                <div className="mt-0.5 shrink-0"><CheckIcon /></div>
                                                <div>
                                                    <h3 className="text-[18px] leading-none text-white font-normal mb-1.5">{step.title}</h3>
                                                    <p className="text-[14px] text-white/65 leading-none">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* HR Comments */}
                                <div className="border rounded-[10px] p-4 md:p-6" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                                    <h2 className="text-[16px] leading-none text-white font-normal mb-4">HR Comments</h2>
                                    <div className="rounded-[10px] flex items-center justify-center py-3 px-4 w-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                                        <p className="text-[16px] italic text-white text-center">
                                            No comments yet. HR will add notes here if any clarifications are needed.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => navigate('/legal-agreements')}
                                    className="px-6 py-2.5 rounded-[10px] border text-[16px] font-normal text-white/70 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                                    style={{ borderColor: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                    <BackArrowIcon />
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="px-6 py-2.5 rounded-[10px] border text-[16px] font-normal text-white/70 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                                    style={{ borderColor: 'rgba(255, 255, 255, 0.7)' }}
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

const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#00A63E" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#00A63E" strokeWidth="2" />
        <path d="M8 12.5l2.6 2.6L16 9.6" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const BackArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M9.333 3.333L4.667 8l4.666 4.667" stroke="rgba(255,255,255,0.7)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.667 8H4.667" stroke="rgba(255,255,255,0.7)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const ForwardArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6.667 3.333L11.333 8l-4.666 4.667" stroke="rgba(255,255,255,0.7)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.333 8h8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
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

export default ReviewApproval
