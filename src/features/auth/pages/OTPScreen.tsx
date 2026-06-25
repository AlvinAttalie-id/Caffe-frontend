import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Phone, CheckCircle } from "lucide-react";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { B } from "@styles/theme";
import { NavFn } from "@types/navigation";

interface OTPScreenProps {
  nav: NavFn;
}

export function OTPScreen({ nav }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(n => n - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timeLeft]);

  const handleChange = (i: number, val: string) => {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => nav("home", "fade"), 1400);
    }, 1000);
  };

  return (
    <div className="w-full h-full" style={{ background: B.bg }}>
      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center px-8"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg"
                style={{ background: "#F0FDF4" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.22 }}
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500" />
                </motion.div>
              </div>
            </motion.div>
            <h2
              className="text-2xl font-extrabold text-center mb-2"
              style={{ color: B.primary }}
            >
              Verified!
            </h2>
            <p className="text-slate-400 text-sm text-center">Taking you to your dashboard...</p>
            <div className="mt-7 flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: B.accent }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full px-7 pt-14">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => nav("login", "back")}
              className="mb-7 p-2 -ml-2 rounded-xl"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
            </motion.button>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: B.accent }}
            >
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: B.primary }}>
              Verify OTP
            </h2>
            <p className="text-slate-400 text-sm mb-8 text-left">
              We sent a 6-digit code to
              <br />
              <span className="font-bold text-slate-600">+62 812 3456 7890</span>
            </p>
            
            <style>{`
              .otp-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                overflow: hidden;
                gap: 8px;
                margin-bottom: 32px;
              }
              @media (min-width: 768px) {
                .otp-container {
                  gap: 12px;
                }
              }
              .otp-input {
                width: 48px;
                height: 56px;
                border-radius: 12px;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                flex: 0 0 auto;
                outline: none;
                border: 2px solid #E2E8F0;
                transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
              }
              @media (max-width: 374px) {
                .otp-input {
                  width: 42px !important;
                }
              }
            `}</style>
            
            <div className="otp-container">
              {otp.map((digit, i) => (
                <motion.input
                  key={i}
                  ref={el => {
                    refs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onFocus={() => setFocusedIndex(i)}
                  onBlur={() => setFocusedIndex(null)}
                  animate={{
                    borderColor: i === focusedIndex ? B.primary : (digit ? B.accent : "#E2E8F0"),
                    background: digit ? "#FFF8F0" : "white",
                    boxShadow: i === focusedIndex ? "0 0 0 3px rgba(30, 41, 59, 0.15)" : "none",
                  }}
                  className="otp-input"
                  style={{ color: B.primary }}
                />
              ))}
            </div>
            <PrimaryBtn className="w-full py-4 mb-5" loading={loading} onClick={handleVerify}>
              Verify &amp; Continue
            </PrimaryBtn>
            <p className="text-center text-sm text-slate-400">
              {"Didn't receive the code? "}
              {timeLeft > 0 ? (
                <span className="font-bold text-slate-400">Resend in {timeLeft}s</span>
              ) : (
                <button onClick={() => setTimeLeft(30)} className="font-bold" style={{ color: B.secondary }}>
                  Resend OTP
                </button>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
