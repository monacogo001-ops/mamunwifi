"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";
import SpeedTestModal from "./modals/SpeedTestModal";
import FtpModal from "./modals/FtpModal";
import BillingModal from "./modals/BillingModal";
import { ShoppingCart, CreditCard, Database } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLightSection, setIsLightSection] = useState(false);
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);
  const [speedTestOpen, setSpeedTestOpen] = useState(false);
  const [ftpOpen, setFtpOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const navItems = [
    { id: "home", label: "হোম", type: "scroll" },
    { id: "expertise", label: "প্যাকেজ", type: "scroll" },
    { id: "speedtest", label: "স্পিড টেস্ট", type: "scroll" },
    { id: "contact", label: "যোগাযোগ", type: "scroll" },
    { id: "ftp", label: "FTP", type: "ftp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Determine active section based on closest center to viewport
      const sectionIds = ["home", "expertise", "skills", "speedtest", "contact"];
      let bestSection = "home";
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const centerDist = Math.abs((rect.top + rect.bottom) / 2 - window.innerHeight / 2);
            if (centerDist < minDistance) {
              minDistance = centerDist;
              bestSection = id;
            }
          }
        }
      }

      // 2. Determine light vs dark background mode
      let currentIsLight = false;
      const lightCheckIds = ["home", "expertise", "skills", "speedtest"];
      for (const id of lightCheckIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 100) {
            currentIsLight = true;
            break;
          }
        }
      }

      // Explicitly override to dark mode if inside #contact
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        if (contactRect.top <= 250 && contactRect.bottom >= 50) {
          currentIsLight = false;
        }
      }

      setActiveSection(bestSection);
      setIsLightSection(currentIsLight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const logoFirstName = portfolioState?.navData.logoFirstName || "Mamun";
  const logoLastName = portfolioState?.navData.logoLastName || "Wifi";
  const hireMeText = portfolioState?.navData.hireMeButtonText || "Contact Us";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 bg-transparent font-['Tiro_Bangla','Noto_Serif_Bengali','Google_Sans',sans-serif] transition-none pointer-events-none">
      <div className="w-full px-6 md:px-10 flex justify-between items-center pointer-events-auto">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <a
            href="#home"
            className={`flex items-center gap-1.5 text-xl md:text-2xl font-['Google_Sans',sans-serif] transition-colors duration-300 ${
              isLightSection ? "text-slate-950" : "text-white"
            }`}
          >
            <span className="font-extrabold tracking-tight">{logoFirstName}</span>
            <span className={`font-bold ${isLightSection ? "text-slate-800" : "text-gray-300"}`}>
              {logoLastName}
            </span>
          </a>
        </div>

        {/* Floating Capsule Navbar (Compact Size) */}
        <div
          className={`hidden md:flex items-center p-1.5 rounded-full border transition-all duration-300 shadow-xl ${
            isLightSection
              ? "bg-white/95 border-gray-300 backdrop-blur-md shadow-gray-400/20"
              : "bg-white/10 border-white/20 backdrop-blur-md"
          }`}
        >
          {navItems.map((item) => {
            if (item.type === "ftp") {
              return (
                <button
                  key={item.id}
                  onClick={() => setFtpOpen(true)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ml-1.5 cursor-pointer ${
                    isLightSection
                      ? "border-gray-300 bg-gray-100 hover:bg-[#2563eb] text-slate-950 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      : "border-white/20 bg-white/5 hover:bg-[#2563eb] text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  }`}
                  title="FTP Services"
                >
                  <Database className="w-3.5 h-3.5" />
                </button>
              );
            }

            const isActive = activeSection === item.id;
            const handleClick = (e: React.MouseEvent) => {
              if (item.type === "speedtest") {
                const speedEl = document.getElementById("speedtest");
                if (speedEl) {
                  speedEl.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                setActiveSection(item.id);
              }
            };

            return (
              <a
                key={item.id}
                href={item.type === "scroll" ? `#${item.id}` : "#"}
                onClick={handleClick}
                className={`relative px-4 py-1.5 text-xs md:text-sm tracking-normal rounded-full transition-colors duration-300 cursor-pointer font-['Tiro_Bangla','Noto_Serif_Bengali',sans-serif] ${
                  isActive
                    ? "text-white font-extrabold"
                    : isLightSection
                    ? "text-slate-950 font-extrabold hover:text-[#2563eb]"
                    : "text-white/90 font-extrabold hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="capsuleHighlight"
                    className="absolute inset-0 bg-[#2563eb] rounded-full shadow-md z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop Action Buttons (Larger Size) */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Device Gallery */}
          <a
            href="#projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold bg-[#2563eb] text-white hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/30 border-none"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ডিভাইস গ্যালারি</span>
          </a>

          {/* Bill Payment */}
          <button
            onClick={() => setBillingOpen(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 cursor-pointer ${
              isLightSection
                ? "border-gray-300 text-gray-950 bg-white hover:bg-gray-100"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>বিল পেমেন্ট</span>
          </button>

          {/* New Connection */}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-xs md:text-sm font-extrabold bg-[#facc15] text-slate-950 hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/20"
          >
            নতুন সংযোগ
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`focus:outline-none p-2 transition-colors duration-500 ${
              isLightSection ? "text-gray-900" : "text-white"
            }`}
            aria-label="Toggle navigation drawer menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out pointer-events-auto ${
          mobileMenuOpen
            ? "max-h-[650px] py-6 opacity-100 bg-[#1d4ed8] shadow-2xl"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navItems.map((item) => {
            const handleClick = (e: React.MouseEvent) => {
              setMobileMenuOpen(false);
              if (item.type === "speedtest") {
                e.preventDefault();
                setSpeedTestOpen(true);
              } else if (item.type === "ftp") {
                e.preventDefault();
                setFtpOpen(true);
              } else {
                setActiveSection(item.id);
              }
            };
            return (
              <a
                key={item.id}
                href={item.type === "scroll" ? `#${item.id}` : "#"}
                onClick={handleClick}
                className="text-white hover:text-blue-200 text-base border-b border-white/10 pb-2.5 font-medium transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.type === "ftp" && <Database className="w-4 h-4 text-blue-200" />}
              </a>
            );
          })}

          {/* Action buttons at the bottom of the drawer */}
          <div className="pt-4 flex flex-col gap-3">
            {/* Device Gallery */}
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#2563eb] text-white hover:bg-blue-700 transition-all duration-300 border-none shadow-lg shadow-blue-900/30"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>ডিভাইস গ্যালারি</span>
            </a>

            {/* Bill Payment */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBillingOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>বিল পেমেন্ট</span>
            </button>

            {/* New Connection */}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-5 py-3 rounded-full text-sm font-bold bg-[#facc15] text-slate-950 text-center hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/20"
            >
              নতুন সংযোগ
            </a>
          </div>
        </div>
      </div>
      {/* Interactive Custom Modals */}
      <SpeedTestModal isOpen={speedTestOpen} onClose={() => setSpeedTestOpen(false)} />
      <FtpModal isOpen={ftpOpen} onClose={() => setFtpOpen(false)} />
      <BillingModal isOpen={billingOpen} onClose={() => setBillingOpen(false)} />
    </nav>
  );
}
