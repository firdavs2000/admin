import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProtectedRoute({ children }) {
  const user = useAuth((s) => s.user);

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
}
