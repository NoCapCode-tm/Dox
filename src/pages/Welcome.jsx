import { useNavigate } from 'react-router-dom';

/**
 * Welcome page
 */
const Welcome = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Onboarding Information',
            desc: 'All information will be used for preparing your offer letter and agreements.',
            icon: <OnboardingIcon />,
            onClick: () => navigate('/dashboard'),
        },
        {
            title: 'Read Company Docs',
            desc: 'Understand our policies and culture',
            icon: <DocsIcon />,
            onClick: () => navigate('/company-docs'),
        },
        {
            title: 'Sign Offer Letter & NDA',
            desc: 'Review and sign your legal agreements',
            icon: <SignIcon />,
            onClick: () => navigate('/legal-agreements'),
        },
    ];

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden font-[Jost] text-white"
            style={{ background: '#000' }}
        >
            {/* Background — two mirrored conic rectangles */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-0 left-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 39.45%, #FFFFFF 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 39.45%, #FFFFFF 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                    }}
                />
            </div>

            {/* Topographic pattern overlay with multiply blend */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/dox-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'screen',
                    opacity: 0.38,
                }}
            />

            {/* Blue gradient overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'linear-gradient(180deg, #000000 14.42%, #5492EC 43.27%, #000000 100%)',
                    mixBlendMode: 'multiply',
                }}
            />

            {/* Scrollbar indicator */}
            <div
                className="absolute right-[20px] z-20 hidden lg:block"
                style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '12px',
                    height: '120px',
                    background: 'rgba(0,0,0,0.004)',
                    border: '3px solid rgba(255,255,255,0.38)',
                    borderRadius: '5px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">

                {/* Header — DOX logo */}
                <div className="px-[35px] pt-[35px]">
                    <DoxLogo />
                    <span className="block text-[12px] text-white/65 leading-[20px] mt-[6px] font-normal tracking-wide">
                        Employee Onboarding
                    </span>
                </div>

                {/* Main content */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">

                    {/* Welcome to */}
                    <p
                        className="font-[Jost] font-light text-[clamp(32px,3.3vw,48px)] leading-[36px] text-center mb-[8px]"
                        style={{
                            background: 'linear-gradient(180deg, #4882FF 0%, #000000 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Welcome to
                    </p>

                    {/* Large DOX logo */}
                    <div className="mb-[48px] md:mb-[60px]">
                        <LargeDoxLogo />
                    </div>

                    {/* 3 Task Cards */}
                    <div className="w-full max-w-[1170px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[60px] px-4">
                        {cards.map((card, i) => (
                            <TaskCard key={i} {...card} />
                        ))}
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-[clamp(14px,1.4vw,20px)] font-light leading-[24px] pb-[32px] px-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    Please complete the following onboarding steps to unlock full access.
                </p>

            </div>
        </div>
    );
};

/**
 * TaskCard — individual onboarding task block
 */
const TaskCard = ({ title, desc, icon, onClick }) => (
    <div
        className="relative flex flex-col p-[20px] rounded-[10px]"
        style={{ background: 'rgba(11,15,21,0.17)' }}
    >
        {/* Pending badge */}
        <div
            className="absolute top-[20px] right-[20px] flex items-center gap-[6px] px-[8px] py-[2px] rounded-[5px]"
            style={{ background: 'rgba(255,255,255,0.15)' }}
        >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="10" height="10" rx="5" stroke="white" strokeWidth="1" />
            </svg>
            <span className="font-[Jost] font-normal text-[12px] leading-[16px] text-white">Pending</span>
        </div>

        {/* Icon pill */}
        <div
            className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center mb-[auto] mt-0"
            style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 12px 0px' }}
        >
            {icon}
        </div>

        {/* Title + desc */}
        <div className="mt-[24px] mb-[16px]">
            <h3 className="font-[Jost] font-normal text-[16px] leading-[24px] text-white mb-[4px]">
                {title}
            </h3>
            <p className="font-[Jost] font-normal text-[14px] leading-[20px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {desc}
            </p>
        </div>

        {/* Start button */}
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-[8px] w-fit px-[17px] py-[10px] rounded-[10px] font-[Jost] font-normal text-[16px] leading-[24px] text-white transition-opacity hover:opacity-80 active:scale-95"
            style={{ border: '1px solid rgba(255,255,255,0.5)' }}
        >
            Start
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    </div>
);

/* ── Icon Components ── */

const OnboardingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="2" />
        <path d="M2 9h20" stroke="white" strokeWidth="2" />
        <path d="M7 14h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const DocsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-6z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 3v6h6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 13h8M8 17h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const SignIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="2" />
        <path d="M8 7h8M8 11h8M8 15h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 17l2-2 2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Small header DOX logo */
const DoxLogo = () => (
    <svg width="69" height="19" viewBox="0 0 75 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
        {/* D */}
        <g transform="translate(0 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" />
        </g>
        {/* O */}
        <g transform="translate(17 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" />
        </g>
        <g transform="translate(27 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" />
        </g>
        {/* X */}
        <g transform="translate(45 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" />
        </g>
        <g transform="translate(56 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" />
        </g>
    </svg>
);

/** Large centered DOX logo with gradient */
const LargeDoxLogo = () => {
    const scale = 'clamp(260px, 32vw, 462px)';
    return (
        <div style={{ width: scale }}>
            <svg viewBox="0 0 463 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX large logo" style={{ width: '100%', height: 'auto' }}>
                <defs>
                    <linearGradient id="dox_grad" x1="231.5" y1="0" x2="231.5" y2="120" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F0F0F0" />
                        <stop offset="98.56%" stopColor="#04070D" />
                    </linearGradient>
                </defs>
                {/* D */}
                <path d="M4 110C4 110 -18 110 52 110C122 110 116 10 52 10C-12 10 4 10 4 10" stroke="url(#dox_grad)" strokeWidth="10" strokeLinecap="round" />
                {/* O */}
                <path d="M175 110C175 110 153 110 223 110C293 110 287 10 223 10C159 10 175 10 175 10" stroke="url(#dox_grad)" strokeWidth="10" strokeLinecap="round" />
                <path d="M290 110C290 110 312 110 242 110C172 110 178 10 242 10C306 10 290 10 290 10" stroke="url(#dox_grad)" strokeWidth="10" strokeLinecap="round" />
                {/* X */}
                <path d="M350 110C350 110 328 110 398 110C468 110 462 10 398 10C334 10 350 10 350 10" stroke="url(#dox_grad)" strokeWidth="10" strokeLinecap="round" />
                <path d="M459 110C459 110 481 110 411 110C341 110 347 10 411 10C475 10 459 10 459 10" stroke="url(#dox_grad)" strokeWidth="10" strokeLinecap="round" />
            </svg>
        </div>
    );
};

export default Welcome;