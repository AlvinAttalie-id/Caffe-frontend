import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Coffee } from "lucide-react";
import { B } from "@styles/theme";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const ts = [160, 420, 800, 1150, 1700].map((ms, i) =>
      setTimeout(() => setStep(i + 1), ms)
    );
    const done = setTimeout(onDone, 2500);
    return () => {
      ts.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: B.primary }}
    >
      {/* BG photo — step 1 */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 0.18 : 0 }}
        transition={{ duration: 0.9 }}
      >
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1700&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>
      {/* Glow — step 2 */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(212,163,115,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* Logo — step 2 scale in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.82 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-5"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center border border-white/10"
            style={{
              background: "rgba(212,163,115,0.16)",
              backdropFilter: "blur(14px)",
            }}
          >
            <Coffee className="w-12 h-12" style={{ color: B.accent }} />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white text-4xl font-black tracking-tight"
        >
          Brew &amp; Co.
        </motion.h1>

        {/* Tagline — step 3 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
          transition={{ duration: 0.45 }}
          className="text-white/40 mt-2 text-[11px] tracking-[0.32em] uppercase font-semibold"
        >
          Premium Coffee Experience
        </motion.p>

        {/* Loading dots — step 4 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 4 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 flex gap-2"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.25, 0.9] }}
              transition={{ duration: 1.1, delay: i * 0.22, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: B.accent }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
