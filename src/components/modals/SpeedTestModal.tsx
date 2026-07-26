"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Activity, ArrowDown, ArrowUp } from "lucide-react";
import confetti from "canvas-confetti";

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TestState = "idle" | "pinging" | "download" | "upload" | "complete";

export default function SpeedTestModal({ isOpen, onClose }: SpeedTestModalProps) {
  const [testState, setTestState] = useState<TestState>("idle");
  const [ping, setPing] = useState<number>(0);
  const [jitter, setJitter] = useState<number>(0);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setTestState("idle");
      setPing(0);
      setJitter(0);
      setDownloadSpeed(0);
      setUploadSpeed(0);
      setCurrentSpeed(0);
      setProgress(0);
    }
  }, [isOpen]);

  const runTest = async () => {
    // 1. Pinging State
    setTestState("pinging");
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      setPing(Math.floor(Math.random() * 3) + 2); // 2-4ms
      setJitter(Math.floor(Math.random() * 2) + 1); // 1-2ms
      await new Promise((r) => setTimeout(r, 120));
    }

    // 2. Download Speed Test
    setTestState("download");
    setProgress(0);
    const targetDownload = parseFloat((Math.random() * 15 + 85).toFixed(1)); // 85 - 100 Mbps
    
    // Animate download speed
    const steps = 30;
    for (let i = 1; i <= steps; i++) {
      const currentProgress = (i / steps) * 100;
      setProgress(currentProgress);
      
      // Simulate fluctuation and growth
      let speed = (i / steps) * targetDownload;
      if (i < steps) {
        speed += (Math.random() - 0.5) * 8; // add some fluctuation
      }
      speed = Math.max(0, parseFloat(speed.toFixed(1)));
      setCurrentSpeed(speed);
      setDownloadSpeed(speed);
      await new Promise((r) => setTimeout(r, 80));
    }
    setDownloadSpeed(targetDownload);
    setCurrentSpeed(targetDownload);

    await new Promise((r) => setTimeout(r, 600));

    // 3. Upload Speed Test
    setTestState("upload");
    setProgress(0);
    const targetUpload = parseFloat((Math.random() * 10 + 80).toFixed(1)); // 80 - 90 Mbps
    
    for (let i = 1; i <= steps; i++) {
      const currentProgress = (i / steps) * 100;
      setProgress(currentProgress);
      
      let speed = (i / steps) * targetUpload;
      if (i < steps) {
        speed += (Math.random() - 0.5) * 6;
      }
      speed = Math.max(0, parseFloat(speed.toFixed(1)));
      setCurrentSpeed(speed);
      setUploadSpeed(speed);
      await new Promise((r) => setTimeout(r, 80));
    }
    setUploadSpeed(targetUpload);
    setCurrentSpeed(targetUpload);

    await new Promise((r) => setTimeout(r, 600));

    // 4. Complete
    setTestState("complete");
    setCurrentSpeed(0);
    setProgress(100);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#facc15", "#10b981"],
      });
    } catch (e) {
      console.log("Confetti error", e);
    }
  };

  if (!isOpen) return null;

  // Gauge values configuration
  const maxDisplaySpeed = 120;
  const maxStroke = 502; // 2 * PI * r (r=80)
  const speedPercentage = Math.min(currentSpeed / maxDisplaySpeed, 1);
  const strokeOffset = maxStroke - speedPercentage * maxStroke;

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
          className="relative w-full max-w-lg bg-[#0e111a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-white overflow-hidden"
        >
          {/* Subtle colored glow lights */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]" />

          {/* Header */}
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-xl font-bold font-['Google_Sans',sans-serif] tracking-tight">
                Mamun Wifi স্পিড টেস্ট
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Test area */}
          <div className="flex flex-col items-center justify-center relative z-10 my-4">
            
            {/* Speed Gauge Meter */}
            <div className="relative w-56 h-56 flex items-center justify-center mb-6">
              {/* Circular track */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="80"
                  className="stroke-[#1e293b] fill-none"
                  strokeWidth="10"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="80"
                  className={`fill-none transition-all duration-100 ${
                    testState === "download" ? "stroke-blue-500" : testState === "upload" ? "stroke-amber-500" : "stroke-blue-600"
                  }`}
                  strokeWidth="10"
                  strokeDasharray={maxStroke}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Gauge text contents */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {testState === "idle" && (
                  <button
                    onClick={runTest}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 flex flex-col items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 group cursor-pointer"
                  >
                    <Play className="w-7 h-7 text-white fill-white group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold mt-1 tracking-wider uppercase">START</span>
                  </button>
                )}

                {testState === "pinging" && (
                  <div className="flex flex-col items-center animate-pulse">
                    <Activity className="w-8 h-8 text-blue-400 mb-1" />
                    <span className="text-xs font-mono text-gray-400">Pinging Server...</span>
                    <span className="text-xl font-bold mt-1">{progress}%</span>
                  </div>
                )}

                {(testState === "download" || testState === "upload") && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase font-mono mb-1">
                      {testState === "download" ? "Downloading" : "Uploading"}
                    </span>
                    <span className="text-5xl font-black font-mono tracking-tighter tabular-nums">
                      {currentSpeed}
                    </span>
                    <span className="text-xs text-gray-400 font-mono mt-1">Mbps</span>
                  </div>
                )}

                {testState === "complete" && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1 font-mono">
                      Test Complete
                    </span>
                    <span className="text-4xl font-extrabold text-white font-mono">
                      {downloadSpeed}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Mbps Download</span>
                    
                    <button
                      onClick={runTest}
                      className="mt-3 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retest</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick status bar */}
            <div className="w-full bg-[#161a26] border border-white/5 rounded-2xl p-4 grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Ping</div>
                <div className="text-sm font-semibold font-mono text-blue-400">
                  {ping > 0 ? `${ping} ms` : "--"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Jitter</div>
                <div className="text-sm font-semibold font-mono text-blue-400">
                  {jitter > 0 ? `${jitter} ms` : "--"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-0.5">
                  <ArrowDown className="w-3 h-3 text-blue-400" />
                  <span>Download</span>
                </div>
                <div className="text-sm font-semibold font-mono text-blue-400">
                  {downloadSpeed > 0 ? `${downloadSpeed} Mbps` : "--"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-0.5">
                  <ArrowUp className="w-3 h-3 text-amber-500" />
                  <span>Upload</span>
                </div>
                <div className="text-sm font-semibold font-mono text-amber-400">
                  {uploadSpeed > 0 ? `${uploadSpeed} Mbps` : "--"}
                </div>
              </div>
            </div>

            {/* Simulated ISP connection note */}
            {testState === "complete" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center text-xs text-gray-400 font-['Google_Sans',sans-serif]"
              >
                Your connection is running at optimal speeds. Powered by <span className="text-[#2563eb] font-semibold">Mamun Wifi Ultra Fiber</span>.
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
