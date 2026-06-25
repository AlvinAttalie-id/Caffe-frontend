import React from "react";
import { motion } from "motion/react";
import { Heart, Star, Plus } from "lucide-react";
import { Product } from "@features/products/types";
import { B } from "@styles/theme";
import { fmt } from "@lib/utils";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onPress: () => void;
  onFavorite: () => void;
  onAdd: () => void;
}

export function ProductCard({
  product,
  isFavorite,
  onPress,
  onFavorite,
  onAdd,
}: ProductCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 cursor-pointer"
      onClick={onPress}
    >
      <div className="relative h-36 bg-slate-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.badge && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
            style={{ background: B.secondary }}
          >
            {product.badge}
          </span>
        )}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={e => {
            e.stopPropagation();
            onFavorite();
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
        </motion.button>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-xs leading-tight mb-1" style={{ color: B.primary }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-[10px] text-slate-400">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs" style={{ color: B.primary }}>
            {fmt(product.price)}
          </span>
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={e => {
              e.stopPropagation();
              onAdd();
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{ background: B.primary }}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
