import React from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useAppNav } from "@hooks/useAppNav";
import { useToast } from "@hooks/useToast";
import { OrderHistorySkeleton } from "@features/orders/components/OrderHistorySkeleton";
import { useOrdersList, useReorderMutation } from "@features/orders/hooks/useOrders";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

const statusColorMap: Record<string, string> = {
  pending: B.warning,
  preparing: B.warning,
  ready_for_pickup: B.secondary,
  completed: B.success,
  cancelled: "#EF4444",
};

export function HistoryScreen() {
  const nav = useAppNav();
  const toast = useToast();
  const { data: orders = [], isLoading } = useOrdersList();
  const reorderMutation = useReorderMutation();

  const handleReorder = async (orderNumber: string) => {
    try {
      await reorderMutation.mutateAsync(orderNumber);
      toast.success("Items added to cart");
      nav("cart");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reorder");
    }
  };

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
        {isLoading ? (
          <OrderHistorySkeleton />
        ) : orders.length === 0 ? (
          <div className="flex-1 flex items-center justify-center pt-20">
            <p className="text-sm text-slate-400">No orders yet.</p>
          </div>
        ) : (
          <div>
            {orders.map((order: any, i: number) => {
              const statusColor = statusColorMap[order.status] || B.success;
              const statusLabel = order.status?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
              const createdAt = order.created_at
                ? new Date(order.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";
              const items = order.items || [];
              const totalItemCount = items.reduce((sum: number, it: any) => sum + (it.quantity || 1), 0);

              return (
                <motion.div
                  key={order.order_number || order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="py-3 border-b border-slate-50 text-left"
                >
                  <span
                    className="inline-block text-[10px] font-extrabold px-2 py-1 rounded-full mb-1.5"
                    style={{ color: statusColor, background: statusColor + "18" }}
                  >
                    {statusLabel}
                  </span>

                  <p className="font-extrabold text-sm mb-1" style={{ color: B.primary }}>
                    {order.store?.name || "Caffe Brew"}
                  </p>

                  <p className="text-xs text-slate-400 mb-1.5">{createdAt}</p>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      {items.map((item: any, j: number) => (
                        <p key={j} className="text-xs text-slate-500">
                          • {item.product?.name || item.product_name}{" "}
                          {item.size ? `(${item.size})` : ""} ×{item.quantity}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 flex-shrink-0">Ordered via App</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="font-extrabold text-sm" style={{ color: B.primary }}>
                      {totalItemCount} item • {fmt(Number(order.total))}
                    </span>
                    <div className="flex gap-2">
                      {(order.status === "preparing" || order.status === "pending") && (
                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          onClick={() => nav("tracking", "forward", { orderNumber: order.order_number })}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border"
                          style={{ borderColor: B.secondary, color: B.secondary }}
                        >
                          Track
                        </motion.button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleReorder(order.order_number)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                        style={{ background: B.secondary }}
                      >
                        Reorder
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
