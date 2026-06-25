import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Search, Navigation, Coffee, Building2, MapPin, Clock, Star } from "lucide-react";
import { SkStoreCard } from "@features/dashboard/components/SkStoreCard";
import { STORES } from "@data/mockData";
import { useAppNav } from "@hooks/useAppNav";
import { B } from "@styles/theme";

export function StoreScreen() {
  const nav = useAppNav();
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 360);
    return () => clearTimeout(t);
  }, []);

  const filtered = STORES.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col" style={{ background: B.bg }}>
      <div className="bg-white px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => nav("home", "back")}
            className="p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: B.primary }} />
          </motion.button>
          <h1 className="font-extrabold text-lg" style={{ color: B.primary }}>
            Select Store
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search stores..."
            className="flex-1 text-sm text-slate-700 outline-none bg-transparent placeholder-slate-300"
          />
        </div>
      </div>
      <div className="relative h-40 mx-5 mt-4 rounded-3xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop&auto=format"
          alt="Map"
          className="w-full h-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30,41,59,0.1), rgba(30,41,59,0.4))",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl px-5 py-2.5 shadow-xl flex items-center gap-2">
            <Navigation className="w-4 h-4" style={{ color: B.secondary }} />
            <span className="text-sm font-bold" style={{ color: B.primary }}>
              3 stores nearby
            </span>
          </div>
        </div>
        {[{ x: "28%", y: "38%" }, { x: "55%", y: "28%" }, { x: "72%", y: "58%" }].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + i * 0.1, type: "spring" }}
            className="absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-md"
            style={{ left: pos.x, top: pos.y, background: i === 0 ? B.secondary : B.primary }}
          >
            <Coffee className="w-3 h-3 text-white" />
          </motion.div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-6 space-y-3">
        {!loaded
          ? [0, 1, 2].map(i => <SkStoreCard key={i} />)
          : filtered.map((store, i) => (
              <motion.button
                key={store.id}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => nav("home", "back")}
                className="w-full bg-white rounded-3xl p-5 shadow-sm border border-slate-50 text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#FFF3E8" }}
                  >
                    <Building2 className="w-7 h-7" style={{ color: B.secondary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-extrabold text-sm" style={{ color: B.primary }}>
                        {store.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          store.isOpen ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
                        }`}
                      >
                        {store.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{store.address}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" style={{ color: B.secondary }} />
                        {store.distance}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" style={{ color: B.secondary }} />
                        {store.isOpen ? store.time : store.hours}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {store.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
      </div>
    </div>
  );
}
