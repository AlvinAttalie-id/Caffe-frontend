import { Coffee } from "lucide-react";
import { B } from "@styles/theme";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description = "This feature is coming soon." }: ComingSoonProps) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-8 text-center"
      style={{ background: B.bg }}
    >
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 border border-slate-100 shadow-sm"
        style={{ background: "#FFF3E8" }}
      >
        <Coffee className="w-10 h-10" style={{ color: B.accent }} />
      </div>
      <h2 className="text-xl font-extrabold mb-2" style={{ color: B.primary }}>
        {title}
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed max-w-[260px]">{description}</p>
      <span
        className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full"
        style={{ background: "#FFF3E8", color: B.secondary }}
      >
        Coming Soon
      </span>
    </div>
  );
}
