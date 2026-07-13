import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingContext } from '../context/OnboardingContext';
import { getCurrentUser } from '../api/employeeApi';

const DAY_MS = 24 * 60 * 60 * 1000;

const Completion = () => {
	const navigate = useNavigate();
	const { formData, updateFormData } = useOnboardingContext();
	const completionStartedAt = formData.step8.completionStartedAt;
	 const [user, setUser] = useState(null);
	
	
	const [now, setNow] = useState(Date.now());

	 useEffect(() => {
		const loadUser = async () => {
			try {
				const response = await getCurrentUser();
	
				console.log("Current User:", response);
	
				setUser(response.message);
			} catch (err) {
				console.error(err);
			}
		};
	
		loadUser();
		}, []);

	useEffect(() => {
		if (!completionStartedAt) {
			updateFormData('step8', 'completionStartedAt', Date.now());
		}
	}, [completionStartedAt, updateFormData]);

	

	const remainingMs = useMemo(() => {
	if (!user?.onboarding?.completedAt) return DAY_MS;

	const completedAt = new Date(user.onboarding.completedAt).getTime();
	const expiresAt = completedAt + DAY_MS;

	return Math.max(0, expiresAt - now);
}, [user?.onboarding?.completedAt, now]);
 const canGoToDashboard = remainingMs === 0;

 useEffect(() => {
	if (remainingMs === 0) return;

	const timer = setInterval(() => {
		setNow(Date.now());
	}, 1000);

	return () => clearInterval(timer);
}, [remainingMs]);

	const hours = Math.floor(remainingMs / (60 * 60 * 1000));
	const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
	const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

	return (
		<div
			className="relative min-h-screen w-full overflow-hidden text-white font-[Jost] flex flex-col"
			style={{
				backgroundImage: "url('../../../public/BG.svg')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
				backgroundColor: '#0A0E14'
			}}
		>
			<div className="relative z-10 w-full px-[35px] pt-[35px]">
				<DoxLogo width="69" />
				<span className="block text-[12px] text-white/65 leading-[20px] mt-[6px] font-normal tracking-wide">
					Employee Onboarding
				</span>
			</div>

			<main className="relative z-10 flex-1 max-w-[1200px] w-full mx-auto px-4 flex flex-col items-center justify-center text-center pb-[100px]">
				
                <div className="mb-[24px] flex justify-center text-[#51A2FF]">
					<CheckCircleOutlineIcon />
				</div>

				<h1
					className="text-[40px] md:text-[56px] font-normal text-[#FFFFFF]"
					style={{
						maxWidth: '792px',
						lineHeight: '1.2',
					}}
				>
					Your onboarding is <span className="text-[#51A2FF]">complete</span>
				</h1>

				<p
					className="mt-[24px] text-[18px] md:text-[24px] text-[#D1D5DC] font-normal"
					style={{ maxWidth: '532px', lineHeight: '32px' }}
				>
					You will receive full system access in :
				</p>

				{!canGoToDashboard && (
	<div
		className="mt-[40px] mx-auto flex items-baseline justify-center gap-[8px] whitespace-nowrap"
		style={{
			fontFamily: 'Jost, sans-serif',
			fontWeight: 300,
			color: '#FFFFFF',
		}}
	>
		<span style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: '1' }}>
			{String(hours).padStart(2, '0')}
		</span>
		<span style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>Hr</span>

		<span style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>:</span>

		<span style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: '1' }}>
			{String(minutes).padStart(2, '0')}
		</span>
		<span style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>Min</span>

		<span style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>:</span>

		<span style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: '1' }}>
			{String(seconds).padStart(2, '0')}
		</span>
		<span style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>Sec</span>
	</div>
)}
				{canGoToDashboard && (
	<button
		type="button"
		onClick={() => navigate('/welcome')}
		className="mt-[64px] h-[44px] px-[24px] rounded-[10px] flex items-center justify-center gap-[8px] transition-all hover:bg-white/10 active:scale-95 border border-white/10"
		style={{
			backgroundColor: 'rgba(6, 14, 32, 0.4)',
			backdropFilter: 'blur(10px)',
			WebkitBackdropFilter: 'blur(10px)',
		}}
	>
		<ExternalLinkIcon />
		<span className="font-[Jost] font-normal text-[15px] leading-[24px] text-white">
			Go to Dashboard
		</span>
	</button>
)}

				<div className="mt-[32px] text-[14px] leading-[24px] font-normal text-[#99A1AF]">
					Questions or need help?{' '}
					<a href="mailto:hr@nocapcode.cloud" className="text-[#51A2FF] hover:underline transition-all">
						Contact HR Support
					</a>
				</div>
			</main>
		</div>
	);
};

