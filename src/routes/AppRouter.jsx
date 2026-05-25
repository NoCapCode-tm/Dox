import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../pages/SignIn.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Completion from '../pages/Completion.jsx'
import OnboardingLayout from '../pages/onboarding/OnboardingLayout.jsx'
import Welcome from '../pages/Welcome.jsx'
import CompanyDocs from '../pages/CompanyDocs.jsx'
import LegalAgreements from '../pages/LegalAgreements.jsx'
import ReviewApproval from '../pages/ReviewApproval.jsx'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />
}

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/welcome" replace /> : children
}
/**
 * AppRouter — defines all client-side routes for the application.
 */
const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/completion" element={<PrivateRoute><Completion /></PrivateRoute>} />
        <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
        <Route path="/company-docs" element={<PrivateRoute><CompanyDocs /></PrivateRoute>} />
        <Route path="/legal-agreements" element={<PrivateRoute><LegalAgreements /></PrivateRoute>} />
        <Route path="/review-approval" element={<PrivateRoute><ReviewApproval /></PrivateRoute>} />

        <Route path="/onboarding/*" element={<PrivateRoute><OnboardingLayout /></PrivateRoute>} />

        <Route path="*" element={<Navigate to={isAuthenticated() ? '/welcome' : '/'} replace />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter