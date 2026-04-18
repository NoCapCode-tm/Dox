import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/employeeApi';
import Loader from '../components/ui/Loader';

/**
 * Dashboard
 * Grid layout with 8 steps and 3 info cards
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] =useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        setIsLoading(true);
        setAuthError('');

        const response = await getCurrentUser();
        const name = response?.data?.name || response?.message?.name || '';
        setUserName(name);
      } catch (error) {
        setAuthError(error?.message || 'Session expired. Please sign in again.');
        if (error?.status === 401 || error?.status === 403) {
          navigate('/', { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentUser();
  }, [navigate]);

  const handleStartStep = (stepNumber) => {
    navigate(`/onboarding/step${stepNumber}`);
  };

  const steps = [
    {
      num: '01',
      title: 'Basic Personal Information',
      desc: 'Provide your basic personal details for official records and communication.',
      stepIndex: 1,
    },
    {
      num: '02',
      title: 'Emergency Contact Information',
      desc: 'Maintained for safety and HR compliance.',
      stepIndex: 2,
    },
    {
      num: '03',
      title: 'Identity Information',
      desc: 'Upload your identity details for verification and official documentation.',
      stepIndex: 3,
    },
    {
      num: '04',
      title: 'Education / Background',
      desc: 'Share your academic background and qualification details.',
      stepIndex: 4,
    },
    {
      num: '05',
      title: 'Professional Profile',
      desc: 'Share your professional background and public work presence.',
      stepIndex: 5,
    },
    {
      num: '06',
      title: 'Payment & Financial Information',
      desc: 'Used for stipend, salary, or contractual payments.',
      stepIndex: 6,
    },
    {
      num: '07',
      title: 'Work Environment & Technical Setup',
      desc: 'Helps IT and operations understand working conditions.',
      stepIndex: 7,
    },
    {
      num: '08',
      title: 'Review & Declaration',
      desc: 'Review all provided details and confirm submission for document generation.',
      stepIndex: 8,
    },
  ];

  const infoBlocks = [
    {
      title: 'Required Information',
      desc: 'Fields marked with * must be completed to continue onboarding.',
    },
    {
      title: 'Automatic Progress Saving',
      desc: 'Your details are securely saved as you move through each step, no need to worry about losing progress.',
    },
    {
      title: 'Data Confidentiality',
      desc: 'All information you provide is protected and used solely for official purposes.',
    },
  ];

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col font-[Jost] text-white"
      style={{
        background:
          'radial-gradient(1400px 1000px at 0% 0%, #5B7AB5 0%, #1D2A43 45%, #0B1019 75%, #040608 100%)',
      }}
    >
      {isLoading && <Loader fullScreen={true} message="Loading dashboard..." />}
      {/* Decorative Background grid/wires*/}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Header/Logo area */}
      <div className="w-full px-8 pt-8 pb-2 flex flex-col relative z-10">
        <DoxLogo width="69" />
        <span className="text-[12px] text-white/65 leading-[20px] mt-2 tracking-wide font-normal">
          Employee Onboarding
        </span>
      </div>

      <main className="flex-1 w-full max-w-[1349px] mx-auto px-4 md:px-8 pb-16 flex flex-col items-center relative z-10">

        {/* Main Title Section */}
        <div className="flex flex-col items-center text-center mt-[12px] mb-[66px]">
          <h1 className="text-[clamp(32px,4vw,48px)] leading-[60px] font-normal tracking-wide">
            Onboarding Information
          </h1>
          {userName ? (
            <p className="mt-[6px] text-[18px] text-white/80 font-normal leading-[26px]">
              Welcome, {userName}
            </p>
          ) : null}
          <p className="mt-[20px] text-[24px] text-[#FFFFFF] max-w-[739px] font-normal leading-[32px]">
            Complete your onboarding process in 7 simple steps. All information
            will be used for preparing your offer letter and agreements.
          </p>
          {authError ? (
            <p className="mt-[10px] text-[14px] text-[#FF9EA0] font-normal leading-[22px]">
              {authError}
            </p>
          ) : null}
        </div>

        {/* 8 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col justify-between p-6 rounded-[10px] h-full min-h-[234px]"
              style={{
                backgroundColor: 'rgba(21, 27, 35, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.15), inset -1px -1px 0px rgba(255, 255, 255, 0.03)',
              }}
            >
              <div>
                <div className="text-[16px] text-white font-normal leading-[20px] mb-[30px]">
                  Step {step.num}
                </div>
                <h3 className="text-[16px] text-white font-normal leading-[28px] mb-[10px]">
                  {step.title}
                </h3>
                <p className="text-[14px] text-white leading-[20px]">
                  {step.desc}
                </p>
              </div>

              {/* Start Button */}
              <button
                onClick={() => handleStartStep(step.stepIndex)}
                className="mt-[16px] w-[91px] h-[40px] rounded-[10px] flex items-center justify-center gap-[8px] transition-transform active:scale-95 hover:brightness-110 group"
                style={{
                  backgroundColor: '#314460',
                  boxShadow:
                    '1px 1px 2px rgba(64, 88, 125, 0.3), -1px -1px 2px rgba(34, 48, 67, 0.5), inset -5px 5px 10px rgba(34, 48, 67, 0.2), inset 5px -5px 10px rgba(34, 48, 67, 0.2), inset -5px -5px 10px rgba(64, 88, 125, 0.9), inset 5px 5px 13px rgba(34, 48, 67, 0.9)',
                }}
              >
                <span className="text-[16px] text-white font-normal">Start</span>
                <ArrowRightIcon className="w-[16px] h-[16px] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* 3 Info Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-[1147px]">
          {infoBlocks.map((info, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-[10px] h-full min-h-[130px]"
              style={{
                backgroundColor: '#0A0E14',
                border: '0.8px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="mt-1 shrink-0">
                <CheckCircleIcon />
              </div>
              <div className="flex flex-col mt-[-2px]">

                <h4 className="text-[16px] text-white font-normal leading-[28px]">
                  {info.title}
                </h4>

                <p className="text-[14px] text-[#99A1AF] leading-[20px] mt-[4px]">
                  {info.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;

/* --- Internal SVG Components --- */

const ArrowRightIcon = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3.33334 8H12.6667"
      stroke="white"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3.33334L12.6667 8.00001L8 12.6667"
      stroke="white"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.6667 15.3067V16C26.6651 18.2818 25.9324 20.5015 24.5683 22.3618C23.2043 24.2222 21.2753 25.6346 19.0396 26.4132C16.804 27.1917 14.3644 27.2996 12.0398 26.7196C9.7153 26.1396 7.61285 24.8986 6.00282 23.1611C4.3928 21.4236 3.34812 19.2713 2.99965 16.9859C2.65118 14.7006 3.0152 12.3912 4.04505 10.366C5.0749 8.34081 6.72145 6.69769 8.76185 5.66014C10.8023 4.62259 13.1384 4.23897 15.4534 4.56001"
      stroke="#314460"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.6666 5.33334L15.9999 16.0133L11.9999 12.0133"
      stroke="#314460"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * DOX Logo 
 */
const DoxLogo = ({ width = "69", fill = "#FFFFFF" }) => (
  <svg
    width={width}
    viewBox="0 0 339 95"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="DOX logo"
  >
    <g>
      <path
        d="M34.7666 3C46.7577 3 56.0143 9.02218 62.1338 17.5264C68.1563 25.896 71.2549 36.7461 71.541 47.3379C71.8268 57.9196 69.3202 68.899 63.3457 77.415C57.2191 86.1478 47.6047 92 34.7666 92H3C2.99991 91.9957 2.99999 85.9979 3 80H34.7666C43.4858 80 49.5193 76.2271 53.5215 70.5225C57.6757 64.601 59.779 56.3304 59.5449 47.6621C59.3111 39.0041 56.7596 30.604 52.3936 24.5361C48.1243 18.603 42.2529 15 34.7666 15H4.00195V3H34.7666ZM159.892 3C171.883 3 181.139 9.02218 187.259 17.5264C193.281 25.896 196.38 36.7461 196.666 47.3379C196.952 57.9196 194.445 68.899 188.471 77.415C182.344 86.1478 172.73 92 159.892 92H120.421C107.583 92 97.9684 86.1478 91.8418 77.415C85.8673 68.899 83.3607 57.9196 83.6465 47.3379C83.9326 36.7461 87.0312 25.896 93.0537 17.5264C99.1732 9.02218 108.43 3 120.421 3H159.892ZM241.704 3C253.695 3 262.952 9.02218 269.071 17.5264C270.345 19.2968 271.487 21.179 272.5 23.1455C273.513 21.179 274.655 19.2968 275.929 17.5264C282.048 9.02218 291.305 3 303.296 3H334.061V15H303.296C295.81 15 289.938 18.603 285.669 24.5361C281.303 30.604 278.751 39.0041 278.518 47.6621C278.283 56.3304 280.387 64.601 284.541 70.5225C288.543 76.2271 294.577 80 303.296 80H335.062C335.062 85.9979 335.063 91.9957 335.062 92H303.296C290.458 92 280.843 86.1478 274.717 77.415C273.915 76.2723 273.178 75.0839 272.5 73.8594C271.822 75.0839 271.085 76.2723 270.283 77.415C264.157 86.1478 254.542 92 241.704 92H209.938C209.937 91.9957 209.937 85.9979 209.938 80H241.704C250.423 80 256.457 76.2271 260.459 70.5225C264.613 64.601 266.717 56.3304 266.482 47.6621C266.249 39.0041 263.697 30.604 259.331 24.5361C255.062 18.603 249.19 15 241.704 15H210.939V3H241.704ZM120.421 15C112.935 15 107.063 18.603 102.794 24.5361C98.4279 30.604 95.8764 39.0041 95.6426 47.6621C95.4085 56.3304 97.5118 64.601 101.666 70.5225C105.668 76.2271 111.702 80 120.421 80H159.892C168.611 80 174.644 76.2271 178.646 70.5225C182.801 64.601 184.904 56.3304 184.67 47.6621C184.436 39.0041 181.885 30.604 177.519 24.5361C173.249 18.603 167.378 15 159.892 15H120.421Z"
        fill={fill}
      />
    </g>
  </svg>
);