/* --- Internal SVG Components --- */

const CheckCircleOutlineIcon = () => (
	<svg 
        width="114" 
        height="114" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{
			width: 'clamp(72px, 8vw, 100px)',
			height: 'clamp(72px, 8vw, 100px)',
		}}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ExternalLinkIcon = () => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const DoxLogo = ({ width = '69', fill = '#FFFFFF' }) => (
	<svg width={width} viewBox="0 0 339 95" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DOX logo">
		<g>
			<path
				d="M34.7666 3C46.7577 3 56.0143 9.02218 62.1338 17.5264C68.1563 25.896 71.2549 36.7461 71.541 47.3379C71.8268 57.9196 69.3202 68.899 63.3457 77.415C57.2191 86.1478 47.6047 92 34.7666 92H3C2.99991 91.9957 2.99999 85.9979 3 80H34.7666C43.4858 80 49.5193 76.2271 53.5215 70.5225C57.6757 64.601 59.779 56.3304 59.5449 47.6621C59.3111 39.0041 56.7596 30.604 52.3936 24.5361C48.1243 18.603 42.2529 15 34.7666 15H4.00195V3H34.7666ZM159.892 3C171.883 3 181.139 9.02218 187.259 17.5264C193.281 25.896 196.38 36.7461 196.666 47.3379C196.952 57.9196 194.445 68.899 188.471 77.415C182.344 86.1478 172.73 92 159.892 92H120.421C107.583 92 97.9684 86.1478 91.8418 77.415C85.8673 68.899 83.3607 57.9196 83.6465 47.3379C83.9326 36.7461 87.0312 25.896 93.0537 17.5264C99.1732 9.02218 108.43 3 120.421 3H159.892ZM241.704 3C253.695 3 262.952 9.02218 269.071 17.5264C270.345 19.2968 271.487 21.179 272.5 23.1455C273.513 21.179 274.655 19.2968 275.929 17.5264C282.048 9.02218 291.305 3 303.296 3H334.061V15H303.296C295.81 15 289.938 18.603 285.669 24.5361C281.303 30.604 278.751 39.0041 278.518 47.6621C278.283 56.3304 280.387 64.601 284.541 70.5225C288.543 76.2271 294.577 80 303.296 80H335.062C335.062 85.9979 335.063 91.9957 335.062 92H303.296C290.458 92 280.843 86.1478 274.717 77.415C273.915 76.2723 273.178 75.0839 272.5 73.8594C271.822 75.0839 271.085 76.2723 270.283 77.415C264.157 86.1478 254.542 92 241.704 92H209.938C209.937 91.9957 209.937 85.9979 209.938 80H241.704C250.423 80 256.457 76.2271 260.459 70.5225C264.613 64.601 266.717 56.3304 266.482 47.6621C266.249 39.0041 263.697 30.604 259.331 24.5361C255.062 18.603 249.19 15 241.704 15H210.939V3H241.704ZM120.421 15C112.935 15 107.063 18.603 102.794 24.5361C98.4279 30.604 95.8764 39.0041 95.6426 47.6621C95.4085 56.3304 97.5118 64.601 101.666 70.5225C105.668 76.2271 111.702 80 120.421 80H159.892C168.611 80 174.644 76.2271 178.646 70.5225C182.801 64.601 184.904 56.3304 184.67 47.6621C184.436 39.0041 181.885 30.604 177.519 24.5361C173.249 18.603 167.378 15 159.892 15H120.421Z"
				fill={fill}
			/>
		</g>
	</svg>
);

export default Completion;