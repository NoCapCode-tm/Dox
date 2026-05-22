import { useNavigate } from 'react-router-dom';

/**
 * Welcome page
 */
const Welcome = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Onboarding Information',
            desc: 'All information will be used for preparing your offer letter and agreements..',
            icon: <OnboardingIcon />,
            onClick: () => navigate('/dashboard'),
        },
        {
            title: 'Read Company Docs',
            desc: 'Understand our policies and culture',
            icon: <BookIcon />,
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
            className="relative min-h-screen w-full overflow-x-hidden font-[Jost] text-white flex flex-col items-center pb-[40px]"
            style={{ background: 'linear-gradient(117.18deg, #0A0E14 0%, #131B27 98.99%)' }}
        >
            {/* Banner Container */}
            <div className="relative w-full max-w-[1440px] mx-auto px-4 pt-[29px] md:px-[29px]">
                <div
                    className="relative w-full h-[320px] md:h-[478px] rounded-[24px] overflow-hidden flex flex-col items-center justify-start"
                >
                    {/* Background — two mirrored conic rectangles */}
                    <div className="absolute inset-0 z-0">
                        <div
                            className="absolute left-0 w-1/2 h-full top-0"
                            style={{
                                background:
                                    'conic-gradient(from 89.78deg at 50% 55%, #FFFFFF 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                            }}
                        />
                        <div
                            className="absolute right-0 w-1/2 h-full top-0"
                            style={{
                                background:
                                    'conic-gradient(from 89.78deg at 50% 55%, #FFFFFF 0deg, #00184D 219.41deg, #101828 309.85deg, #111111 360deg)',
                                transform: 'scaleX(-1)',
                            }}
                        />
                    </div>

                    {/*overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: 'url(/dox-bg.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            mixBlendMode: 'multiply',
                            filter: 'brightness(0) contrast(1.08)',
                            opacity: 0.62,
                        }}
                    />

                    {/* Blue gradient overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            background:
                                'linear-gradient(180deg, #FFFFFF 14.42%, #5492EC 43.27%, #000000 100%)',
                            mixBlendMode: 'multiply',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center w-full h-full pt-[60px] md:pt-[118px] px-4">
                        {/* Welcome to */}
                        <p
                            className="font-[Jost] font-light text-[24px] md:text-[48px] leading-[30px] md:leading-[36px] text-center mb-[8px] md:mb-[16px] select-none"
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
                        <div className="mb-[16px] md:mb-[24px] flex justify-center w-full max-w-[280px] md:max-w-[463px]">
                            <LargeDoxLogo />
                        </div>

                    </div>
                </div>
            </div>

            {/* 3 Task Cards */}
            <div className="relative w-full max-w-[1170.88px] mx-auto px-4 mt-[40px] md:mt-[133px]">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-[24px] md:gap-[60px]">
                    {cards.map((card, i) => (
                        <TaskCard key={i} {...card} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[16px] md:text-[20px] font-light leading-[24px] mt-[40px] md:mt-[96px] px-4 w-full max-w-[573px] mx-auto" style={{ color: 'rgba(216, 216, 216, 0.65)' }}>
                Please complete the following onboarding steps to unlock full access.
            </p>
        </div>
    );
};

/**
 * TaskCard — individual onboarding task block
 */
const TaskCard = ({ title, desc, icon, onClick }) => (
    <div
        className="relative w-full md:w-[350.29px] h-[234px] rounded-[10px] overflow-hidden"
        style={{
            boxSizing: 'border-box',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(19, 27, 39, 0.3)',
            backdropFilter: 'blur(10px)',
        }}
    >
        {/* Icon pill */}
        <div
            className="absolute left-[20.8px] top-[20.8px] w-[48px] h-[48px] rounded-[8px] flex items-center justify-center"
            style={{ background: 'rgba(255, 255, 255, 0.15)' }}
        >
            {icon}
        </div>

        {/* Pending Badge */}
        <div
            className="absolute right-[20.8px] top-[20.8px] flex items-center gap-[6px] px-[8px] py-[2px] rounded-[5px]"
            style={{
                background: 'rgba(255, 255, 255, 0.15)',
                width: '75.18px',
                height: '19.99px',
                boxSizing: 'border-box',
            }}
        >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="w-[12px] h-[12px] flex-shrink-0">
                <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1" />
            </svg>
            <span className="font-[Jost] font-normal text-[12px] leading-[16px] text-white select-none">Pending</span>
        </div>

        {/* Title + desc */}
        <div className="absolute left-[24.8px] top-[89.8px] w-[calc(100%-49.6px)] flex flex-col gap-[4px]">
            <h3 className="font-[Jost] font-normal text-[16px] leading-[24px] text-white m-0 select-none">
                {title}
            </h3>
            <p className="font-[Jost] font-normal text-[14px] leading-[20px] text-white/65 m-0 line-clamp-2 select-none">
                {desc}
            </p>
        </div>

        {/* Start button */}
        <button
            type="button"
            onClick={onClick}
            className="absolute left-[25px] top-[169px] w-[91px] h-[40px] flex items-center justify-center gap-[8px] rounded-[10px] font-[Jost] font-normal text-[16px] leading-[24px] text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
            style={{ border: '1px solid rgba(255, 255, 255, 0.5)', boxSizing: 'border-box' }}
        >
            <span className="select-none">Start</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-[16px] h-[16px]">
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

const BookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Spine / Divider */}
        <path d="M12 5v14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Left Page */}
        <path d="M12 5C10 3 6 3 4 5v13c2-2 6-2 8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right Page */}
        <path d="M12 5C14 3 18 3 20 5v13c-2-2-6-2-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SignIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Document outer border with cut-out for folded corner */}
        <path d="M4 2h10l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        {/* Folded corner line */}
        <path d="M14 2v6h6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        {/* Lines of text */}
        <path d="M8 13h8M8 17h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

/** Large centered DOX logo  */
const LargeDoxLogo = () => {
    const scale = 'clamp(200px, 24vw, 340px)';
    return (
        <div style={{ width: 'min(100%, ' + scale + ')' }} className="w-full">
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