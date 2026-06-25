import React, { useState } from "react";
import { motion } from "motion/react";
import { Coffee } from "lucide-react";
import { StatusBar } from "@components/common/StatusBar";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { B } from "@styles/theme";
import { NavFn } from "@types/navigation";

interface LoginScreenProps {
  nav: NavFn;
}

export function LoginScreen({ nav }: LoginScreenProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav("otp");
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="relative h-52 bg-slate-200 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=420&fit=crop&auto=format"
          alt="Coffee"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30,41,59,0.25), rgba(30,41,59,0.75))",
          }}
        />
        <StatusBar light />
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-5">
          <div className="flex items-center gap-2.5 mb-1">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: B.accent }}
            >
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-lg font-extrabold">Brew &amp; Co.</span>
          </div>
          <p className="text-white/60 text-xs">Sign in to continue your coffee journey</p>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-t-3xl -mt-4 px-7 pt-7 pb-6 overflow-y-auto no-scrollbar">
        <h2 className="text-xl font-extrabold mb-1" style={{ color: B.primary }}>
          Welcome back
        </h2>
        <p className="text-slate-400 text-sm mb-7">Enter your phone number to sign in</p>
        <div className="flex items-center border-2 border-slate-100 rounded-2xl overflow-hidden mb-4 focus-within:border-[#D4A373] transition-colors">
          <div className="px-4 py-3.5 border-r border-slate-100 bg-slate-50 flex items-center gap-2 flex-shrink-0">
            <span className="text-base">🇮🇩</span>
            <span className="text-sm font-bold text-slate-600">+62</span>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="8xx xxxx xxxx"
            className="flex-1 px-4 py-3.5 text-sm text-slate-700 outline-none bg-transparent placeholder-slate-300"
          />
        </div>
        <PrimaryBtn className="w-full py-4 mb-6" loading={loading} onClick={handleSend}>
          Send OTP
        </PrimaryBtn>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-slate-300 text-xs font-semibold">OR</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl shadow-sm bg-white"
          >
            <span className="text-xl">🍎</span>
            <span className="text-sm font-bold text-slate-700">Apple</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl shadow-sm bg-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-bold text-slate-700">Google</span>
          </motion.button>
        </div>
        <p className="text-center text-xs text-slate-400">
          By continuing, you agree to our{" "}
          <button className="font-bold" style={{ color: B.secondary }}>
            Terms
          </button>{" "}
          &amp;{" "}
          <button className="font-bold" style={{ color: B.secondary }}>
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}
