import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  MapPin,
  User,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle2,
  Check
} from "lucide-react";
import { useLocation } from "react-router";
import { useAppNav } from "@hooks/useAppNav";
import { useOrderDetail, useTracking } from "@features/orders/hooks/useOrders";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

const TIMELINE_LABELS = [
  "Order Received",
  "Payment Confirmed",
  "Preparing Your Order",
  "Ready for Pickup",
  "Completed",
];

const STATUS_ACTIVE_INDEX: Record<string, number> = {
  pending: 0,
  preparing: 2,
  ready_for_pickup: 3,
  completed: 4,
  cancelled: -1,
};

const STATUS_PROGRESS: Record<string, string> = {
  pending: "25%",
  preparing: "60%",
  ready_for_pickup: "85%",
  completed: "100%",
  cancelled: "0%",
};

function formatTime(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatStatusLabel(status?: string) {
  if (!status) return "Processing";
  return status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function buildSteps(status: string, createdAt?: string, updatedAt?: string) {
  const activeIndex = STATUS_ACTIVE_INDEX[status] ?? 0;
  const baseTime = createdAt ? formatTime(createdAt) : "—";
  const updatedTime = updatedAt ? formatTime(updatedAt) : "—";

  return TIMELINE_LABELS.map((label, index) => {
    const done = status === "completed" ? true : index < activeIndex;
    const active = status !== "completed" && status !== "cancelled" && index === activeIndex;
    const time =
      index === 0
        ? baseTime
        : index === activeIndex && active
          ? updatedTime
          : done
            ? updatedTime
            : "—";

    return { label, time, done, active };
  });
}

export function TrackingScreen() {
  const nav = useAppNav();
  const location = useLocation();
  const orderNumber = (location.state as { orderNumber?: string } | null)?.orderNumber || "";
  const { data: tracking } = useTracking(orderNumber);
  const { data: order } = useOrderDetail(orderNumber);

  const status = tracking?.status || order?.status || "preparing";
  const steps = useMemo(
    () => buildSteps(status, tracking?.created_at || order?.created_at, tracking?.updated_at),
    [status, tracking?.created_at, tracking?.updated_at, order?.created_at]
  );
  const progressWidth = STATUS_PROGRESS[status] || "60%";
  const statusLabel = formatStatusLabel(status);
  const summaryItems = order?.items || [];
  const subtotal = Number(order?.subtotal || 0);
  const deliveryFee = Number(order?.delivery_fee || 0);
  const discount = Number(order?.discount_amount || 0);
  const total = Number(order?.total || 0);
  const pickupStore = tracking?.store || order?.store?.name || "Caffe Brew";
  const addressLine = order?.address?.address_line;
  const addressName = order?.address?.receiver_name;

  const getLineColor = (index: number) => {
    const currentStep = steps[index];
    const nextStep = steps[index + 1];

    if (!nextStep) return "transparent";

    if (currentStep.done && !currentStep.active && nextStep.done && !nextStep.active) {
      return B.success; // Completed: Green
    }
    if (currentStep.active || (currentStep.done && nextStep.active)) {
      return B.primary; // Current: Primary brand color
    }
    return "#E2E8F0"; // Pending: Light gray
  };

  const getTextStyle = (step: typeof steps[number]) => {
    if (step.active) {
      return {
        fontWeight: 700,
        color: B.primary,
      };
    }
    if (step.done) {
      return {
        fontWeight: 500,
        color: B.primary,
      };
    }
    return {
      fontWeight: 500,
      color: "#94A3B8", // Pending: Muted gray
    };
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      {/* Top Header */}
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0 border-b border-slate-100">
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-5 pb-8 space-y-6">
        {/* Success Message Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 text-left"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-emerald-800">
              Your order has been placed successfully.
            </p>
            <p className="text-[10px] text-emerald-600 mt-0.5 font-medium">
              Order ID: {orderNumber || order?.order_number || "—"}
            </p>
          </div>
        </motion.div>

        {/* Progress Card (Estimated Time & Prominent Progress Indicator) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 text-left space-y-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">
                Estimated Arrival
              </p>
              <p className="text-3xl font-extrabold flex items-baseline gap-2" style={{ color: B.primary }}>
                {formatTime(tracking?.updated_at || order?.created_at)}
                <span className="text-xs font-bold" style={{ color: B.secondary }}>
                  • {pickupStore}
                </span>
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-700 bg-amber-50 border border-amber-100 animate-pulse">
              {statusLabel}
            </span>
          </div>

          <div className="space-y-2">
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: progressWidth }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full relative"
                style={{ background: `linear-gradient(to right, ${B.secondary}, ${B.accent})` }}
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 bg-white/20 skew-x-12"
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1">
              <span>Placed</span>
              <span style={{ color: B.secondary }}>Preparing</span>
              <span>Arrived</span>
            </div>
          </div>
        </motion.div>

        {/* Order Status Timeline Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 text-left">
          <h3 className="font-extrabold text-sm mb-6 flex items-center gap-2" style={{ color: B.primary }}>
            <Clock className="w-4 h-4" style={{ color: B.secondary }} />
            Status Timeline
          </h3>
          <div className="relative pl-2 space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex gap-4 relative"
              >
                <div className="flex flex-col items-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 + i * 0.1 }}
                    className="w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                    style={{
                      background: step.active
                        ? B.primary
                        : step.done && !step.active
                        ? "#FFFFFF"
                        : "#FFFFFF",
                      border: `2px solid ${
                        step.active
                          ? B.primary
                          : step.done && !step.active
                          ? B.success
                          : "#CBD5E1"
                      }`,
                      boxShadow: step.active ? `0 0 8px ${B.primary}40` : "none",
                    }}
                  >
                    {step.active ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    ) : step.done ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                    ) : null}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div
                      className="absolute top-7 w-[2px] bottom-[-24px] left-1/2 -translate-x-1/2"
                      style={{
                        background: getLineColor(i),
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-sm transition-colors duration-200"
                      style={getTextStyle(step)}
                    >
                      {step.label}
                    </p>
                    <span
                      className="text-[11px] font-bold text-right"
                      style={{
                        color: step.done || step.active ? B.secondary : `${B.secondary}80`
                      }}
                    >
                      {step.time}
                    </span>
                  </div>
                  {step.active && (
                    <p className="text-xs text-slate-400 mt-1">
                      Your barista is crafting your order
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#EFF6FF" }}
            >
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">
                {order?.order_type === "delivery" ? "Delivery Address" : "Pickup Store"}
              </h4>
              <p className="font-bold text-sm mt-0.5" style={{ color: B.primary }}>
                {order?.order_type === "delivery" ? addressName || "Recipient" : pickupStore}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {order?.order_type === "delivery"
                  ? addressLine || "Address not available"
                  : "Your order will be ready for pickup at this store"}
              </p>
            </div>
          </div>
        </div>

        {/* Courier Information Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0"
                style={{ color: B.primary }}
              >
                <User className="w-6 h-6 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white w-4 h-4 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">
                Courier Info
              </h4>
              <p className="font-extrabold text-sm" style={{ color: B.primary }}>
                Hendra Wijaya
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="text-amber-500 font-extrabold">★ 4.9</span> • Honda Vario (B 1234 ABC)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                style={{ color: B.secondary }}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <a
                href="tel:+628123456789"
                className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-center"
                style={{ color: B.secondary }}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left">
          <h3 className="font-bold text-sm mb-4" style={{ color: B.primary }}>
            Order Summary
          </h3>
          <div className="space-y-3">
            {summaryItems.length > 0 ? (
              summaryItems.map((item: any, i: number) => (
                <div key={item.id || i} className="flex items-start justify-between">
                  <div className="text-sm">
                    <span className="font-bold" style={{ color: B.primary }}>
                      {item.quantity}×
                    </span>{" "}
                    <span className="text-slate-600">{item.product?.name || item.product_name}</span>
                    {item.size && (
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Size: {item.size}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: B.primary }}>
                    {fmt(Number(item.price) * Number(item.quantity))}
                  </span>
                </div>
              ))
            ) : (
              [
                { name: "Caramel Macchiato", size: "L", qty: 1, price: 55000 },
                { name: "Butter Croissant", size: "", qty: 2, price: 70000 },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="text-sm">
                    <span className="font-bold" style={{ color: B.primary }}>
                      {item.qty}×
                    </span>{" "}
                    <span className="text-slate-600">{item.name}</span>
                    {item.size && (
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Size: {item.size}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: B.primary }}>
                    {fmt(item.price)}
                  </span>
                </div>
              ))
            )}
            <div className="h-px bg-slate-100 my-2" />
            <div className="space-y-2 text-xs text-slate-500 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{fmt(subtotal || 125000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{fmt(deliveryFee || 15000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-emerald-500">-{fmt(discount || 45000)}</span>
              </div>
            </div>
            <div className="h-px bg-slate-100 my-2" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-extrabold text-sm" style={{ color: B.primary }}>
                Total
              </span>
              <span className="font-extrabold text-base" style={{ color: B.primary }}>
                {fmt(total || 95000)}
              </span>
            </div>
          </div>
        </div>

        {/* Low-emphasis Secondary Actions */}
        <div className="pt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => nav("history")}
            className="w-full py-3.5 rounded-2xl text-sm font-extrabold border transition-colors flex items-center justify-center gap-2 cursor-pointer"
            style={{
              borderColor: B.secondary + "40",
              color: B.secondary,
              background: "transparent",
            }}
          >
            View Order History
          </button>
          <button
            type="button"
            onClick={() => nav("home", "back")}
            className="w-full py-3.5 rounded-2xl text-sm font-extrabold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            style={{
              color: B.primary,
              background: "transparent",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
