import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
