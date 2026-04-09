import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../pages/SignIn.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Completion from '../pages/Completion.jsx'
import OnboardingLayout from '../pages/onboarding/OnboardingLayout.jsx'
import Welcome from '../pages/Welcome.jsx'
import LegalAgreements from '../pages/LegalAgreements.jsx'
import ReviewApproval from '../pages/ReviewApproval.jsx'
/**
 * AppRouter — defines all client-side routes for the application.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/legal-agreements" element={<LegalAgreements />} />
        <Route path="/review-approval" element={<ReviewApproval/>} />

        <Route path="/onboarding/*" element={<OnboardingLayout />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter