import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { BottomNav, isTabRoute } from "@components/common/BottomNav";
import { ToastContainer } from "@components/ui/ToastContainer";
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
    <div className="min-h-screen flex justify-center" style={{ background: B.bg }}>
      <div
        className="relative w-full flex flex-col min-h-screen overflow-hidden"
        style={{ maxWidth: 430, background: B.bg, borderRadius: 0 }}
      >
        <ToastContainer />

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
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={bottomNavVisible ? { paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))" } : undefined}
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

        {bottomNavVisible && (
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="w-full" style={{ maxWidth: 430, margin: "0 auto" }}>
              <BottomNav />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
