import { AppProvider } from "@app/providers/AppProvider";
import { ToastProvider } from "@app/providers/ToastProvider";
import { AppRouter } from "@app/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@lib/react-query";
import { AuthProvider } from "@features/auth/hooks/useAuth";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <AppProvider>
            <AppRouter />
          </AppProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
