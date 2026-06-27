import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useAppNav } from "@hooks/useAppNav";
import { OrderHistorySkeleton } from "@features/orders/components/OrderHistorySkeleton";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

const itemCount = (items: string[]) =>
  items.reduce((sum, item) => {
    const match = item.match(/×(\d+)$/);
    return sum + (match ? parseInt(match[1], 10) : 1);
  }, 0);

export function HistoryScreen() {
  const nav = useAppNav();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 380);
    return () => clearTimeout(t);
  }, []);

  const orders = [
    {
      id: "#BRW-20240622-0047",
      store: "Brew & Co. Sudirman",
      date: "22 Jun 2024 · 09:41",
      items: ["Caramel Macchiato L", "Butter Croissant ×2"],
      total: 95000,
      status: "Preparing",
      statusColor: B.warning,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: "#BRW-20240620-0039",
      store: "Brew & Co. SCBD",
      date: "20 Jun 2024 · 14:22",
      items: ["Classic Cappuccino M", "Cold Brew M"],
      total: 78000,
      status: "Completed",
      statusColor: B.success,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: "#BRW-20240618-0033",
      store: "Brew & Co. Kemang",
      date: "18 Jun 2024 · 11:05",
      items: ["Americano S", "Matcha Oat Latte M"],
      total: 74000,
      status: "Completed",
      statusColor: B.success,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: "#BRW-20240615-0029",
      store: "Brew & Co. Sudirman",
      date: "15 Jun 2024 · 16:30",
      items: ["Caramel Macchiato XL", "Dark Chocolate L"],
      total: 102000,
      status: "Completed",
      statusColor: B.success,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100&h=100&fit=crop&auto=format",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => nav("profile", "back")}
            className="p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
          </motion.button>
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            Order History
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-2 pb-6">
        {!loaded ? (
          <OrderHistorySkeleton />
        ) : (
          <div>
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="py-3 border-b border-slate-50 text-left"
              >
                <span
                  className="inline-block text-[10px] font-extrabold px-2 py-1 rounded-full mb-1.5"
                  style={{ color: order.statusColor, background: order.statusColor + "18" }}
                >
                  {order.status}
                </span>

                <p className="font-extrabold text-sm mb-1" style={{ color: B.primary }}>
                  {order.store}
                </p>

                <p className="text-xs text-slate-400 mb-1.5">{order.date}</p>

                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    {order.items.map((item, j) => (
                      <p key={j} className="text-xs text-slate-500">
                        • {item}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 flex-shrink-0">Ordered via App</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="font-extrabold text-sm" style={{ color: B.primary }}>
                    {itemCount(order.items)} item • {fmt(order.total)}
                  </span>
                  <div className="flex gap-2">
                    {order.status === "Preparing" && (
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => nav("tracking")}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold border"
                        style={{ borderColor: B.secondary, color: B.secondary }}
                      >
                        Track
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => nav("cart")}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                      style={{ background: B.secondary }}
                    >
                      Reorder
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
