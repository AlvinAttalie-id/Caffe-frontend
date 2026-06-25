import { motion } from "motion/react";

export function Spinner({
  size = "w-5 h-5",
  border = "border-white/30 border-t-white",
}: {
  size?: string;
  border?: string;
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
      className={`${size} rounded-full border-2 ${border}`}
    />
  );
}
