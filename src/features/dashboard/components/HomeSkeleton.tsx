import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";
import { SkProductCard } from "@features/products/components/SkProductCard";
import { B } from "@styles/theme";

export function HomeSkeleton() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-2">
            <Sk className="w-16 h-2.5 rounded-full" />
            <Sk className="w-28 h-5 rounded-xl" />
          </div>
          <Sk className="w-10 h-10 rounded-2xl" />
        </div>
        <Sk className="w-40 h-7 rounded-full mb-3" />
        <Sk className="w-full h-11 rounded-2xl" />
      </div>
      <div className="flex-1 overflow-hidden px-5 pt-4 space-y-4">
        <Sk className="w-full h-44 rounded-3xl" />
        <Sk className="w-full h-28 rounded-3xl" />
        <div className="flex gap-2 overflow-hidden">
          {[72, 80, 96, 72, 80, 88].map((w, i) => (
            <Sk key={i} className="flex-shrink-0 h-16 rounded-2xl" style={{ width: w }} />
          ))}
        </div>
        <Sk className="w-32 h-5 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map(i => (
            <SkProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
