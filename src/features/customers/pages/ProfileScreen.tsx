import React from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  User,
  Lock,
  Bell,
  Globe,
  Clock,
  CreditCard,
  MapPin,
  HelpCircle,
  Shield,
  Info,
  Palette,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAppNav } from "@hooks/useAppNav";
import { useToast } from "@hooks/useToast";
import { B } from "@styles/theme";

const PAGE_BG = "#F8F9FB";
const CARD_BORDER = "#ECECEC";
const MUTED = "#94A3B8";
const ICON_GRAY = "#6B7280";

type SettingRow = {
  Icon: LucideIcon;
  label: string;
  subtitle?: string;
  value?: string;
  showChevron?: boolean;
  action?: () => void;
};

type SettingSection = {
  title: string;
  items: SettingRow[];
};

function SettingRowButton({ item }: { item: SettingRow }) {
  const showChevron = item.showChevron !== false;

  return (
    <motion.button
      type="button"
      onClick={item.action}
      whileTap={item.action ? { scale: 0.99 } : undefined}
      className="w-full h-14 flex items-center gap-3 px-[18px] bg-white text-left"
    >
      <item.Icon className="w-5 h-5 flex-shrink-0" style={{ color: ICON_GRAY }} strokeWidth={1.75} />
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium truncate" style={{ color: B.primary }}>
          {item.label}
        </p>
        {item.subtitle && (
          <p className="text-sm font-normal truncate" style={{ color: MUTED }}>
            {item.subtitle}
          </p>
        )}
      </div>
      {item.value && (
        <span className="text-[15px] flex-shrink-0" style={{ color: MUTED }}>
          {item.value}
        </span>
      )}
      {showChevron && (
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#CBD5E1" }} />
      )}
    </motion.button>
  );
}

function SettingSectionBlock({ section }: { section: SettingSection }) {
  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-wide mb-3 px-1"
        style={{ color: MUTED }}
      >
        {section.title}
      </p>
      <div className="bg-white rounded-2xl overflow-hidden">
        {section.items.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <div className="h-px w-full" style={{ backgroundColor: CARD_BORDER }} />
            )}
            <SettingRowButton item={item} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const nav = useAppNav();
  const { success } = useToast();

  const sections: SettingSection[] = [
    {
      title: "Account",
      items: [
        {
          Icon: User,
          label: "Manage Profile",
          action: () => success("Profile updated successfully"),
        },
        { Icon: Lock, label: "Password & Security" },
        {
          Icon: Bell,
          label: "Notifications",
          action: () => nav("notifications"),
        },
        { Icon: Globe, label: "Language", value: "English" },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          Icon: Clock,
          label: "Order History",
          action: () => nav("history"),
        },
        { Icon: CreditCard, label: "Payment Methods" },
        { Icon: MapPin, label: "Saved Addresses" },
      ],
    },
    {
      title: "Support",
      items: [
        { Icon: HelpCircle, label: "Help Center" },
        { Icon: Shield, label: "Privacy & Security" },
        { Icon: Info, label: "About" },
      ],
    },
    {
      title: "Application",
      items: [
        { Icon: Palette, label: "Theme" },
        {
          Icon: Info,
          label: "App Version",
          value: "1.0.0",
          showChevron: false,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: PAGE_BG }}>
      <div className="px-5 pt-12 pb-2 flex-shrink-0">
        <h1 className="text-[28px] font-bold text-left" style={{ color: B.primary }}>
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-5 pt-4 pb-2 flex items-center gap-3"
        >
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&auto=format"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold truncate" style={{ color: B.primary }}>
              Arjun Pratama
            </h2>
            <p className="text-sm truncate" style={{ color: MUTED }}>
              +62 812 3456 7890
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => success("Profile updated successfully")}
            className="flex items-center gap-0.5 px-3 py-1.5 rounded-lg text-sm font-semibold border flex-shrink-0"
            style={{ borderColor: CARD_BORDER, color: B.primary }}
          >
            Edit
            <ChevronRight className="w-3.5 h-3.5" style={{ color: MUTED }} />
          </motion.button>
        </motion.div>

        <div className="px-5 pt-6 flex flex-col gap-6">
          {sections.map((section) => (
            <SettingSectionBlock key={section.title} section={section} />
          ))}

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => nav("splash", "fade")}
            className="w-full h-14 flex items-center justify-center gap-2 rounded-[14px] border"
            style={{
              borderColor: "#FECACA",
              background: "#FFF1F2",
            }}
          >
            <LogOut className="w-4 h-4 text-red-400" strokeWidth={1.75} />
            <span className="text-base font-semibold text-red-400">Sign Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
