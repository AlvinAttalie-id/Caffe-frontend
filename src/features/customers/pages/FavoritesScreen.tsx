import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { NavFn } from "@types/navigation";
import { Product } from "@features/products/types";
import { ProductCard } from "@features/products/components/ProductCard";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { PRODUCTS } from "@data/mockData";
import { B } from "@styles/theme";

interface FavoritesScreenProps {
  nav: NavFn;
  favorites: number[];
  onFavorite: (id: number) => void;
  onAdd: (p: Product) => void;
  onProduct: (p: Product) => void;
}

export function FavoritesScreen({
  nav,
  favorites,
  onFavorite,
  onAdd,
  onProduct,
}: FavoritesScreenProps) {
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            Favorites
          </h1>
          <span className="text-sm text-slate-400">{favProducts.length} items</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-20">
        {favProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: "#FFF3E8" }}
            >
              <Heart className="w-10 h-10" style={{ color: B.accent }} />
            </motion.div>
            <div className="text-center">
              <h3 className="font-extrabold text-lg" style={{ color: B.primary }}>
                No favorites yet
              </h3>
              <p className="text-slate-400 text-sm mt-1">Tap the heart on any product to save it</p>
            </div>
            <PrimaryBtn className="px-8 py-3" onClick={() => nav("menu")}>
              Browse Menu
            </PrimaryBtn>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <ProductCard
                  product={p}
                  isFavorite={true}
                  onPress={() => onProduct(p)}
                  onFavorite={() => onFavorite(p.id)}
                  onAdd={() => onAdd(p)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
