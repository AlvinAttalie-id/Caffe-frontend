import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, X, Minus, Plus, Tag, MessageCircle, Award } from "lucide-react";
import { useAppContext } from "@app/providers/AppProvider";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { useAppNav } from "@hooks/useAppNav";
import { useToast } from "@hooks/useToast";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

export function CartScreen() {
  const nav = useAppNav();
  const toast = useToast();
  const { cartItems, updateCartQty, removeFromCart } = useAppContext();

  const onUpdateQty = updateCartQty;
  const handleRemove = (idx: number) => {
    const willBeEmpty = cartItems.length === 1;
    removeFromCart(idx);
    if (willBeEmpty) {
      toast.success("Cart cleared successfully");
    } else {
      toast.success("Item removed from cart");
    }
  };
  const onRemove = handleRemove;
  const [voucher, setVoucher] = useState("");
  const [applied, setApplied] = useState(false);
  const [notes, setNotes] = useState("");

  const subtotal = cartItems.reduce((s, item) => s + item.product.price * item.quantity, 0);
  const discount = applied ? 10000 : 0;
  const total = subtotal - discount + 5000;

  if (cartItems.length === 0) {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
        <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
          <h1 className="font-extrabold text-lg text-left" style={{ color: B.primary }}>
            My Cart
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: "#FFF3E8" }}
          >
            <ShoppingCart className="w-10 h-10" style={{ color: B.accent }} />
          </motion.div>
          <div className="text-center">
            <h3 className="font-extrabold text-lg" style={{ color: B.primary }}>
              Your cart is empty
            </h3>
            <p className="text-slate-400 text-sm mt-1">Browse our menu and add your favorites</p>
          </div>
          <PrimaryBtn className="px-8 py-3" onClick={() => nav("menu")}>
            Browse Menu
          </PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            My Cart
          </h1>
          <span className="text-sm text-slate-400">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-4 space-y-3">
        <AnimatePresence>
          {cartItems.map((item, idx) => (
            <motion.div
              key={`${item.product.id}-${item.size}-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-sm" style={{ color: B.primary }}>
                      {item.product.name}
                    </h3>
                    <motion.button whileTap={{ scale: 0.84 }} onClick={() => onRemove(idx)} className="p-1 -mr-1 -mt-0.5">
                      <X className="w-4 h-4 text-slate-300" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.size} · {item.sugar} sugar · {item.ice} ice
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 bg-slate-50 rounded-xl p-0.5">
                      <motion.button
                        whileTap={{ scale: 0.84 }}
                        onClick={() => (item.quantity > 1 ? onUpdateQty(idx, item.quantity - 1) : onRemove(idx))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                        style={{ background: B.primary }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="w-6 text-center font-extrabold text-sm"
                        style={{ color: B.primary }}
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button
                        whileTap={{ scale: 0.84 }}
                        onClick={() => onUpdateQty(idx, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                        style={{ background: B.primary }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                    <span className="font-extrabold text-sm" style={{ color: B.primary }}>
                      {fmt(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4" style={{ color: B.secondary }} />
            <h3 className="font-bold text-sm" style={{ color: B.primary }}>
              Voucher Code
            </h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={voucher}
              onChange={e => setVoucher(e.target.value.toUpperCase())}
              placeholder="Enter voucher code"
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-700 outline-none placeholder-slate-300"
            />
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                if (voucher) setApplied(true);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0"
              style={{ background: applied ? B.success : B.secondary }}
            >
              {applied ? "✓" : "Apply"}
            </motion.button>
          </div>
          <AnimatePresence>
            {applied && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs mt-2"
                style={{ color: B.success }}
              >
                ✓ BREW10 applied — Rp 10,000 off!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 text-left">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4" style={{ color: B.secondary }} />
            <h3 className="font-bold text-sm" style={{ color: B.primary }}>
              Order Notes
            </h3>
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any special requests for your barista..."
            rows={2}
            className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-700 outline-none placeholder-slate-300 resize-none"
          />
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left">
          <h3 className="font-bold text-sm mb-4" style={{ color: B.primary }}>
            Order Summary
          </h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold" style={{ color: B.primary }}>
                {fmt(subtotal)}
              </span>
            </div>
            {discount > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between text-sm">
                <span style={{ color: B.success }}>Discount</span>
                <span className="font-semibold" style={{ color: B.success }}>
                  -{fmt(discount)}
                </span>
              </motion.div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service Fee</span>
              <span className="font-semibold" style={{ color: B.primary }}>
                {fmt(5000)}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between">
              <span className="font-extrabold" style={{ color: B.primary }}>
                Total
              </span>
              <span className="font-extrabold text-lg" style={{ color: B.primary }}>
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-4 flex items-center gap-3 text-left" style={{ background: "#FFF8F0" }}>
          <Award className="w-5 h-5 flex-shrink-0" style={{ color: B.secondary }} />
          <p className="text-sm" style={{ color: B.secondary }}>
            <strong>+{Math.floor(total / 1000)} points</strong> earned with this order!
          </p>
        </div>
      </div>

      <div className="bg-white border-t border-slate-50 px-5 py-4 flex-shrink-0">
        <PrimaryBtn className="w-full py-4 flex justify-between px-6" onClick={() => nav("checkout")}>
          <span>Proceed to Checkout</span>
          <span>{fmt(total)}</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
