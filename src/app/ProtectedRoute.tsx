
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: React.ReactNode;
  permission?: string;
}

export default function ProtectedRoute({ children, permission }: Props) {
  const { user, hasPermission } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;

  if (permission && !hasPermission(permission as any)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

