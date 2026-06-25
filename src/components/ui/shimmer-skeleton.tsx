import React from "react";

export function Sk({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`} style={style}>
      <div className="absolute inset-0 skeleton-shimmer" />
    </div>
  );
}
