"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function AnnouncementBar() {
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const email = portfolioState?.personalInfo.email || "mamunwifi@gmail.com";

  const marqueeText = [
    "🚀 High-Speed Broadband Fiber & Corporate ISP Solutions",
    "⚡ Reliable Wi-Fi Coverage, LAN Setup & 24/7 Network Monitoring",
    "📞 Fast Installation & Customer Support",
    `📬 Reach out at ${email}`,
  ];

  return (
    <div className="w-full bg-[#1d4ed8] text-white pt-4 pb-2 px-4 overflow-hidden border-none flex items-center relative z-20 font-['Google_Sans',sans-serif]">
      <div className="flex overflow-hidden whitespace-nowrap w-full relative pt-1">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-12 text-xs md:text-sm font-normal tracking-wide text-blue-100 shrink-0 transform translate-y-1"
        >
          {marqueeText.concat(marqueeText).map((item, idx) => (
            <span key={idx} className="flex items-center gap-12">
              <span>{item}</span>
              <span className="text-blue-200 opacity-60">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
