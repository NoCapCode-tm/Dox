import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingContext } from '../context/OnboardingContext';

const DAY_MS = 24 * 60 * 60 * 1000;

const Completion = () => {
	const navigate = useNavigate();
	const { formData, updateFormData } = useOnboardingContext();
	const completionStartedAt = formData.step8.completionStartedAt;
	const [now, setNow] = useState(Date.now());

	useEffect(() => {
		if (!completionStartedAt) {
			updateFormData('step8', 'completionStartedAt', Date.now());
		}
	}, [completionStartedAt, updateFormData]);

	useEffect(() => {
		const timer = setInterval(() => {
			setNow(Date.now());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const remainingMs = useMemo(() => {
		const startAt = completionStartedAt || now;
		return Math.max(0, DAY_MS - (now - startAt));
	}, [completionStartedAt, now]);

	const hours = Math.floor(remainingMs / (60 * 60 * 1000));
	const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
	const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

	return (
		<div
			className="relative min-h-screen w-full overflow-hidden text-white font-[Jost]"
			style={{
				background:
					'conic-gradient(from 118.41deg at 50% 55.97%, #000000 0deg, #254386 0.51deg, #000000 360deg), conic-gradient(from 90deg at 92.22% 50%, #000000 0deg, #2D5EC9 360deg), conic-gradient(from 0deg at 50% 11.18%, #000000 0deg, #1C4BB2 360deg), conic-gradient(from -90deg at 10.69% 50%, #123D7C -0.03deg, #000102 0.04deg, #123D7C 359.97deg, #000102 360.04deg), conic-gradient(from 180deg at 50% 87.88%, #394860 0deg, #101620 360deg)',
			}}
		>
			<div className="relative z-10 w-full px-[35px] pt-[35px]">
				<DoxLogo width="69" />
				<span className="block text-[12px] text-white/65 leading-[20px] mt-[6px] font-normal tracking-wide">
					Employee Onboarding
				</span>
			</div>

			<main className="relative z-10 max-w-[1200px] mx-auto px-4 pt-[70px] pb-[80px] flex flex-col items-center text-center">
				<div className="mb-[28px] flex justify-center" style={{ position: 'relative' }}>
					<CheckCircleIcon />
				</div>

				<h1
					className="text-[40px] md:text-[64px] font-normal text-[#DBDBDB]"
					style={{
						maxWidth: '792px',
						lineHeight: '1.1',
						transform: 'rotate(0.11deg)',
					}}
				>
					Your onboarding is <span className="block md:inline text-[#1B6CE5]">complete</span>
				</h1>

				<p
					className="mt-[62px] text-[20px] md:text-[32px] text-white/75 font-normal"
					style={{ maxWidth: '532px', lineHeight: '24px' }}
				>
					You will receive full system access in :
				</p>

				<div
					className="mt-[56px] mx-auto w-[394px] max-w-full flex items-baseline justify-center gap-[6px] whitespace-nowrap"
					style={{
						fontFamily: 'Roboto Flex, Jost, sans-serif',
						fontWeight: 200,
						fontStyle: 'normal',
						lineHeight: '1',
						textAlign: 'center',
						color: '#FFFFFF',
						fontVariationSettings: '"opsz" 48, "wght" 200',
					}}
				>
					<span style={{ fontSize: 'clamp(44px, 4.6vw, 64px)', lineHeight: '1' }}>{hours}</span>
					<span style={{ fontSize: 'clamp(16px, 1.35vw, 24px)', lineHeight: '1', transform: 'translateY(0px)' }}>Hr</span>
					<span style={{ fontSize: 'clamp(30px, 2.6vw, 48px)', lineHeight: '1' }}>:</span>
					<span style={{ fontSize: 'clamp(44px, 4.6vw, 64px)', lineHeight: '1' }}>{minutes}</span>
					<span style={{ fontSize: 'clamp(16px, 1.35vw, 24px)', lineHeight: '1', transform: 'translateY(0px)' }}>Min</span>
					<span style={{ fontSize: 'clamp(30px, 2.6vw, 48px)', lineHeight: '1' }}>:</span>
					<span style={{ fontSize: 'clamp(44px, 4.6vw, 64px)', lineHeight: '1' }}>{seconds}</span>
					<span style={{ fontSize: 'clamp(16px, 1.35vw, 24px)', lineHeight: '1', transform: 'translateY(0px)' }}>Sec</span>
				</div>

				<button
					type="button"
					onClick={() => navigate('/dashboard')}
					className="mt-[90px] h-[40px] w-[187px] rounded-[10px] flex items-center justify-center gap-[7px] transition-opacity hover:opacity-90 active:scale-95"
					style={{
						background: '#314460',
						boxShadow:
							'1px 1px 2px rgba(64,88,125,0.3), -1px -1px 2px rgba(34,48,67,0.5), inset -5px 5px 10px rgba(34,48,67,0.2), inset 5px -5px 10px rgba(34,48,67,0.2), inset -5px -5px 10px rgba(64,88,125,0.9), inset 5px 5px 13px rgba(34,48,67,0.9)',
					}}
				>
					<DashboardIcon />
					<span className="font-[Jost] font-normal text-[16px] leading-[24px] text-white">Go to Dashboard</span>
				</button>

				<div className="mt-[22px] text-[16px] leading-[24px] font-normal text-white/65">
					Questions or need help?{' '}
					<a href="#" className="text-[#1B6CE5] hover:underline">
						Contact HR Support
					</a>
				</div>
			</main>
		</div>
	);
};

const CheckCircleIcon = () => (
	<svg
		width="114"
		height="114"
		viewBox="0 0 114 114"
		fill="none"
		aria-hidden="true"
		style={{
			width: 'clamp(84px, 7.2vw, 114px)',
			height: 'clamp(84px, 7.2vw, 114px)',
			flexShrink: 0,
		}}
	>
		<g filter="url(#completion-filter-1174-666)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M48.2442 3.65299C60.3513 1.74554 72.7463 4.04622 83.3624 10.1715C85.2757 11.2756 85.9322 13.722 84.8282 15.6354C83.724 17.5484 81.2776 18.2041 79.3643 17.1003C70.3333 11.8895 59.7887 9.93268 49.4893 11.5553C39.19 13.178 29.758 18.2823 22.7666 26.0172C15.7754 33.7523 11.6472 43.6508 11.0704 54.0612C10.4936 64.4715 13.5028 74.7653 19.5967 83.2253C25.6908 91.6853 34.5016 97.8009 44.5586 100.551C54.6157 103.302 65.312 102.522 74.8633 98.3405C84.4145 94.1593 92.2444 86.8297 97.0459 77.5749C101.847 68.32 103.331 57.6984 101.249 47.4821C100.808 45.3175 102.206 43.2045 104.37 42.7633C106.535 42.3226 108.647 43.72 109.088 45.8844C111.535 57.8939 109.791 70.3801 104.147 81.2594C98.5022 92.1386 89.2989 100.755 78.0713 105.67C66.8438 110.584 54.2703 111.501 42.4483 108.268C30.6263 105.035 20.2691 97.8467 13.1055 87.902C5.94197 77.9572 2.40414 65.8563 3.08207 53.6188C3.76012 41.3813 8.61286 29.7456 16.8311 20.653C25.0495 11.5604 36.1372 5.56048 48.2442 3.65299ZM103.291 13.1276C104.833 11.5463 107.366 11.5151 108.947 13.0573C110.529 14.5998 110.56 17.1321 109.018 18.7135L59.4346 69.5465C58.6818 70.3182 57.6493 70.7536 56.5713 70.7536C55.4934 70.7534 54.4607 70.3182 53.708 69.5465L38.833 54.2965C37.2909 52.7152 37.3223 50.1827 38.9034 48.6403C40.4846 47.098 43.0171 47.1297 44.5596 48.7106L56.5704 61.0251L103.291 13.1276Z"
				fill="#314460"
			/>
		</g>
		<defs>
			<filter id="completion-filter-1174-666" x="0" y="0" width="113.167" height="113.166" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="-1" dy="-1" />
				<feGaussianBlur stdDeviation="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.105882 0 0 0 0 0.14902 0 0 0 0.5 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1174_666" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="1" dy="1" />
				<feGaussianBlur stdDeviation="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.427451 0 0 0 0 0.603922 0 0 0 0.3 0" />
				<feBlend mode="normal" in2="effect1_dropShadow_1174_666" result="effect2_dropShadow_1174_666" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1174_666" result="shape" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="3" dy="3" />
				<feGaussianBlur stdDeviation="4" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.105882 0 0 0 0 0.14902 0 0 0 0.9 0" />
				<feBlend mode="normal" in2="shape" result="effect3_innerShadow_1174_666" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="-3" dy="-3" />
				<feGaussianBlur stdDeviation="3" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.427451 0 0 0 0 0.603922 0 0 0 0.9 0" />
				<feBlend mode="normal" in2="effect3_innerShadow_1174_666" result="effect4_innerShadow_1174_666" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="3" dy="-3" />
				<feGaussianBlur stdDeviation="3" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.105882 0 0 0 0 0.14902 0 0 0 0.2 0" />
				<feBlend mode="normal" in2="effect4_innerShadow_1174_666" result="effect5_innerShadow_1174_666" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="-3" dy="3" />
				<feGaussianBlur stdDeviation="3" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.105882 0 0 0 0 0.14902 0 0 0 0.2 0" />
				<feBlend mode="normal" in2="effect5_innerShadow_1174_666" result="effect6_innerShadow_1174_666" />
			</filter>
		</defs>
	</svg>
);

const DashboardIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
		<path d="M10 2H14V6" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M9 7L14 2" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M6 3H3.6C3.03995 3 2.75992 3 2.54601 3.10899C2.35785 3.20487 2.20487 3.35785 2.10899 3.54601C2 3.75992 2 4.03995 2 4.6V12.4C2 12.9601 2 13.2401 2.10899 13.454C2.20487 13.6422 2.35785 13.7951 2.54601 13.891C2.75992 14 3.03995 14 3.6 14H11.4C11.9601 14 12.2401 14 12.454 13.891C12.6422 13.7951 12.7951 13.6422 12.891 13.454C13 13.2401 13 12.9601 13 12.4V10" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
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
