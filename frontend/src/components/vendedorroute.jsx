import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";

function VendedorRoute({ children }) {
  const { user } = useAuth();

  if (!user || !user.logged) {
    return <Navigate to="/login" replace />;
  }

  // ⚠️ Solo vendedores pueden entrar
  if (user.role !== "vendedor" && user.role !== "admin") {
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
}

export default VendedorRoute;

