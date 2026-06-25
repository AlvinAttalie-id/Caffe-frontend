import { motion } from "motion/react";
import { AppleIcon } from "@components/ui/icons/AppleIcon";
import { GoogleIcon } from "@components/ui/icons/GoogleIcon";
import { useIsMobile } from "@hooks/use-mobile";

type SocialProvider = "apple" | "google";
type SocialVariant = "light" | "dark";

interface SocialLoginButtonProps {
  provider: SocialProvider;
  variant?: SocialVariant;
  onClick?: () => void;
  disabled?: boolean;
}

const LABELS: Record<SocialProvider, string> = {
  apple: "Apple",
  google: "Google",
};

export function SocialLoginButton({
  provider,
  variant = "light",
  onClick,
  disabled = false,
}: SocialLoginButtonProps) {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 18 : 20;

  const isAppleDark = provider === "apple" && variant === "dark";

  const baseClass =
    "w-full flex items-center justify-center h-[52px] rounded-2xl text-sm transition-shadow duration-200";

  const appleDarkClass = "bg-black text-white border border-black";
  const appleLightClass = "bg-white text-black border border-slate-200";
  const googleClass =
    "bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-md";

  const className = [
    baseClass,
    provider === "google" ? googleClass : isAppleDark ? appleDarkClass : appleLightClass,
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
  ].join(" ");

  const iconColor = isAppleDark ? "text-white" : "text-black";

  return (
    <motion.button
      type="button"
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ fontWeight: 600, borderRadius: 16, paddingLeft: 20, paddingRight: 20, gap: 12 }}
    >
      {provider === "apple" ? (
        <AppleIcon size={iconSize} className={`flex-shrink-0 ${iconColor}`} />
      ) : (
        <GoogleIcon size={iconSize} className="flex-shrink-0" />
      )}
      <span>{LABELS[provider]}</span>
    </motion.button>
  );
}
