import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bell, MapPin, ChevronDown, Search, Trophy, Clock, Building2 } from "lucide-react";
import { useAppContext } from "@app/providers/AppProvider";
import { HomeSkeleton } from "@features/dashboard/components/HomeSkeleton";
import { ProductCard } from "@features/products/components/ProductCard";
import { PRODUCTS, STORES, BANNERS } from "@data/mockData";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

export function HomeScreen() {
  const nav = useAppNav();
  const { favorites, toggleFavorite, quickAdd, openProduct } = useAppContext();

  const onFavorite = toggleFavorite;
  const onAdd = quickAdd;
  const onProduct = (p: (typeof PRODUCTS)[number]) => {
    openProduct(p);
    nav("product");
  };
  const [loaded, setLoaded] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 430);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 4200);
    return () => clearInterval(t);
  }, []);

  const categories = [
    { id: "all", label: "All" },
    { id: "coffee", label: "Coffee" },
    { id: "noncoffee", label: "Non Coffee" },
    { id: "tea", label: "Tea" },
    { id: "pastry", label: "Pastry" },
    { id: "snacks", label: "Snacks" },
  ];

  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);

  if (!loaded) return <HomeSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col"
      style={{ background: B.bg }}
    >
      {/* Header */}
      <div className="px-5 pt-12 pb-4 bg-white flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Good morning ☀️</p>
            <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
              Arjun Pratama
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => nav("notifications")}
              className="relative w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white" />
            </motion.button>
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2" style={{ borderColor: B.accent }}>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => nav("store")}
          className="flex items-center gap-1.5 mb-3 bg-slate-50 rounded-full px-3 py-1.5"
        >
          <MapPin className="w-3.5 h-3.5" style={{ color: B.secondary }} />
          <span className="text-xs text-slate-600 font-semibold">Brew &amp; Co. Sudirman</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={() => nav("menu")}
          className="w-full flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400">Search your favorite drinks...</span>
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-2">
        {/* Banners carousel */}
        <div className="px-5 pt-4">
          <div className="relative h-44 rounded-3xl overflow-hidden shadow-md">
            {BANNERS.map((banner, i) => (
              <div
                key={banner.id}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === bannerIdx ? 1 : 0 }}
              >
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(110deg, ${banner.color}f0 0%, ${banner.color}80 50%, transparent 100%)`,
                  }}
                />
                <div className="absolute inset-0 p-5 flex flex-col justify-center max-w-[65%]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/70 mb-1.5">
                    {banner.badge}
                  </span>
                  <h3 className="text-white font-extrabold text-[17px] leading-snug mb-1">
                    {banner.title}
                  </h3>
                  <p className="text-white/65 text-xs leading-snug">{banner.subtitle}</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-3 right-4 flex gap-1.5">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBannerIdx(i)}
                  className="h-1.5 rounded-full bg-white transition-all duration-300"
                  style={{
                    width: i === bannerIdx ? 18 : 6,
                    opacity: i === bannerIdx ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Glassmorphism Loyalty card */}
        <div className="px-5 pt-4">
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => nav("loyalty")} className="w-full">
            <div
              className="relative overflow-hidden rounded-3xl h-28 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1E293B 0%, #2D4065 60%, #1a3a5c 100%)",
              }}
            >
              <div
                className="absolute -right-10 -top-10 w-48 h-48 rounded-full"
                style={{ background: "rgba(212,163,115,0.12)" }}
              />
              <div
                className="absolute right-0 -bottom-12 w-36 h-36 rounded-full"
                style={{ background: "rgba(212,163,115,0.08)" }}
              />
              <div className="absolute inset-0 flex items-center px-6 gap-4">
                <div className="flex-1 text-left">
                  <p className="text-white/50 text-[10px] mb-0.5 font-medium">Your Points Balance</p>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[34px] font-extrabold text-white leading-none">2,450</span>
                    <span className="font-bold text-sm" style={{ color: B.accent }}>
                      pts
                    </span>
                  </div>
                  <p className="text-white/35 text-[10px]">≈ 4 free drinks available</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-14 h-14 rounded-2xl border border-white/15 flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <Trophy className="w-7 h-7" style={{ color: B.accent }} />
                  </div>
                  <span className="text-[10px] text-white/40 font-semibold">Gold Member</span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "61%" }}
                  transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: B.accent }}
                />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Categories */}
        <div className="pt-5">
          <div className="px-5 flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-base" style={{ color: B.primary }}>
              Categories
            </h2>
          </div>
          <div className="flex gap-2 px-5 overflow-x-auto no-scrollbar">
            {categories.map(c => (
              <motion.button
                key={c.id}
                onClick={() => setCat(c.id)}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 flex items-center justify-center px-4 py-2.5 rounded-2xl shadow-sm"
                animate={{ background: cat === c.id ? B.primary : "white" }}
                transition={{ duration: 0.18 }}
              >
                <span
                  className="text-xs whitespace-nowrap"
                  style={{
                    color: cat === c.id ? "white" : "#94A3B8",
                    fontWeight: 600,
                  }}
                >
                  {c.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="pt-5">
          <div className="px-5 flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-base" style={{ color: B.primary }}>
              {cat === "all" ? "Recommended" : categories.find(c => c.id === cat)?.label}
            </h2>
            <button onClick={() => nav("menu")} className="text-xs font-bold" style={{ color: B.secondary }}>
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 px-5">
            {filtered.slice(0, 4).map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={favorites.includes(p.id)}
                onPress={() => onProduct(p)}
                onFavorite={() => onFavorite(p.id)}
                onAdd={() => onAdd(p)}
              />
            ))}
          </div>
        </div>

        {/* Quick reorder */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-base" style={{ color: B.primary }}>
              Order Again
            </h2>
            <button onClick={() => nav("history")} className="text-xs font-bold" style={{ color: B.secondary }}>
              History
            </button>
          </div>
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50">
            {[PRODUCTS[0], PRODUCTS[2]].map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-3 ${i > 0 ? "pt-3 mt-3 border-t border-slate-50" : ""}`}
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-bold text-sm truncate" style={{ color: B.primary }}>
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-400">{fmt(p.price)}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => onAdd(p)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white flex-shrink-0"
                  style={{ background: B.secondary }}
                >
                  Reorder
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* Nearest stores */}
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-base" style={{ color: B.primary }}>
              Nearest Stores
            </h2>
            <button onClick={() => nav("store")} className="text-xs font-bold" style={{ color: B.secondary }}>
              See all
            </button>
          </div>
          <div className="space-y-3">
            {STORES.slice(0, 2).map(store => (
              <motion.button
                key={store.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => nav("store")}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-slate-50 text-left"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFF3E8" }}
                >
                  <Building2 className="w-6 h-6" style={{ color: B.secondary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: B.primary }}>
                    {store.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{store.address}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {store.distance}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {store.time}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                    store.isOpen ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
                  }`}
                >
                  {store.isOpen ? "Open" : "Closed"}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
