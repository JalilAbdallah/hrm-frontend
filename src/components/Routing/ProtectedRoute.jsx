import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading indicator
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
