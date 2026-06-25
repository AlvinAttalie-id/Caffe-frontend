import { AnimatePresence } from "motion/react";
import { useToastContext } from "@app/providers/ToastProvider";
import { Toast } from "@components/ui/Toast";

export function ToastContainer() {
  const { toasts, dismiss } = useToastContext();

  return (
    <div
      className="absolute top-12 left-0 right-0 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}
