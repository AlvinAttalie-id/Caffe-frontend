import React, { memo } from "react";
import { useLocation } from "react-router";
import { Home, ShoppingCart, User, Gift, Coffee } from "lucide-react";
import { ROUTES } from "@app/router/routes";
import { useAppContext } from "@app/providers/AppProvider";
import { B } from "@styles/theme";
import { Screen } from "@types/navigation";
import { useAppNav } from "@hooks/useAppNav";

const TAB_ROUTES: string[] = [
  ROUTES.DASHBOARD,
  ROUTES.MENU,
  ROUTES.CART,
  ROUTES.LOYALTY,
  ROUTES.PROFILE,
];

const PATH_TO_SCREEN: { path: string; screen: Screen }[] = [
  { path: ROUTES.DASHBOARD, screen: "home" },
  { path: ROUTES.MENU, screen: "menu" },
  { path: ROUTES.CART, screen: "cart" },
  { path: ROUTES.LOYALTY, screen: "loyalty" },
  { path: ROUTES.PROFILE, screen: "profile" },
];

export function isTabRoute(pathname: string): boolean {
  return TAB_ROUTES.includes(pathname);
}

function getActiveScreen(pathname: string): Screen {
  const match = PATH_TO_SCREEN.find(({ path }) => pathname === path);
  return match?.screen ?? "home";
}

const TABS: { id: Screen; Icon: typeof Home; label: string }[] = [
  { id: "home", Icon: Home, label: "Home" },
  { id: "menu", Icon: Coffee, label: "Menu" },
  { id: "cart", Icon: ShoppingCart, label: "Cart" },
  { id: "loyalty", Icon: Gift, label: "Rewards" },
  { id: "profile", Icon: User, label: "Profile" },
];

export const BottomNav = memo(function BottomNav() {
  const location = useLocation();
  const nav = useAppNav();
  const { cartCount } = useAppContext();
  const active = getActiveScreen(location.pathname);

  return (
    <nav
      className="border-t border-slate-100 bg-white px-2 pb-2 flex-shrink-0 relative z-10"
      aria-label="Main navigation"
    >
      <div className="flex">
        {TABS.map(({ id, Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => nav(id)}
              className="flex-1 flex flex-col items-center py-2 gap-0.5 relative"
            >
              {id === "cart" && cartCount > 0 && (
                <span
                  className="absolute top-1.5 right-3.5 min-w-[16px] h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1"
                  style={{ background: B.error }}
                >
                  {cartCount}
                </span>
              )}
              <div
                className="p-1.5 rounded-xl"
                style={{ background: isActive ? B.primary : "transparent" }}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? "text-[#1E293B]" : "text-slate-400"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});
