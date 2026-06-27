import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";

export function OrderHistorySkeleton() {
  return (
    <div>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="py-3 border-b border-slate-50 space-y-2">
          <Sk className="w-16 h-5 rounded-full" />
          <Sk className="w-3/4 h-4 rounded-xl" />
          <Sk className="w-1/2 h-3 rounded-full" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1.5">
              <Sk className="w-full h-3 rounded-full" />
              <Sk className="w-2/3 h-3 rounded-full" />
            </div>
            <Sk className="w-20 h-3 rounded-full flex-shrink-0" />
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-50">
            <Sk className="w-28 h-4 rounded-xl" />
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
