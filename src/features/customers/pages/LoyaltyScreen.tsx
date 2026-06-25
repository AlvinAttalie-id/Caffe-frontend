import React, { useState } from "react";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { useAppContext } from "@app/providers/AppProvider";
import { Spinner } from "@components/ui/spinner";
import { BottomNav } from "@components/common/BottomNav";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";

export function LoyaltyScreen() {
  const nav = useAppNav();
  const { cartCount } = useAppContext();
  const [redeemLoading, setRedeemLoading] = useState<number | null>(null);

  const rewards = [
    { id: 1, name: "Free Americano", pts: 500, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&auto=format" },
    { id: 2, name: "Free Cappuccino", pts: 750, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop&auto=format" },
    { id: 3, name: "10% Off Order", pts: 300, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&auto=format" },
    { id: 4, name: "Free Pastry", pts: 400, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop&auto=format" },
  ];

  const history = [
    { desc: "Order #BRW-0047", date: "22 Jun 2024", pts: 95, pos: true },
    { desc: "Redeemed: Free Americano", date: "20 Jun 2024", pts: -500, pos: false },
    { desc: "Order #BRW-0039", date: "18 Jun 2024", pts: 80, pos: true },
    { desc: "Double Points Weekend", date: "15 Jun 2024", pts: 160, pos: true },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <h1 className="font-extrabold text-lg text-left" style={{ color: B.primary }}>
          My Rewards
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-2">
        <div className="px-5 pt-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl p-6 shadow-lg text-left"
            style={{ background: "linear-gradient(135deg, #1E293B 0%, #2D4065 55%, #1a3a5c 100%)" }}
          >
            <div
              className="absolute -right-10 -top-10 w-52 h-52 rounded-full"
              style={{ background: "rgba(212,163,115,0.12)" }}
            />
            <div
              className="absolute right-2 -bottom-14 w-40 h-40 rounded-full"
              style={{ background: "rgba(212,163,115,0.07)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: B.accent }}
                >
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/75 text-sm font-semibold">Brew Gold Member</span>
              </div>
              <p className="text-white/50 text-xs mb-1">Total Points</p>
              <div className="flex items-baseline gap-2 mb-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-black text-white leading-none"
                >
                  2,450
                </motion.span>
                <span className="font-bold text-sm" style={{ color: B.accent }}>
                  pts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-[10px] mb-1">Platinum in 1,550 pts</p>
                  <div className="w-40 h-1.5 bg-white/15 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "61%" }}
                      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: B.accent }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-[10px]">Est. value</p>
                  <p className="font-extrabold text-sm" style={{ color: B.accent }}>
                    ~4 drinks
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-5 pt-5 text-left">
          <h2 className="font-extrabold text-base mb-3" style={{ color: B.primary }}>
            Redeem Rewards
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50"
              >
                <div className="relative h-24 bg-slate-100">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <div className="p-3">
                  <p className="font-bold text-xs mb-1.5 leading-snug" style={{ color: B.primary }}>
                    {r.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold" style={{ color: B.secondary }}>
                      {r.pts} pts
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setRedeemLoading(r.id);
                        setTimeout(() => setRedeemLoading(null), 1200);
                      }}
                      className="px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white flex items-center gap-1"
                      style={{ background: 2450 >= r.pts ? B.secondary : "#CBD5E1" }}
                    >
                      {redeemLoading === r.id ? <Spinner size="w-3 h-3" /> : "Redeem"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-5 pb-6 text-left">
          <h2 className="font-extrabold text-base mb-3" style={{ color: B.primary }}>
            Points History
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
            {history.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  i > 0 ? "border-t border-slate-50" : ""
                }`}
              >
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: h.pos ? "#F0FDF4" : "#FFF1F2" }}
                >
                  {h.pos ? "⬆️" : "🎁"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: B.primary }}>
                    {h.desc}
                  </p>
                  <p className="text-xs text-slate-400">{h.date}</p>
                </div>
                <span
                  className="font-extrabold text-sm flex-shrink-0"
                  style={{ color: h.pos ? B.success : B.error }}
                >
                  {h.pos ? "+" : ""}
                  {h.pts} pts
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
