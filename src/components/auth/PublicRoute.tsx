import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import React from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-page-bg">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-xl"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // If they are logged in and try to access a public-only route (like login/signup),
    // redirect them to the dashboard or where they came from.
    const from = (location.state as any)?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
