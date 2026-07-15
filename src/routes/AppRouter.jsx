import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../pages/SignIn.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Completion from '../pages/Completion.jsx'
import OnboardingLayout from '../pages/onboarding/OnboardingLayout.jsx'
import Welcome from '../pages/Welcome.jsx'
import CompanyDocs from '../pages/CompanyDocs.jsx'
import LegalAgreements from '../pages/LegalAgreements.jsx'
import ReviewApproval from '../pages/ReviewApproval.jsx'
import ProtectedRoute from "../pages/ProtectedRoute.jsx";


const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
     <Routes>
  <Route path="/" element={<SignIn />} />

  <Route
    path="/welcome"
    element={
      <ProtectedRoute>
        <Welcome />
      </ProtectedRoute>
    }
  />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/completion"
    element={
      <ProtectedRoute>
        <Completion />
      </ProtectedRoute>
    }
  />

  <Route
    path="/company-docs"
    element={
      <ProtectedRoute>
        <CompanyDocs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/legal-agreements"
    element={
      <ProtectedRoute>
        <LegalAgreements />
      </ProtectedRoute>
    }
  />

  <Route
    path="/review-approval"
    element={
      <ProtectedRoute>
        <ReviewApproval />
      </ProtectedRoute>
    }
  />

  <Route
    path="/onboarding/*"
    element={
      <ProtectedRoute>
        <OnboardingLayout />
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  )
}

export default AppRouter