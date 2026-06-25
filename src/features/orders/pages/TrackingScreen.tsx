import React, { useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { ChevronLeft, Building2, Clock } from "lucide-react";
import { NavFn } from "@types/navigation";
import { B } from "@styles/theme";

interface TrackingScreenProps {
  nav: NavFn;
}

export function TrackingScreen({ nav }: TrackingScreenProps) {
  useEffect(() => {
    const t = setTimeout(
      () =>
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { x: 0.5, y: 0.5 },
          colors: [B.accent, B.secondary, "#22C55E", "#ffffff", B.primary],
        }),
      400
    );
    return () => clearTimeout(t);
  }, []);

  const steps = [
    { label: "Order Received", time: "09:41", done: true, active: false, emoji: "📱" },
    { label: "Payment Confirmed", time: "09:42", done: true, active: false, emoji: "✅" },
    { label: "Preparing Your Order", time: "09:43", done: true, active: true, emoji: "☕" },
    { label: "Ready for Pickup", time: "~09:55", done: false, active: false, emoji: "🏪" },
    { label: "Completed", time: "—", done: false, active: false, emoji: "🎉" },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => nav("home", "back")}
            className="p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
          </motion.button>
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            Order Tracking
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-slate-400 mb-0.5">Order ID</p>
              <p className="font-extrabold text-sm" style={{ color: B.primary }}>
                #BRW-20240622-0047
              </p>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="px-3 py-1.5 rounded-full text-xs font-extrabold text-amber-700 bg-amber-50"
            >
              Preparing
            </motion.span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${B.secondary}, ${B.accent})` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">Step 3 of 5 — Estimated 12 min</p>
        </motion.div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left">
          <h3 className="font-extrabold text-sm mb-5" style={{ color: B.primary }}>
            Status Timeline
          </h3>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 + i * 0.1 }}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-base flex-shrink-0"
                  style={{
                    background: step.active ? B.secondary : step.done ? "#F0FDF4" : "#F8FAFC",
                    border: `2px solid ${
                      step.active ? B.secondary : step.done ? B.success : "#E2E8F0"
                    }`,
                  }}
                >
                  {step.done && !step.active ? "✓" : step.emoji}
                </motion.div>
                {i < steps.length - 1 && (
                  <div
                    className="w-0.5 h-8 my-1 rounded-full"
                    style={{ background: step.done ? B.success + "60" : "#E2E8F0" }}
                  />
                )}
              </div>
              <div className="flex-1 pt-1.5 pb-2">
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-bold"
                    style={{ color: step.done || step.active ? B.primary : "#CBD5E1" }}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-slate-400">{step.time}</p>
                </div>
                {step.active && <p className="text-xs text-slate-400 mt-0.5">Your barista is crafting your order</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#FFF3E8" }}
            >
              <Building2 className="w-6 h-6" style={{ color: B.secondary }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: B.primary }}>
                Brew &amp; Co. Sudirman
              </p>
              <p className="text-xs text-slate-400">Jl. Jend. Sudirman No. 52</p>
            </div>
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200" style={{ color: B.secondary }}>
              Directions
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left">
          <h3 className="font-bold text-sm mb-3" style={{ color: B.primary }}>
            Order Items
          </h3>
          <div className="space-y-2">
            {[
              { name: "Caramel Macchiato", size: "L", qty: 1, price: 55000 },
              { name: "Butter Croissant", size: "", qty: 2, price: 70000 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  {item.qty}× {item.name}
                  {item.size ? ` (${item.size})` : ""}
                </span>
                <span className="text-sm font-semibold" style={{ color: B.primary }}>
                  {fmt(item.price)}
                </span>
              </div>
            ))}
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between">
              <span className="font-extrabold text-sm" style={{ color: B.primary }}>
                Total
              </span>
              <span className="font-extrabold text-sm" style={{ color: B.primary }}>
                Rp 95,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
