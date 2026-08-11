import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not Logged In
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Role Not Allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;