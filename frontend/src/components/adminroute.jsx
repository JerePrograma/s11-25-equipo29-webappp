export default function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user?.logged) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/no-autorizado" />;

  return children;
}
