import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ONBOARDING } from "@data/mockData";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";

export function OnboardingScreen() {
  const nav = useAppNav();
  const [page, setPage] = useState(0);
  const slide = ONBOARDING[page];

  return (
    <div className="w-full h-full flex flex-col bg-white select-none overflow-hidden">
      {/* Hero Image — Full-width, edge-to-edge, ~48% height */}
      <div
        className="w-full flex-shrink-0 relative overflow-hidden"
        style={{ height: "48%" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={page}
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>

        {/* Subtle bottom fade for smooth transition to white content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)",
          }}
        />

        {/* Skip Button — Floating over hero, top-right */}
        {page < 2 && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => nav("login")}
            className="absolute top-12 right-5 text-xs font-semibold px-4 py-1.5 rounded-full cursor-pointer backdrop-blur-sm z-10"
            style={{ color: "#FFFFFF", background: "rgba(0,0,0,0.25)" }}
          >
            Skip
          </motion.button>
        )}
      </div>

      {/* Content Area — Indicator, Title, Description, Button */}
      <div className="flex-1 flex flex-col px-7 overflow-hidden">
        {/* Page Indicator — 20px below image */}
        <div className="flex justify-center gap-2 flex-shrink-0" style={{ paddingTop: 20 }}>
          {ONBOARDING.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === page ? 20 : 6,
                height: 6,
                borderRadius: 3,
              }}
              style={{
                background: i === page ? B.primary : "#D1D5DB",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          ))}
        </div>

        {/* Title + Description — 24px below indicator */}
        <div className="flex-shrink-0" style={{ paddingTop: 24 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2
                className="leading-tight tracking-tight"
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: B.primary,
                  lineHeight: 1.15,
                }}
              >
                {slide.title}
              </h2>
              <p
                className="mx-auto"
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#64748B",
                  lineHeight: 1.6,
                  maxWidth: 300,
                }}
              >
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Spacer — pushes button to bottom */}
        <div className="flex-1" />

        {/* Primary Button — bottom safe area */}
        <div className="flex-shrink-0 pb-8">
          {page < 2 ? (
            <PrimaryBtn
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
              style={{
                height: 56,
                borderRadius: 18,
                fontWeight: 600,
                fontSize: 15,
              }}
              onClick={() => setPage(p => p + 1)}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </PrimaryBtn>
          ) : (
            <PrimaryBtn
              className="w-full cursor-pointer"
              style={{
                height: 56,
                borderRadius: 18,
                fontWeight: 600,
                fontSize: 15,
              }}
              onClick={() => nav("login")}
            >
              Get Started
            </PrimaryBtn>
          )}
        </div>
      </div>
    </div>
  );
}
