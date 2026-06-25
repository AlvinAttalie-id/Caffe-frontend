import React from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { Home, ShoppingCart, User, Gift, Coffee } from "lucide-react";
import { ROUTES } from "@app/router/routes";
import { useAppContext } from "@app/providers/AppProvider";
import { B } from "@styles/theme";
import { Screen } from "@types/navigation";
import { useAppNav } from "@hooks/useAppNav";

const PATH_TO_SCREEN: { path: string; screen: Screen }[] = [
  { path: ROUTES.DASHBOARD, screen: "home" },
  { path: ROUTES.MENU, screen: "menu" },
  { path: ROUTES.CART, screen: "cart" },
  { path: ROUTES.LOYALTY, screen: "loyalty" },
  { path: ROUTES.PROFILE, screen: "profile" },
];

function getActiveScreen(pathname: string): Screen {
  if (pathname.startsWith(`${ROUTES.MENU}/`)) {
    return "menu";
  }
  const match = PATH_TO_SCREEN.find(({ path }) => pathname === path);
  return match?.screen ?? "home";
}

export function BottomNav() {
  const location = useLocation();
  const nav = useAppNav();
  const { cartCount } = useAppContext();
  const active = getActiveScreen(location.pathname);

  const tabs: { id: Screen; Icon: typeof Home; label: string }[] = [
    { id: "home", Icon: Home, label: "Home" },
    { id: "menu", Icon: Coffee, label: "Menu" },
    { id: "cart", Icon: ShoppingCart, label: "Cart" },
    { id: "loyalty", Icon: Gift, label: "Rewards" },
    { id: "profile", Icon: User, label: "Profile" },
  ];

  return (
    <div className="border-t border-slate-100 bg-white px-2 pb-2 flex-shrink-0">
      <div className="flex">
        {tabs.map(({ id, Icon, label }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => nav(id)}
              whileTap={{ scale: 0.88 }}
              className="flex-1 flex flex-col items-center py-2 gap-0.5 relative"
            >
              {id === "cart" && cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute top-1.5 right-3.5 min-w-[16px] h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1"
                  style={{ background: B.error }}
                >
                  {cartCount}
                </motion.span>
              )}
              <motion.div
                animate={{ background: isActive ? B.primary : "transparent" }}
                transition={{ duration: 0.2 }}
                className="p-1.5 rounded-xl"
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              </motion.div>
              <span className={`text-[10px] font-semibold ${isActive ? "text-[#1E293B]" : "text-slate-400"}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
