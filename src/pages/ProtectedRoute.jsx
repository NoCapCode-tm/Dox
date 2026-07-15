import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/employeeApi";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getCurrentUser();
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        console.log(error.mesage)
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <Loader fullScreen={true} message="Authenticating..." />;
  }

  return authenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;