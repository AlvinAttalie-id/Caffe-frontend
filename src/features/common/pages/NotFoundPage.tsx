import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Coffee, Home } from "lucide-react";
import { ROUTES } from "@app/router/routes";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { B } from "@styles/theme";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)" }}
    >
      <div className="text-center max-w-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg"
          style={{ background: B.primary }}
        >
          <Coffee className="w-10 h-10" style={{ color: B.accent }} />
        </motion.div>
        <h1 className="text-6xl font-black mb-2" style={{ color: B.primary }}>
          404
        </h1>
        <p className="text-slate-500 text-sm mb-8">The page you are looking for does not exist.</p>
        <PrimaryBtn className="px-8 py-3" onClick={() => navigate(ROUTES.DASHBOARD)}>
          <Home className="w-4 h-4" />
          Go to Dashboard
        </PrimaryBtn>
      </div>
    </div>
  );
}
