"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Copy, Check, Server, Film, Gamepad2, Tv, Globe } from "lucide-react";

interface FtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FtpServer {
  name: string;
  url: string;
  category: "movies" | "games" | "software" | "tv";
  description: string;
  isLocal: boolean;
}

const SERVERS_DATA: FtpServer[] = [
  {
    name: "Mamun Wifi local FTP",
    url: "ftp://10.10.10.10",
    category: "movies",
    description: "Our high-speed local movie, drama, and software server (Exclusive to Mamun Wifi users).",
    isLocal: true,
  },
  {
    name: "CircleFTP Media",
    url: "http://circleftp.net",
    category: "movies",
    description: "One of the largest BDIX movie servers featuring 4K UHD movies, TV series, and anime.",
    isLocal: false,
  },
  {
    name: "SamOnline FTP",
    url: "ftp://samftp.com",
    category: "software",
    description: "Massive library of latest PC games, Windows OS images, utility software, and console ROMs.",
    isLocal: false,
  },
  {
    name: "BDIX Live TV Portal",
    url: "http://bdix.tv",
    category: "tv",
    description: "Stream over 500+ local and international live high-definition television channels.",
    isLocal: false,
  },
  {
    name: "CrazyGames BDIX",
    url: "http://crazygames.com.bd",
    category: "games",
    description: "Low-latency local game server hosting popular multiplayer and single-player games.",
    isLocal: false,
  },
  {
    name: "FTP BD Storage",
    url: "ftp://ftpbd.com",
    category: "software",
    description: "A fast storage hub for utility packages, operating system ISO files, and software updates.",
    isLocal: false,
  }
];

export default function FtpModal({ isOpen, onClose }: FtpModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "movies":
        return <Film className="w-4 h-4 text-rose-400" />;
      case "games":
        return <Gamepad2 className="w-4 h-4 text-emerald-400" />;
      case "tv":
        return <Tv className="w-4 h-4 text-sky-400" />;
      default:
        return <Server className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl bg-[#0e111a] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-white overflow-hidden"
        >
          {/* Subtle colored glow lights */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

          {/* Header */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-['Google_Sans',sans-serif] tracking-tight">
                  Mamun Wifi FTP & BDIX পোর্টাল
                </h2>
                <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase mt-0.5">
                  High-Speed Local Entertainment Hub
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-300 mb-8 relative z-10 font-sans leading-relaxed">
            BDIX সংযোগের মাধ্যমে আমাদের লোকাল সার্ভারগুলো থেকে সর্বোচ্চ গতিতে মুভি, গেম এবং লাইভ টিভি উপভোগ করুন।
          </p>

          {/* Server Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 relative z-10 scrollbar-thin">
            {SERVERS_DATA.map((server, idx) => (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(server.category)}
                      <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-gray-400">
                        {server.category}
                      </span>
                    </div>
                    {server.isLocal && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-widest font-mono">
                        LOCAL
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-['Google_Sans',sans-serif] mb-1.5 group-hover:text-blue-400 transition-colors">
                    {server.name}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {server.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-3.5 mt-2">
                  {/* IP/URL label */}
                  <span className="text-xs font-mono text-gray-400 truncate max-w-[150px]">
                    {server.url}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(server.url, idx)}
                      title="Copy URL"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 animate-scale" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Go to Server Button */}
                    <a
                      href={server.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Speed Note Footer */}
          <div className="mt-8 text-center border-t border-white/5 pt-6 text-xs text-gray-500 font-mono">
            * Connection speed to these servers depends on your active package bandwidth and BDIX peering capacity.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
