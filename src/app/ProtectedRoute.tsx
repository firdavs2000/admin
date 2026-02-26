import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAuth((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />; 
  }

  return children;
};

export default PrivateRoute;
