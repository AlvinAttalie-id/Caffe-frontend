import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Heart, Star, Minus, Plus, Check } from "lucide-react";
import { CartItem } from "@features/orders/types";
import { useAppContext } from "@app/providers/AppProvider";
import { ProductSkeleton } from "@features/products/components/ProductSkeleton";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

export function ProductScreen() {
  const nav = useAppNav();
  const { selectedProduct, favorites, toggleFavorite, addToCart } = useAppContext();
  const [size, setSize] = useState("M");
  const [sugar, setSugar] = useState("Normal");
  const [ice, setIce] = useState("Normal");
  const [toppings, setToppings] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 320);
    return () => clearTimeout(t);
  }, []);

  if (!selectedProduct) {
    return null;
  }

  const product = selectedProduct;
  const isFavorite = favorites.includes(product.id);
  const onFavorite = () => toggleFavorite(product.id);
  const onAddToCart = (item: CartItem) => {
    addToCart(item);
    nav("cart", "up");
  };

  const sizes = [
    { id: "S", extra: 0 },
    { id: "M", extra: 5000 },
    { id: "L", extra: 10000 },
    { id: "XL", extra: 15000 },
  ];
  const sugars = ["0%", "25%", "50%", "Normal", "Extra"];
  const ices = ["No Ice", "Less", "Normal", "Extra"];
  const addons = [
    { id: "cream", label: "Whipped Cream", price: 5000 },
    { id: "choc", label: "Chocolate Drizzle", price: 3000 },
    { id: "java", label: "Java Chips", price: 8000 },
    { id: "pearl", label: "Tapioca Pearl", price: 7000 },
  ];

  const toggleAddon = (id: string) =>
    setToppings(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );

  const sizeExtra = sizes.find(s => s.id === size)?.extra ?? 0;
  const addonExtra = toppings.reduce(
    (s, t) => s + (addons.find(a => a.id === t)?.price ?? 0),
    0
  );
  const total = (product.price + sizeExtra + addonExtra) * qty;

  if (!loaded) return <ProductSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full flex flex-col bg-white"
    >
      <div className="relative h-64 bg-slate-200 flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="absolute top-12 inset-x-4 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => nav("menu", "back")}
            className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: B.primary }} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onFavorite}
            className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
          </motion.button>
        </div>
        {product.badge && (
          <span
            className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold text-white"
            style={{ background: B.secondary }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ background: B.bg }}>
        <div className="bg-white rounded-t-3xl -mt-4 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-2">
            <h1
              className="text-[20px] font-extrabold flex-1 mr-4 leading-snug text-left"
              style={{ color: B.primary }}
            >
              {product.name}
            </h1>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-3 text-left">{product.description}</p>
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <span>🔥 {product.calories} cal</span>
            <span>{product.category === "coffee" ? "☕ Contains caffeine" : "🌿 Caffeine free"}</span>
          </div>
        </div>

        <div className="px-5 pt-2 space-y-4 pb-36 text-left">
          <div className="bg-white rounded-3xl p-4">
            <h3 className="font-extrabold text-sm mb-3" style={{ color: B.primary }}>
              Size
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map(s => (
                <motion.button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  whileTap={{ scale: 0.92 }}
                  className="py-3 rounded-2xl text-center"
                  animate={{ background: size === s.id ? B.primary : "#F8FAFC" }}
                  style={{ border: `1.5px solid ${size === s.id ? B.primary : "#E2E8F0"}` }}
                >
                  <div
                    className="font-extrabold text-sm"
                    style={{ color: size === s.id ? "white" : B.primary }}
                  >
                    {s.id}
                  </div>
                  {s.extra > 0 && (
                    <div
                      className="text-[9px] mt-0.5"
                      style={{ color: size === s.id ? "rgba(255,255,255,0.6)" : "#94A3B8" }}
                    >
                      +{fmt(s.extra)}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4">
            <h3 className="font-extrabold text-sm mb-3" style={{ color: B.primary }}>
              Sugar Level
            </h3>
            <div className="flex flex-wrap gap-2">
              {sugars.map(s => (
                <motion.button
                  key={s}
                  onClick={() => setSugar(s)}
                  whileTap={{ scale: 0.91 }}
                  className="px-4 py-2 rounded-full text-xs font-bold"
                  animate={{ background: sugar === s ? B.accent : "#F8FAFC" }}
                  style={{
                    color: sugar === s ? B.primary : "#94A3B8",
                    border: `1.5px solid ${sugar === s ? B.accent : "#E2E8F0"}`,
                  }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4">
            <h3 className="font-extrabold text-sm mb-3" style={{ color: B.primary }}>
              Ice Level
            </h3>
            <div className="flex flex-wrap gap-2">
              {ices.map(l => (
                <motion.button
                  key={l}
                  onClick={() => setIce(l)}
                  whileTap={{ scale: 0.91 }}
                  className="px-4 py-2 rounded-full text-xs font-bold"
                  animate={{ background: ice === l ? B.accent : "#F8FAFC" }}
                  style={{
                    color: ice === l ? B.primary : "#94A3B8",
                    border: `1.5px solid ${ice === l ? B.accent : "#E2E8F0"}`,
                  }}
                >
                  {l}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4">
            <h3 className="font-extrabold text-sm mb-3" style={{ color: B.primary }}>
              Add-ons
            </h3>
            <div className="space-y-2">
              {addons.map(opt => {
                const sel = toppings.includes(opt.id);
                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => toggleAddon(opt.id)}
                    whileTap={{ scale: 0.98 }}
                    animate={{ background: sel ? "#FFF8F0" : "#F8FAFC" }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl"
                    style={{ border: `1.5px solid ${sel ? B.accent : "#E2E8F0"}` }}
                  >
                    <span className="text-sm font-semibold" style={{ color: B.primary }}>
                      {opt.label}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-400">+{fmt(opt.price)}</span>
                      <motion.div
                        animate={{ background: sel ? B.accent : "#E2E8F0" }}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        <AnimatePresence>
                          {sel && (
                            <motion.div
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-50 px-5 py-4 shadow-lg">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ background: qty > 1 ? B.primary : "#CBD5E1" }}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <motion.span
              key={qty}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="w-7 text-center font-extrabold text-base"
              style={{ color: B.primary }}
            >
              {qty}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQty(q => q + 1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ background: B.primary }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="flex-1 text-right">
            <p className="text-[10px] text-slate-400 font-medium">Total</p>
            <motion.p
              key={total}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-extrabold text-lg"
              style={{ color: B.primary }}
            >
              {fmt(total)}
            </motion.p>
          </div>
        </div>
        <PrimaryBtn
          className="w-full py-4"
          onClick={() => onAddToCart({ product, quantity: qty, size, sugar, ice, toppings })}
        >
          Add to Cart
        </PrimaryBtn>
      </div>
    </motion.div>
  );
}
