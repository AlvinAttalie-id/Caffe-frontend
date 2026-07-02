import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, CreditCard } from "lucide-react";
import { useLocation } from "react-router";
import { useAppContext } from "@app/providers/AppProvider";
import { useCheckoutMutation } from "@features/orders/hooks/useOrders";
import { useAppNav } from "@hooks/useAppNav";
import { useToast } from "@hooks/useToast";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

export function PaymentScreen() {
  const nav = useAppNav();
  const location = useLocation();
  const toast = useToast();
  const { summary, selectedStore } = useAppContext();
  const checkoutMutation = useCheckoutMutation();
  const [selected, setSelected] = useState("gopay");
  const [loading, setLoading] = useState(false);

  const checkoutState = location.state as {
    orderType?: "pickup" | "delivery";
    addressId?: number | null;
  } | null;
  const orderType = checkoutState?.orderType || "pickup";
  const addressId = checkoutState?.addressId ?? null;

  // Map payment UI selection to backend enum
  const paymentMethodMap: Record<string, string> = {
    qris: "midtrans",
    gopay: "midtrans",
    ovo: "midtrans",
    dana: "midtrans",
    shopeepay: "midtrans",
    card: "midtrans",
    cash: "cash",
  };

  const handlePay = async () => {
    if (!selectedStore) {
      toast.error("Please select a store before checkout");
      nav("store");
      return;
    }

    if (orderType === "delivery" && !addressId) {
      toast.error("Delivery address is required");
      nav("checkout", "back");
      return;
    }

    setLoading(true);
    try {
      const result = await checkoutMutation.mutateAsync({
        store_id: selectedStore.id,
        order_type: orderType,
        address_id: orderType === "delivery" ? addressId : null,
        payment_method: paymentMethodMap[selected] || "cash",
        notes: "",
      });
      toast.success("Payment completed successfully");
      nav("tracking", "fade", { orderNumber: result.data?.order_number });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const wallets = [
    { id: "qris", label: "QRIS", desc: "Scan & pay with any e-wallet", emoji: "📱", color: "#E11D48" },
    { id: "gopay", label: "GoPay", desc: "Rp 250,000 balance", emoji: "🟢", color: "#00AA13" },
    { id: "ovo", label: "OVO", desc: "Rp 180,500 balance", emoji: "🟣", color: "#4C3494" },
    { id: "dana", label: "DANA", desc: "Rp 95,000 balance", emoji: "🔵", color: "#118EEA" },
    { id: "shopeepay", label: "ShopeePay", desc: "Rp 320,000 balance", emoji: "🟠", color: "#EE4D2D" },
  ];

  const Radio = ({ id }: { id: string }) => (
    <motion.div
      animate={{
        borderColor: selected === id ? B.accent : "#E2E8F0",
        background: selected === id ? B.accent : "transparent",
      }}
      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
    >
      <AnimatePresence>
        {selected === id && (
          <motion.div
            key="d"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-2 h-2 rounded-full bg-white"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => nav("checkout", "back")}
            className="p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
          </motion.button>
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            Payment Method
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-4 space-y-3">
        <div className="bg-white rounded-3xl p-4 flex items-center justify-between shadow-sm border border-slate-50">
          <div className="text-left">
            <p className="text-xs text-slate-400 mb-0.5">Total Payment</p>
            <p className="text-2xl font-extrabold" style={{ color: B.primary }}>
              {fmt(summary.total)}
            </p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-1 pt-1 text-left">
          E-Wallets &amp; QRIS
        </p>
        {wallets.map((w, i) => (
          <motion.button
            key={w.id}
            onClick={() => setSelected(w.id)}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full bg-white rounded-3xl p-4 flex items-center gap-4 shadow-sm text-left"
            style={{ border: `2px solid ${selected === w.id ? B.accent : "transparent"}` }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: w.color + "18" }}
            >
              {w.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: B.primary }}>
                {w.label}
              </p>
              <p className="text-xs text-slate-400">{w.desc}</p>
            </div>
            <Radio id={w.id} />
          </motion.button>
        ))}
        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-1 pt-1 text-left">
          Cards
        </p>
        <motion.button
          onClick={() => setSelected("card")}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-white rounded-3xl p-4 flex items-center gap-4 shadow-sm text-left"
          style={{ border: `2px solid ${selected === "card" ? B.accent : "transparent"}` }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#F1F5F9" }}
          >
            <CreditCard className="w-6 h-6 text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: B.primary }}>
              Credit / Debit Card
            </p>
            <p className="text-xs text-slate-400">Visa, Mastercard, JCB</p>
          </div>
          <Radio id="card" />
        </motion.button>
      </div>
      <div className="bg-white border-t border-slate-50 px-5 py-4 flex-shrink-0">
        <PrimaryBtn className="w-full py-4" loading={loading} onClick={handlePay}>
          Pay Now — {fmt(summary.total)}
        </PrimaryBtn>
      </div>
    </div>
  );
}
