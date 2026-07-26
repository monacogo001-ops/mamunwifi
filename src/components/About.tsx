"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Zap, ShieldCheck } from "lucide-react";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function About() {
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const secConfig = portfolioState?.sectionsConfig.find((s) => s.id === "about");
  if (secConfig && !secConfig.isActive) return null;

  const name = portfolioState?.personalInfo.name || "Mamun Wifi";

  return (
    <section id="about" className="bg-[#1d4ed8] pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        {/* Left: Clean Frameless Logo Emblem */}
        <div className="flex flex-col items-center justify-center w-full md:w-[320px] shrink-0 mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center group"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.5)] border border-cyan-400/40 p-2 bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent backdrop-blur-md">
              <img
                src="/images/mamun_wifi_logo.jpg"
                alt="Mamun Wifi Logo"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Right: VFX Styled High-Tech ISP Intro Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 text-white mt-8 md:mt-0 relative z-20 font-['Tiro_Bangla','Noto_Serif_Bengali','Google_Sans',sans-serif]"
        >
          {/* Futuristic VFX Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.4)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>NEXT-GEN BROADBAND NETWORK</span>
          </div>

          {/* VFX Glowing Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            ওয়েলকাম টু <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-100 to-indigo-200 drop-shadow-[0_0_30px_rgba(59,130,246,0.9)]">মামুন ওয়াইফাই</span>
          </h2>
          
          {/* VFX Styled Bengali Paragraph */}
          <p className="text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-3xl text-blue-100 font-medium">
            আপনার বাসা, অফিস ও প্রতিষ্ঠানের জন্য আমরা প্রদান করছি সর্বোচ্চ গতির{" "}
            <span className="text-white font-bold bg-white/20 px-4 py-1 rounded-full border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)] inline-flex items-center whitespace-nowrap text-xs md:text-sm my-1">
              অপটিক্যাল ফাইবার ইন্টারনেট
            </span>
            , বাফারলেস ৪কে স্ট্রিমিং, ফাস্ট আল্ট্রা-লো ল্যাটেন্সি গেমিং এবং{" "}
            <span className="text-cyan-200 font-bold bg-cyan-400/20 px-4 py-1 rounded-full border border-cyan-300/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] inline-flex items-center whitespace-nowrap text-xs md:text-sm my-1">
              ২৪/৭ রিয়েল-টাইম সাপোর্ট
            </span>
            ।
          </p>

          {/* 3 High-Tech Sleek Compact Capsule Feature Cards (1-Line Chikon Capsules) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-cyan-400/60 px-5 py-3 rounded-full flex flex-row items-center justify-center gap-3 text-left group hover:bg-white/15 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Wifi className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs md:text-sm font-bold text-white leading-tight">গিগাবিট ফাইবার</h4>
                <span className="text-[10px] text-cyan-200/80 font-mono">Ultra-Fast Speed</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-blue-400/60 px-5 py-3 rounded-full flex flex-row items-center justify-center gap-3 text-left group hover:bg-white/15 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                <Zap className="w-5 h-5 text-blue-300" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs md:text-sm font-bold text-white leading-tight">বিডিআইএক্সে ফুল স্পিড</h4>
                <span className="text-[10px] text-blue-200/80 font-mono">Low Ping Gaming</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-emerald-400/60 px-5 py-3 rounded-full flex flex-row items-center justify-center gap-3 text-left group hover:bg-white/15 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs md:text-sm font-bold text-white leading-tight">২৪/৭ সাপোর্টিং</h4>
                <span className="text-[10px] text-emerald-200/80 font-mono">99.9% Uptime</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Organic Torn Paper Edge SVG Divider (Exact Serotoninn Campaign Style) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 pointer-events-none transform translate-y-1">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 md:h-20 fill-white filter drop-shadow-[0_-5px_8px_rgba(0,0,0,0.15)]"
        >
          <path d="M 0,120 L 0,38 C 35,34 65,48 105,44 C 150,40 185,26 230,30 C 285,34 325,54 380,50 C 440,46 480,35 540,40 C 600,45 640,60 700,56 C 760,52 805,34 865,38 C 925,42 965,56 1025,50 C 1085,44 1130,32 1190,36 C 1250,40 1300,52 1360,46 C 1400,42 1425,46 1440,44 L 1440,120 Z" />
        </svg>
      </div>
    </section>
  );
}
