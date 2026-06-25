import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";
import { SkProductCard } from "@features/products/components/SkProductCard";
import { B } from "@styles/theme";

export function MenuSkeleton() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <Sk className="w-8 h-8 rounded-xl" />
          <Sk className="w-24 h-6 rounded-xl" />
        </div>
        <Sk className="w-full h-11 rounded-2xl mb-4" />
        <div className="flex gap-2">
          {[48, 64, 80, 44, 56, 60].map((w, i) => (
            <Sk key={i} className="h-8 rounded-full flex-shrink-0" style={{ width: w }} />
          ))}
        </div>
      </div>
      <div className="flex-1 px-5 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <SkProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
