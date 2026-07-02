import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@app/router/routes";
import { useAuth } from "@features/auth/hooks/useAuth";
import { Spinner } from "@components/ui/spinner";
import { B } from "@styles/theme";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: B.bg }}>
        <Spinner size="w-8 h-8" border="border-slate-200 border-t-slate-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
