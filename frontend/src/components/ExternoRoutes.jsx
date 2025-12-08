import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";

export default function ExternoRoute({ children }) {
  const { user } = useAuth();

  if (!user || !user.logged) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "externo") {
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
}
