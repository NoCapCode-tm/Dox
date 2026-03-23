import { Routes, Route } from 'react-router-dom';
import Step1PersonalInfo from './Step1PersonalInfo.jsx';

/**
 * OnboardingLayout — wrapped layout for the 8-step onboarding flow.
 */
const OnboardingLayout = () => {
  return (
    <Routes>
      <Route path="step1" element={<Step1PersonalInfo />} />
      {/* Additional steps will be added here as they are built */}
    </Routes>
  );
};

export default OnboardingLayout;
