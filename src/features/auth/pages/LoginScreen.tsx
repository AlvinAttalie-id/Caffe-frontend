import React, { useState } from "react";
import { Coffee } from "lucide-react";
import { StatusBar } from "@components/common/StatusBar";
import { PrimaryBtn } from "@components/ui/PrimaryBtn";
import { SocialLoginButton } from "@components/ui/SocialLoginButton";
import { B } from "@styles/theme";
import { useAppNav } from "@hooks/useAppNav";

export function LoginScreen() {
  const nav = useAppNav();
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
          <SocialLoginButton provider="apple" variant="dark" />
          <SocialLoginButton provider="google" />
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
