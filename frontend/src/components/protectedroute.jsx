import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";

/**
 * @param {{ children: React.ReactNode; roles?: string[] }} props
 */
export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user?.logged) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
}
