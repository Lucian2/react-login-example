import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { AuthContextType } from '../../context/AuthProvider';

const RequireAuth = () => {
  const location = useLocation();
  const { user } = useAuth() as AuthContextType;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
