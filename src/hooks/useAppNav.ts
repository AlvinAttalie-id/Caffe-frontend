import { useCallback } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@app/router/routes";
import { useAppContext } from "@app/providers/AppProvider";
import { Dir, NavFn, NavState, Screen } from "@types/navigation";

function screenToPath(screen: Screen, productId?: number): string {
  switch (screen) {
    case "splash":
      return ROUTES.SPLASH;
    case "onboarding":
      return ROUTES.ONBOARDING;
    case "login":
      return ROUTES.LOGIN;
    case "otp":
      return ROUTES.VERIFY_OTP;
    case "home":
      return ROUTES.DASHBOARD;
    case "store":
      return ROUTES.STORE;
    case "menu":
      return ROUTES.MENU;
    case "product":
      return productId != null ? ROUTES.MENU_DETAIL(productId) : ROUTES.MENU;
    case "cart":
      return ROUTES.CART;
    case "checkout":
      return ROUTES.CHECKOUT;
    case "payment":
      return ROUTES.PAYMENT;
    case "tracking":
      return ROUTES.TRACKING;
    case "loyalty":
      return ROUTES.LOYALTY;
    case "favorites":
      return ROUTES.FAVORITES;
    case "history":
      return ROUTES.HISTORY;
    case "profile":
      return ROUTES.PROFILE;
    case "notifications":
      return ROUTES.NOTIFICATIONS;
    default: {
      const _exhaustive: never = screen;
      return _exhaustive;
    }
  }
}

export function useAppNav(): NavFn {
  const navigate = useNavigate();
  const { selectedProduct, productNavIdRef } = useAppContext();

  return useCallback<NavFn>(
    (to, dir = "forward", state?: NavState) => {
      const productId = productNavIdRef.current ?? selectedProduct?.id;
      const path = screenToPath(to, productId ?? undefined);
      navigate(path, { state: { direction: dir, ...state } });
    },
    [navigate, productNavIdRef, selectedProduct?.id]
  );
}
