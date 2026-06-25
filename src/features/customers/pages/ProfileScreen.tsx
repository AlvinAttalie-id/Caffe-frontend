import React from "react";
import { motion } from "motion/react";
import {
  MapPin,
  CreditCard,
  Bell,
  Trophy,
  Clock,
  HelpCircle,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Check,
  Home,
} from "lucide-react";
import { NavFn } from "@types/navigation";
import { BottomNav } from "@components/common/BottomNav";
import { B } from "@styles/theme";

interface ProfileScreenProps {
  nav: NavFn;
  cartCount: number;
}

export function ProfileScreen({ nav, cartCount }: ProfileScreenProps) {
  const menuItems: { Icon: typeof Home; label: string; sub: string; action?: () => void }[] = [
    { Icon: MapPin, label: "Saved Addresses", sub: "3 addresses saved" },
    { Icon: CreditCard, label: "Payment Methods", sub: "GoPay · Visa ···4821" },
    { Icon: Bell, label: "Notifications", sub: "All notifications on", action: () => nav("notifications") },
    { Icon: Trophy, label: "Loyalty Points", sub: "2,450 pts · Gold Member", action: () => nav("loyalty") },
    { Icon: Clock, label: "Order History", sub: "View past orders", action: () => nav("history") },
    { Icon: HelpCircle, label: "Help Center", sub: "FAQ & live chat" },
    { Icon: Shield, label: "Privacy & Security", sub: "Manage your data" },
    { Icon: Settings, label: "App Settings", sub: "Theme, language, notifications" },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <h1 className="font-extrabold text-lg text-left" style={{ color: B.primary }}>
          Profile
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <div className="px-5 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 flex items-center gap-4 text-left"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2" style={{ borderColor: B.accent }}>
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&auto=format"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                style={{ background: B.success }}
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-extrabold text-base" style={{ color: B.primary }}>
                Arjun Pratama
              </h2>
              <p className="text-sm text-slate-400">+62 812 3456 7890</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: B.accent }}
                >
                  <Trophy className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs font-extrabold" style={{ color: B.secondary }}>
                  Gold Member
                </span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-500">
              Edit
            </button>
          </motion.div>
        </div>

        <div className="px-5 pt-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => nav("loyalty")}
            className="w-full rounded-2xl p-3.5 flex items-center gap-3 shadow-sm text-left"
            style={{ background: `linear-gradient(135deg, ${B.secondary} 0%, #A0714F 100%)` }}
          >
            <Trophy className="w-5 h-5 flex-shrink-0" style={{ color: B.accent }} />
            <div className="flex-1">
              <p className="text-white font-bold text-sm">2,450 Points</p>
              <p className="text-white/55 text-xs">Gold Member · Tap to view rewards</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/50" />
          </motion.button>
        </div>

        <div className="px-5 pt-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
            {menuItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={item.action}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                  i > 0 ? "border-t border-slate-50" : ""
                }`}
              >
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFF8F0" }}
                >
                  <item.Icon className="w-4 h-4" style={{ color: B.secondary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: B.primary }}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{item.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="px-5 pt-3 pb-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => nav("splash", "fade")}
            className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 border border-red-100"
            style={{ background: "#FFF1F2" }}
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-red-400">Sign Out</span>
          </motion.button>
        </div>
      </div>
      <BottomNav active="profile" nav={nav} cartCount={cartCount} />
    </div>
  );
}
