"use client";

import React, { useState, useEffect } from "react";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function Certifications() {
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const secConfig = portfolioState?.sectionsConfig.find((s) => s.id === "certifications");
  if (secConfig && !secConfig.isActive) return null;

  const certs = portfolioState?.certificationsData.filter((c) => c.isActive) || [];

  if (certs.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative w-full bg-white pt-6 pb-20 md:pt-10 md:pb-28 overflow-hidden font-['Google_Sans',sans-serif]">
      {/* Background Dot Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-semibold text-[#7c3aed] uppercase tracking-[0.15em] px-4 py-1.5 bg-purple-50 rounded-full mb-4 border border-purple-100 shadow-sm font-['Google_Sans',sans-serif]">
              Achievements
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight font-['Google_Sans',sans-serif]">
              Licenses & <span className="text-[#7c3aed]">Certifications</span>.
            </h2>
          </div>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-normal font-['Google_Sans',sans-serif]">
            Verified credentials and certifications in full-stack web development, frontend frameworks, and computer science.
          </p>
        </div>

        {/* Dynamic Certifications List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-50/70 border border-gray-200/80 rounded-3xl p-8 hover:bg-white hover:border-purple-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Hover Left Accent Indicator Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="text-xs font-semibold text-[#7c3aed] uppercase tracking-wider mb-2 font-mono">
                  {cert.organization}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight group-hover:text-[#7c3aed] transition-colors">
                  {cert.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed font-normal">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>Verified Credential</span>
                <span className="text-[#7c3aed] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Badge →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
