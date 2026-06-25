import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";

export function NotificationsScreen() {
  const nav = useAppNav();
  const notifs = [
    { title: "Order Update", msg: "Your Caramel Macchiato is being prepared by our barista! ☕", time: "2 min ago", read: false, emoji: "☕", color: B.secondary },
    { title: "Weekend Special", msg: "Double points on all orders this weekend. Don't miss out!", time: "1 hr ago", read: false, emoji: "🎉", color: "#7C3AED" },
    { title: "Points Earned", msg: "You earned 95 points from your last order. 1,550 pts to Platinum!", time: "2 hr ago", read: true, emoji: "⭐", color: B.warning },
    { title: "New Menu Alert", msg: "Try our new Cold Brew Series — available at all stores now!", time: "Yesterday", read: true, emoji: "🆕", color: "#0891B2" },
    { title: "Order Completed", msg: "Your order #BRW-0039 was completed. Rate your experience!", time: "2 days ago", read: true, emoji: "✅", color: B.success },
    { title: "Free Pastry Reminder", msg: "Your promo for a free pastry expires today. Order now!", time: "3 days ago", read: true, emoji: "🥐", color: B.accent },
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
          <h1 className="font-extrabold text-lg flex-1 text-left" style={{ color: B.primary }}>
            Notifications
          </h1>
          <button className="text-xs font-bold" style={{ color: B.secondary }}>
            Mark all read
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-3 pb-6 space-y-2.5">
        {notifs.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`bg-white rounded-3xl p-4 flex items-start gap-3 shadow-sm ${
              !n.read ? "border-l-4" : "border border-slate-50"
            }`}
            style={{ borderLeftColor: !n.read ? n.color : undefined }}
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: n.color + "18" }}
            >
              {n.emoji}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-0.5 gap-2">
                <p className="font-bold text-sm" style={{ color: B.primary }}>
                  {n.title}
                </p>
                <AnimatePresence>
                  {!n.read && (
                    <motion.div
                      key="dot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: n.color }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{n.msg}</p>
              <p className="text-[11px] text-slate-300 mt-1.5">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
