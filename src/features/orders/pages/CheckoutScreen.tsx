import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, MapPin, Clock } from "lucide-react";
import { useAppContext } from "@app/providers/AppProvider";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

export function CheckoutScreen() {
  const nav = useAppNav();
  const { cartItems } = useAppContext();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");

  const subtotal = cartItems.reduce((s, item) => s + item.product.price * item.quantity, 0);
  const total = subtotal + (method === "delivery" ? 15000 : 5000);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => nav("cart", "back")}
            className="p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
          </motion.button>
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            Checkout
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-4 space-y-4">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-50 flex">
          {(["pickup", "delivery"] as const).map(opt => (
            <motion.button
              key={opt}
              onClick={() => setMethod(opt)}
              whileTap={{ scale: 0.96 }}
              className="flex-1 py-3 rounded-2xl text-sm font-bold"
              animate={{
                background: method === opt ? B.primary : "transparent",
                color: method === opt ? "#FFF" : "#94A3B8",
              }}
            >
              {opt === "pickup" ? "🏪  Pickup" : "🛵  Delivery"}
            </motion.button>
          ))}
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4" style={{ color: B.secondary }} />
            <h3 className="font-bold text-sm" style={{ color: B.primary }}>
              {method === "pickup" ? "Pickup Store" : "Delivery Address"}
            </h3>
            <button className="ml-auto text-xs font-bold" style={{ color: B.secondary }}>
              Change
            </button>
          </div>
          <AnimatePresence mode="wait">
            {method === "pickup" ? (
              <motion.div
                key="pickup"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-bold text-sm" style={{ color: B.primary }}>
                  Brew &amp; Co. Sudirman
                </p>
                <p className="text-xs text-slate-400">Jl. Jend. Sudirman No. 52, Jakarta</p>
                <p className="text-xs mt-1 font-semibold" style={{ color: B.success }}>
                  Ready in ~10 minutes
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-bold text-sm" style={{ color: B.primary }}>
                  Arjun Pratama
                </p>
                <p className="text-xs text-slate-400">Jl. Menteng Raya No. 14, Jakarta Pusat</p>
                <p className="text-xs mt-1 text-slate-400">Estimated 25–35 minutes</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left">
          <h3 className="font-bold text-sm mb-3" style={{ color: B.primary }}>
            Your Order
          </h3>
          {cartItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between ${
                i > 0 ? "mt-2 pt-2 border-t border-slate-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: B.secondary }}
                >
                  {item.quantity}
                </span>
                <span className="text-sm text-slate-600">
                  {item.product.name} ({item.size})
                </span>
              </div>
              <span className="text-sm font-semibold" style={{ color: B.primary }}>
                {fmt(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left">
          <h3 className="font-bold text-sm mb-4" style={{ color: B.primary }}>
            Payment Summary
          </h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                {method === "pickup" ? "Service Fee" : "Delivery Fee"}
              </span>
              <span>{fmt(method === "pickup" ? 5000 : 15000)}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between font-extrabold">
              <span style={{ color: B.primary }}>Total</span>
              <span style={{ color: B.primary }}>{fmt(total)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl p-4 flex items-center gap-3 text-left" style={{ background: "#EFF6FF" }}>
          <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-blue-700">Estimated Time</p>
            <p className="text-xs text-blue-400">
              {method === "pickup" ? "Ready in 10–15 minutes" : "Delivery in 25–35 minutes"}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-slate-50 px-5 py-4 flex-shrink-0">
        <PrimaryBtn className="w-full py-4" onClick={() => nav("payment")}>
          Choose Payment Method
        </PrimaryBtn>
      </div>
    </div>
  );
}
