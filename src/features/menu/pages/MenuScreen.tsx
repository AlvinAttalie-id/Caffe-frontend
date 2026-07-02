import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Search, Coffee } from "lucide-react";
import { useAppContext } from "@app/providers/AppProvider";
import { ProductCard } from "@features/products/components/ProductCard";
import { SkProductCard } from "@features/products/components/SkProductCard";
import { useProducts, useCategories } from "@features/products/hooks/useProducts";
import { useAppNav } from "@hooks/useAppNav";
import { useToast } from "@hooks/useToast";
import { B } from "@styles/theme";

export function MenuScreen() {
  const nav = useAppNav();
  const toast = useToast();
  const { favorites, toggleFavorite, quickAdd, openProduct } = useAppContext();

  const onFavorite = (id: number) => {
    const wasFavorite = favorites.includes(id);
    toggleFavorite(id);
    toast.success(wasFavorite ? "Removed from favorites" : "Added to favorites");
  };
  const onAdd = (p: any) => {
    quickAdd(p);
    toast.success("Added to cart successfully");
  };
  const onProduct = (p: any) => {
    openProduct(p);
    nav("product");
  };
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const { data: apiProducts = [], isLoading } = useProducts({ search: search || undefined, category_slug: cat === "all" ? undefined : cat });
  const { data: apiCategories = [] } = useCategories();

  const tabs = [
    { id: "all", label: "All" },
    ...apiCategories.map(c => ({ id: c.slug, label: c.name })),
  ];

  const filtered = apiProducts;

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => nav("home", "back")}
            className="p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
          </motion.button>
          <h1 className="font-extrabold text-lg flex-1 text-left" style={{ color: B.primary }}>
            Our Menu
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 mb-4">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search drinks or food..."
            className="flex-1 text-sm text-slate-700 outline-none bg-transparent placeholder-slate-300"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map(t => (
            <motion.button
              key={t.id}
              onClick={() => setCat(t.id)}
              whileTap={{ scale: 0.92 }}
              className="flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-full text-xs"
              animate={{
                background: cat === t.id ? B.primary : "transparent",
                color: cat === t.id ? "#FFFFFF" : "#94A3B8",
              }}
              style={{
                border: `1.5px solid ${cat === t.id ? B.primary : "#E2E8F0"}`,
                fontWeight: 600,
              }}
            >
              {t.label}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <SkProductCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Coffee className="w-10 h-10 text-slate-200" />
            <p className="text-sm text-slate-400">No items found</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-3"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProductCard
                  product={p}
                  isFavorite={favorites.includes(p.id)}
                  onPress={() => onProduct(p)}
                  onFavorite={() => onFavorite(p.id)}
                  onAdd={() => onAdd(p)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
