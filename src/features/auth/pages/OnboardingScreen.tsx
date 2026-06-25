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
    <div className="w-full h-full flex flex-col bg-white">
      <div className="relative flex-[1.3] overflow-hidden bg-slate-200">
        <AnimatePresence mode="wait">
          <motion.img
            key={page}
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.55))",
          }}
        />
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => nav("login")}
          className="absolute top-12 right-5 px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-sm"
        >
          Skip
        </motion.button>
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {ONBOARDING.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === page ? 24 : 8 }}
              className="h-2 rounded-full bg-white"
              style={{ opacity: i === page ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 px-8 py-7 flex flex-col">
        <div className="text-3xl mb-3">{slide.emoji}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-[22px] font-extrabold mb-3 leading-snug" style={{ color: B.primary }}>
              {slide.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-auto">
          {page < 2 ? (
            <PrimaryBtn className="w-full py-4" onClick={() => setPage(p => p + 1)}>
              Continue <ArrowRight className="w-4 h-4" />
            </PrimaryBtn>
          ) : (
            <PrimaryBtn className="w-full py-4" onClick={() => nav("login")}>
              Get Started
            </PrimaryBtn>
          )}
        </div>
      </div>
    </div>
  );
}
