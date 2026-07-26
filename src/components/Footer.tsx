"use client";

import React, { useState, useEffect } from "react";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function Footer() {
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const email = portfolioState?.personalInfo.email || "mamunwifi247@gmail.com";

  return (
    <footer className="w-full bg-[#121212] text-white pt-12 pb-6 px-6 md:px-12 relative overflow-hidden font-['Google_Sans',sans-serif] border-t border-white/10">
      
      {/* Top Footer Bar (Contact Info & Copyright) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10 border-b border-white/10 pb-8">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-300 font-medium">
          <span>© mamunwifi 2026</span>
          <span className="text-gray-600">•</span>
          <span className="text-blue-400">All Rights Reserved</span>
        </div>

        {/* Center/Right: Full Contact Info for Mobile & Android */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs md:text-sm text-gray-300 font-medium font-['Hind_Siliguri','Google_Sans',sans-serif]">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-yellow-400 font-bold">📞 Hotline:</span>
            <span>০১৭৭৯২৮৮৫৫৫ / ০১৫৮১০২৭৯৭২</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-cyan-400 font-bold">✉ Email:</span>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-emerald-400 font-bold">📍 Office:</span>
            <span>পশ্চিম সরমঙ্গল, বাংলাদেশ</span>
          </div>
        </div>
      </div>

      {/* Giant Watermark Text "mamunwifi" in Outfit Font & Metallic Gradient */}
      <div className="max-w-7xl mx-auto relative z-0 flex justify-start items-baseline overflow-hidden select-none">
        <h1 className="text-[25vw] md:text-[21vw] font-bold tracking-tighter leading-[0.72] text-transparent bg-clip-text bg-gradient-to-b from-[#3a3a3a] via-[#242424] to-[#141414] lowercase font-['Outfit',sans-serif] hover:from-[#484848] transition-all duration-700">
          mamunwifi
        </h1>
      </div>

    </footer>
  );
}
