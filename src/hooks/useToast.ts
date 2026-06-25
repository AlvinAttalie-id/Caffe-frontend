import { useCallback, useMemo } from "react";
import {
  ShowToastOptions,
  ToastType,
  useToastContext,
} from "@app/providers/ToastProvider";

interface ToastFn {
  (message: string, duration?: number): string;
}

export interface UseToastReturn {
  toast: (options: ShowToastOptions) => string;
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
  info: ToastFn;
  dismiss: (id: string) => void;
}

export function useToast(): UseToastReturn {
  const { show, dismiss } = useToastContext();

  const createTypedToast = useCallback(
    (type: ToastType): ToastFn =>
      (message, duration) =>
        show({ type, message, duration }),
    [show]
  );

  const success = useCallback(createTypedToast("success"), [createTypedToast]);
  const error = useCallback(createTypedToast("error"), [createTypedToast]);
  const warning = useCallback(createTypedToast("warning"), [createTypedToast]);
  const info = useCallback(createTypedToast("info"), [createTypedToast]);

  return useMemo(
    () => ({
      toast: show,
      success,
      error,
      warning,
      info,
      dismiss,
    }),
    [show, success, error, warning, info, dismiss]
  );
}
