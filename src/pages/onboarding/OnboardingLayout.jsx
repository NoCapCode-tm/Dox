import { Routes, Route } from 'react-router-dom';
import Step1PersonalInfo from './Step1PersonalInfo.jsx';
import Step2EmergencyInfo from './Step2EmergencyInfo.jsx';
import Step3IdentityInfo from './Step3IdentityInfo.jsx';


/**
 * OnboardingLayout — wrapped layout for the 8-step onboarding flow.
 */
const OnboardingLayout = () => {
  return (
    <Routes>
      <Route path="step1" element={<Step1PersonalInfo />} />
      <Route path="step2" element={<Step2EmergencyInfo />} />
      <Route path="step3" element={<Step3IdentityInfo />} />

      {/* Additional steps will be added here as they are built */}
    </Routes>
  );
};

export default OnboardingLayout;