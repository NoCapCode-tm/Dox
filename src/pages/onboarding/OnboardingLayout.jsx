import { Routes, Route } from 'react-router-dom';
import Step1PersonalInfo from './Step1PersonalInfo.jsx';
import Step2EmergencyInfo from './Step2EmergencyInfo.jsx';
import Step3IdentityInfo from './Step3IdentityInfo.jsx';
import Step4EducationInfo from './Step4EducationInfo.jsx';
import Step5Profile from './Step5Profile.jsx';
import Step6BankDetails from './Step6BankDetails.jsx';
import Step7SystemInfo from './Step7SystemInfo.jsx';
import Step8Declaration from './Step8Declaration.jsx';

/**
 * OnboardingLayout — wrapped layout for the 8-step onboarding flow.
 */
const OnboardingLayout = () => {
  return (
    <Routes>
      <Route path="step1" element={<Step1PersonalInfo />} />
      <Route path="step2" element={<Step2EmergencyInfo />} />
      <Route path="step3" element={<Step3IdentityInfo />} />
      <Route path="step4" element={<Step4EducationInfo />} />
      <Route path="step5" element={<Step5Profile />} />
      <Route path="step6" element={<Step6BankDetails />} />
      <Route path="step7" element={<Step7SystemInfo />} />
      <Route path="step8" element={<Step8Declaration />} />
    </Routes>
  );
};

export default OnboardingLayout;