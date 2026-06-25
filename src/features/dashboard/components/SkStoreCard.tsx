import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";

export function SkStoreCard() {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 flex items-start gap-4">
      <Sk className="w-14 h-14 rounded-2xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Sk className="w-3/4 h-4 rounded-xl" />
        <Sk className="w-full h-3 rounded-full" />
        <div className="flex gap-3">
          <Sk className="w-16 h-3 rounded-full" />
          <Sk className="w-20 h-3 rounded-full" />
        </div>
      </div>
    </div>
  );
}
