// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  // ⛔ Si no está logueado → Login
  if (!user?.logged) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Si hay roles definidos y el usuario no pertenece → No autorizado
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // ✔ Todo bien → Renderiza el contenido protegido
  return children;
}

