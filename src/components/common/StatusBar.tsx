import React from "react";

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "text-white" : "text-slate-800";
  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-1 ${c} select-none`}>
      <span className="text-xs font-bold">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-px items-end h-3">
          {[2, 3, 4, 5].map(h => (
            <div
              key={h}
              className={`w-1 rounded-sm ${light ? "bg-white" : "bg-slate-800"}`}
              style={{ height: h * 2.5 }}
            />
          ))}
        </div>
        <div className={`w-6 h-3 rounded-sm border-2 ${light ? "border-white" : "border-slate-800"} relative ml-1`}>
          <div className={`absolute inset-y-0.5 left-0.5 right-1 rounded-sm ${light ? "bg-white" : "bg-slate-800"}`} />
          <div className={`absolute right-[-4px] top-1/2 -translate-y-1/2 w-1 h-1.5 rounded-r-sm ${light ? "bg-white/60" : "bg-slate-500"}`} />
        </div>
      </div>
    </div>
  );
}
