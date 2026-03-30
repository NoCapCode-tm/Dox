import AppRouter from './routes/AppRouter.jsx'
import { OnboardingProvider } from './context/OnboardingContext.jsx'

/**
 * App — root component, renders the router.
 */
const App = () => {
  return (
    <OnboardingProvider>
      <AppRouter />
    </OnboardingProvider>
  )
}

export default App