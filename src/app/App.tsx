import { AppProvider } from "@app/providers/AppProvider";
import { ToastProvider } from "@app/providers/ToastProvider";
import { AppRouter } from "@app/router";

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ToastProvider>
  );
}
