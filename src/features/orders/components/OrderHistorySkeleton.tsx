import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";

export function OrderHistorySkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50">
          <div className="flex gap-3 mb-3">
            <Sk className="w-14 h-14 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Sk className="w-3/4 h-4 rounded-xl" />
              <Sk className="w-1/2 h-3 rounded-full" />
              <Sk className="w-full h-3 rounded-full" />
            </div>
          </div>
          <div className="flex justify-between pt-3 border-t border-slate-50">
            <Sk className="w-24 h-4 rounded-xl" />
            <div className="flex gap-2">
              <Sk className="w-16 h-8 rounded-xl" />
              <Sk className="w-20 h-8 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
