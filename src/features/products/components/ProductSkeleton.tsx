import React from "react";
import { Sk } from "@components/ui/shimmer-skeleton";
import { B } from "@styles/theme";

export function ProductSkeleton() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <Sk className="h-64 flex-shrink-0" />
      <div className="flex-1 px-5 pt-5 space-y-4" style={{ background: B.bg }}>
        <div className="bg-white rounded-3xl p-5 space-y-3">
          <Sk className="w-3/4 h-6 rounded-xl" />
          <Sk className="w-full h-3 rounded-full" />
          <Sk className="w-full h-3 rounded-full" />
          <Sk className="w-2/3 h-3 rounded-full" />
        </div>
        {[0, 1, 2].map(i => (
          <div key={i} className="bg-white rounded-3xl p-4 space-y-3">
            <Sk className="w-24 h-4 rounded-xl" />
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(j => (
                <Sk key={j} className="flex-1 h-12 rounded-2xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
