import { motion } from "motion/react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { ToastItem, ToastType } from "@app/providers/ToastProvider";
import { B } from "@styles/theme";

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const TOAST_STYLES: Record<
  ToastType,
  { accent: string; bg: string; border: string; Icon: typeof CheckCircle2 }
> = {
  success: {
    accent: B.success,
    bg: "#F0FDF4",
    border: "#BBF7D0",
    Icon: CheckCircle2,
  },
  error: {
    accent: B.error,
    bg: "#FEF2F2",
    border: "#FECACA",
    Icon: AlertCircle,
  },
  warning: {
    accent: B.warning,
    bg: "#FFFBEB",
    border: "#FDE68A",
    Icon: AlertTriangle,
  },
  info: {
    accent: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    Icon: Info,
  },
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const style = TOAST_STYLES[toast.type];
  const Icon = style.Icon;

  return (
    <motion.div
      layout
      role="alert"
      aria-live="polite"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="pointer-events-auto w-full max-w-[340px] flex items-center gap-3 px-4 py-3.5 shadow-lg border"
      style={{
        borderRadius: 16,
        background: style.bg,
        borderColor: style.border,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1), 0 2px 8px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${style.accent}18` }}
      >
        <Icon className="w-4 h-4" style={{ color: style.accent }} />
      </div>
      <p className="flex-1 text-sm font-semibold leading-snug" style={{ color: B.primary }}>
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
