import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../pages/SignIn.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import LegalAgreements from '../pages/LegalAgreements.jsx'
import CompanyDocs from '../pages/CompanyDocs.jsx'
import HRReview from '../pages/HRReview.jsx'
import OnboardingLayout from '../pages/onboarding/OnboardingLayout.jsx'

/**
 * AppRouter — defines all client-side routes for the application.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/legal" element={<LegalAgreements />} />
        <Route path="/company-docs" element={<CompanyDocs />} />
        <Route path="/hr-review" element={<HRReview />} />
        <Route path="/onboarding/*" element={<OnboardingLayout />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter