"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AntigravityWaveCarousel() {
  const icons = [
    // Sparkle star
    <svg key="1" className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
    </svg>,
    // Slider node
    <svg key="2" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M3 12h6m6 0h6" />
    </svg>,
    // Search sparkle
    <svg key="3" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="10" cy="10" r="6" />
      <path strokeLinecap="round" d="M14.5 14.5L20 20" />
      <path fill="currentColor" d="M11 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    </svg>,
    // 3D cube
    <svg key="4" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>,
    // Code brackets
    <svg key="5" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>,
    // Curly braces
    <span key="6" className="text-xl font-bold font-mono text-gray-900">{`{ }`}</span>,
    // Monitor screen
    <svg key="7" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="M8 21h8m-4-4v4" />
    </svg>,
    // Grid boxes
    <svg key="8" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path strokeLinecap="round" strokeWidth="2.5" d="M17.5 14v7m-3.5-3.5h7" />
    </svg>,
    // Pencil edit
    <svg key="9" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>,
    // Folder
    <svg key="10" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>,
    // Enter arrow
    <svg key="11" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5v7a2 2 0 002 2h13" />
    </svg>,
    // Terminal
    <svg key="12" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6m8 12h8" />
    </svg>,
  ];

  return (
    <div className="w-full bg-white py-6 overflow-hidden relative border-y border-gray-100 z-20 font-sans select-none">
      <div className="flex overflow-hidden whitespace-nowrap w-full relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-6 sm:gap-8 md:gap-10 shrink-0 px-4"
        >
          {icons.concat(icons).concat(icons).map((iconObj, idx) => {
            // Wave amplitude offsets based on index
            const waveY = Math.sin((idx % icons.length) * 0.6) * 16;

            return (
              <motion.div
                key={idx}
                animate={{ y: [waveY - 6, waveY + 6, waveY - 6] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: (idx % icons.length) * 0.2,
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gray-50/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200/80 flex items-center justify-center shrink-0 hover:scale-110 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {iconObj}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
