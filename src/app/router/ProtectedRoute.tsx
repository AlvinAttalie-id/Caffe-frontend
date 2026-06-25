import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@app/router/routes";

export function ProtectedRoute() {
  // Placeholder: always allow access. Wire real auth check here later.
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
