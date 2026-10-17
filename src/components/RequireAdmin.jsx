import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAdmin() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'Admin') return <Navigate to="/" replace />;

  return <Outlet />;
}