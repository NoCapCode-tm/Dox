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
                            'conic-gradient(from 89.78deg at 50% 41%, #FFFFFF 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-1/2 h-full"
                    style={{
                        background:
                            'conic-gradient(from 89.78deg at 50% 41%, #FFFFFF 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
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
                        'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.72) 100%)',
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
                <div className="flex-1 flex flex-col items-center px-4 pt-8 md:pt-10 pb-6">

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
                    <div className="relative z-10 mb-[24px] md:mb-[32px] flex justify-center">
                        <LargeDoxLogo />
                    </div>

                    {/* Tubelight effect */}
                    <Tubelight />

                    {/* 3 Task Cards */}
                    <div className="w-full max-w-[1170px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[60px] px-4 mt-[8px] md:mt-[12px]">
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

const Tubelight = () => (
    <div
        className="relative w-full max-w-[760px] h-[14px] md:h-[18px] rounded-full mb-[18px] md:mb-[24px]"
        style={{
            background: 'linear-gradient(180deg, rgba(146,193,255,0.95) 0%, rgba(120,173,245,0.82) 52%, rgba(120,173,245,0.25) 100%)',
            boxShadow: '0 0 36px rgba(84,146,236,0.72), 0 18px 52px rgba(84,146,236,0.35)',
        }}
    />
);

/** Small header DOX logo */
const DoxLogo = () => (
    <svg width="69" height="19" viewBox="0 0 75 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
        {/* D */}
        <g transform="translate(0 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        {/* O */}
        <g transform="translate(17 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(27 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        {/* X */}
        <g transform="translate(45 0)">
            <path d="M0.400771 17.25C0.400771 17.25 -2.35803 17.25 6.60085 17.25C15.5597 17.25 14.6954 1.25 6.60085 1.25C-1.49371 1.25 0.400771 1.25 0.400771 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
        <g transform="translate(56 0)">
            <path d="M13.8492 17.25C13.8492 17.25 16.608 17.25 7.64915 17.25C-1.30974 17.25 -0.445418 1.25 7.64915 1.25C15.7437 1.25 13.8492 1.25 13.8492 1.25" stroke="white" strokeWidth="2.5" strokeLinecap="butt" />
        </g>
    </svg>
);

/** Large centered DOX logo  */
const LargeDoxLogo = () => {
    const scale = 'clamp(200px, 24vw, 340px)';
    return (
        <div style={{ width: 'min(100%, ' + scale + ')' }}>
            <svg width="463" height="119" viewBox="0 0 463 119" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX large logo" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                    <linearGradient id="paint0_linear_1326_384" x1="231.241" y1="0" x2="231.241" y2="119" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F0F0F0" />
                        <stop offset="98.56%" stopColor="#04070D" />
                    </linearGradient>
                </defs>
                <path fillRule="evenodd" clipRule="evenodd" d="M41.1602 0C56.5284 0 68.3762 7.87699 76.2881 19.1602C84.1229 30.3336 88.2341 44.9626 88.6133 59.3682C88.9922 73.7646 85.656 88.4981 77.9355 99.791C70.0885 111.269 57.8016 119 41.1602 119H0V109H41.1602C54.2559 109 63.5555 103.106 69.6807 94.1465C75.9322 85.002 78.9554 72.4851 78.6172 59.6318C78.2791 46.7876 74.5964 34.1663 68.1006 24.9023C61.6817 15.7483 52.6601 10 41.1602 10H0V0H41.1602ZM218.285 0C233.653 0 245.501 7.87699 253.413 19.1602C261.248 30.3336 265.359 44.9626 265.738 59.3682C266.117 73.7646 262.781 88.4981 255.061 99.791C247.214 111.269 234.927 119 218.285 119H162.447C145.806 119 133.519 111.269 125.672 99.791C117.951 88.4981 114.615 73.7646 114.994 59.3682C115.373 44.9626 119.484 30.3336 127.319 19.1602C135.231 7.87707 147.079 0 162.447 0H218.285ZM334.098 0C349.466 0 361.314 7.87699 369.226 19.1602C372.852 24.3325 375.68 30.2458 377.71 36.5342C379.74 30.2459 382.568 24.3325 386.194 19.1602C394.106 7.87706 405.954 0 421.322 0H462.482V10H421.322C409.822 10 400.801 15.7483 394.382 24.9023C387.886 34.1663 384.203 46.7876 383.865 59.6318C383.527 72.4851 386.55 85.002 392.802 94.1465C398.927 103.106 408.227 109 421.322 109H462.482V119H421.322C404.681 119 392.394 111.269 384.547 99.791C381.67 95.5835 379.404 90.8979 377.71 85.9307C376.016 90.898 373.75 95.5835 370.873 99.791C363.026 111.269 350.739 119 334.098 119H292.938V109H334.098C347.193 109 356.493 103.106 362.618 94.1465C368.87 85.002 371.893 72.4851 371.555 59.6318C371.217 46.7876 367.534 34.1663 361.038 24.9023C354.619 15.7483 345.598 10 334.098 10H292.938V0H334.098ZM162.447 10C150.947 10 141.926 15.7483 135.507 24.9023C129.011 34.1663 125.328 46.7876 124.99 59.6318C124.652 72.4851 127.675 85.002 133.927 94.1465C140.052 103.106 149.352 109 162.447 109H218.285C231.381 109 240.68 103.106 246.806 94.1465C253.057 85.002 256.08 72.4851 255.742 59.6318C255.404 46.7876 251.721 34.1663 245.226 24.9023C238.807 15.7483 229.785 10 218.285 10H162.447Z" fill="url(#paint0_linear_1326_384)" />
            </svg>
        </div>
    );
};

export default Welcome;