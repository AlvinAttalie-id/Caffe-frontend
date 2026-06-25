import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { BottomNav, isTabRoute } from "@components/common/BottomNav";
import { Dir } from "@types/navigation";
import { EASE, VARIANTS } from "@lib/utils/animation";
import { B } from "@styles/theme";

interface LocationState {
  direction?: Dir;
}

interface PhoneShellProps {
  showBottomNav?: boolean;
}

export function PhoneShell({ showBottomNav = false }: PhoneShellProps) {
  const location = useLocation();
  const direction = (location.state as LocationState | null)?.direction ?? "forward";
  const [showProgress, setShowProgress] = useState(false);
  const bottomNavVisible = showBottomNav && isTabRoute(location.pathname);

  useEffect(() => {
    setShowProgress(true);
    const timer = setTimeout(() => setShowProgress(false), 550);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)" }}
    >
      <div className="relative flex-shrink-0" style={{ width: 390, height: 844 }}>
        <div
          className="absolute inset-0 rounded-[44px] shadow-[0_40px_120px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)]"
          style={{ background: "#0F172A" }}
        />
        <div className="absolute -left-[3px] top-[120px] w-1 h-8 rounded-l-full bg-slate-700" />
        <div className="absolute -left-[3px] top-[160px] w-1 h-12 rounded-l-full bg-slate-700" />
        <div className="absolute -left-[3px] top-[188px] w-1 h-12 rounded-l-full bg-slate-700" />
        <div className="absolute -right-[3px] top-[148px] w-1 h-16 rounded-r-full bg-slate-700" />

        <div
          className="absolute overflow-hidden flex flex-col"
          style={{ inset: 4, borderRadius: 40, background: B.bg }}
        >
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-8 rounded-full z-50"
            style={{ background: "#0F172A" }}
          />

          <AnimatePresence>
            {showProgress && (
              <motion.div
                key="bar"
                className="absolute top-0 inset-x-0 z-50"
                style={{ height: 2.5, background: B.accent, transformOrigin: "left center" }}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
          </AnimatePresence>

          <div className="flex-1 min-h-0 relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.main
                key={location.pathname}
                className="absolute inset-0 overflow-hidden"
                variants={VARIANTS[direction]}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: direction === "fade" ? 0.25 : 0.25, ease: EASE }}
              >
                <Outlet />
              </motion.main>
            </AnimatePresence>
          </div>

          {bottomNavVisible && <BottomNav />}
        </div>
      </div>
    </div>
  );
}
