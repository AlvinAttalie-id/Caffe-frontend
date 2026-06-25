import React from "react";
import { motion } from "motion/react";
import { Spinner } from "./spinner";
import { B } from "@styles/theme";

interface PrimaryBtnProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function PrimaryBtn({
  children,
  loading = false,
  onClick,
  className = "",
  style = {},
}: PrimaryBtnProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileTap={!loading ? { scale: 0.97 } : {}}
      className={`flex items-center justify-center gap-2 font-bold text-white rounded-2xl ${
        loading ? "opacity-80 cursor-not-allowed" : ""
      } ${className}`}
      style={{ background: B.primary, ...style }}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
