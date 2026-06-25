import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";

export function SkProductCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50">
      <Sk className="w-full h-36" />
      <div className="p-3 space-y-2">
        <Sk className="w-3/4 h-3 rounded-full" />
        <Sk className="w-1/2 h-3 rounded-full" />
        <div className="flex items-center justify-between pt-1">
          <Sk className="w-20 h-4 rounded-full" />
          <Sk className="w-7 h-7 rounded-full" />
        </div>
      </div>
    </div>
  );
}
