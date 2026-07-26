"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function Hero() {
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      img: "/images/wifi_router_3d.jpg",
      leftText: "MAMUN WIFI",
      rightText: "WHERE SPEED MEETS STABILITY",
      tag: "HIGH SPEED BROADBAND",
    },
    {
      img: "/images/mamun_wifi_banner.jpg",
      leftText: "100G FIBER",
      rightText: "ULTRA LOW LATENCY BDIX",
      tag: "24/7 NETWORK SUPPORT",
    },
  ];

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);

    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      window.removeEventListener("portfolioStateUpdated", syncState);
      clearInterval(slideTimer);
    };
  }, []);

  const secConfig = portfolioState?.sectionsConfig.find((s) => s.id === "home");
  if (secConfig && !secConfig.isActive) return null;

  const currentSlide = slides[currentSlideIndex % slides.length] || slides[0];

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#ededed] text-black font-['Montserrat',sans-serif] pt-16"
    >
      {/* Full-Screen Sliding Wi-Fi Router Visual Background (100% Clear & Bright) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlideIndex}
            src={currentSlide?.img || "/images/wifi_router_3d.jpg"}
            alt="Mamun Wifi Hero Router Visual"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="w-full h-full object-cover filter brightness-105 contrast-105"
          />
        </AnimatePresence>
        
        {/* Soft Vignette Overlay for Sharp High-Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-white/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d4ed8] via-transparent to-white/30 z-10" />
      </div>

      {/* 3-Column Layout Overlaid on Full Screen Router Slide */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 h-full py-12">
        
        {/* Left Side: Huge Bold Typography */}
        <div className="flex-1 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-gray-800 block mb-3 uppercase font-extrabold">
                [{currentSlide?.tag || "HIGH SPEED BROADBAND"}]
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter uppercase leading-[0.9] drop-shadow-md">
                {(currentSlide?.leftText || "MAMUN WIFI").split(" ")[0]} <br />
                <span className="text-slate-950">{(currentSlide?.leftText || "MAMUN WIFI").split(" ")[1] || ""}</span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Huge Compressed Typography */}
        <div className="flex-1 text-left md:text-right flex justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xs md:max-w-sm"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter uppercase leading-[0.95] drop-shadow-md">
                {currentSlide?.rightText || "WHERE SPEED MEETS STABILITY"}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Pure Solid Blue Bottom Transition Bar (Matches Blue Announcement Section Below) */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1d4ed8] z-30 pointer-events-none" />
    </section>
  );
}
