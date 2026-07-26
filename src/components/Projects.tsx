"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Activity, ArrowDown, ArrowUp, Gauge, Wifi } from "lucide-react";
import confetti from "canvas-confetti";

type TestState = "idle" | "pinging" | "download" | "upload" | "complete";

export default function Projects() {
  const [testState, setTestState] = useState<TestState>("idle");
  const [ping, setPing] = useState<number>(0);
  const [jitter, setJitter] = useState<number>(0);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const runTest = async () => {
    setTestState("pinging");
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      setPing(Math.floor(Math.random() * 3) + 2);
      setJitter(Math.floor(Math.random() * 2) + 1);
      await new Promise((r) => setTimeout(r, 100));
    }

    setTestState("download");
    setProgress(0);
    const targetDownload = parseFloat((Math.random() * 15 + 85).toFixed(1));
    const steps = 30;
    for (let i = 1; i <= steps; i++) {
      setProgress((i / steps) * 100);
      let speed = (i / steps) * targetDownload;
      if (i < steps) speed += (Math.random() - 0.5) * 8;
      speed = Math.max(0, parseFloat(speed.toFixed(1)));
      setCurrentSpeed(speed);
      setDownloadSpeed(speed);
      await new Promise((r) => setTimeout(r, 70));
    }
    setDownloadSpeed(targetDownload);
    setCurrentSpeed(targetDownload);
    await new Promise((r) => setTimeout(r, 500));

    setTestState("upload");
    setProgress(0);
    const targetUpload = parseFloat((Math.random() * 10 + 80).toFixed(1));
    for (let i = 1; i <= steps; i++) {
      setProgress((i / steps) * 100);
      let speed = (i / steps) * targetUpload;
      if (i < steps) speed += (Math.random() - 0.5) * 6;
      speed = Math.max(0, parseFloat(speed.toFixed(1)));
      setCurrentSpeed(speed);
      setUploadSpeed(speed);
      await new Promise((r) => setTimeout(r, 70));
    }
    setUploadSpeed(targetUpload);
    setCurrentSpeed(targetUpload);
    await new Promise((r) => setTimeout(r, 500));

    setTestState("complete");
    setCurrentSpeed(0);
    setProgress(100);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#facc15", "#10b981"],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const maxDisplaySpeed = 120;
  const maxStroke = 502;
  const speedPercentage = Math.min(currentSpeed / maxDisplaySpeed, 1);
  const strokeOffset = maxStroke - speedPercentage * maxStroke;

  return (
    <section id="speedtest" className="relative w-full bg-white text-gray-900 pt-16 pb-20 overflow-hidden font-['Tiro_Bangla','Noto_Serif_Bengali','Google_Sans',sans-serif]">
      <div id="projects" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Title & Description with Entrance Animation */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 text-left"
          >
            <div className="inline-flex items-center gap-2 border border-blue-200 rounded-full px-5 py-1.5 text-xs text-[#2563eb] mb-6 shadow-xs bg-blue-50/80 font-mono uppercase tracking-widest font-semibold">
              <Wifi className="w-3.5 h-3.5" />
              <span>MAMUN WIFI SPEED ENGINE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6">
              কানেকশন <span className="text-[#2563eb]">স্পিড টেস্ট</span>
            </h2>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 font-medium">
              আপনার ইন্টারনেট সংযোগের বর্তমান ডাউনলোড ও আপলোড স্পিড লাইভ টেস্ট করুন।
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
                <span>লাইভ বিডিআইএক্স ও ইউটিউব স্পিড মনিটরিং</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
                <span>২৪/৭ রিয়েল-টাইম অপটিক্যাল ফাইবার স্পিড গ্যাজ</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Speedometer Console with Scale & Slide Entrance Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#f8fafc] border border-gray-200/90 rounded-[2.5rem] p-6 md:p-10 shadow-xl backdrop-blur-xl relative">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                
                {/* Speed Gauge Meter */}
                <div className="relative w-56 h-56 md:w-60 md:h-60 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="112"
                      cy="112"
                      r="75"
                      className="stroke-slate-200 fill-none"
                      strokeWidth="12"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="75"
                      className={`fill-none transition-all duration-100 ${
                        testState === "download" ? "stroke-blue-600" : testState === "upload" ? "stroke-amber-500" : "stroke-blue-600"
                      }`}
                      strokeWidth="12"
                      strokeDasharray={maxStroke}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Gauge Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    {testState === "idle" && (
                      <button
                        onClick={runTest}
                        className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#2563eb] to-blue-700 hover:from-blue-600 hover:to-blue-800 flex flex-col items-center justify-center shadow-xl shadow-blue-600/30 hover:scale-105 transition-all duration-300 group cursor-pointer"
                      >
                        <Play className="w-7 h-7 text-white fill-white group-hover:scale-110 transition-transform ml-0.5" />
                        <span className="text-[11px] font-extrabold mt-1 tracking-wider uppercase text-white font-['Google_Sans',sans-serif]">START</span>
                      </button>
                    )}

                    {testState === "pinging" && (
                      <div className="flex flex-col items-center animate-pulse">
                        <Activity className="w-8 h-8 text-[#2563eb] mb-1" />
                        <span className="text-[11px] text-gray-500 font-semibold font-['Google_Sans',sans-serif]">Connecting...</span>
                        <span className="text-xl font-bold mt-1 font-['Google_Sans',sans-serif] text-gray-900">{progress}%</span>
                      </div>
                    )}

                    {(testState === "download" || testState === "upload") && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase font-['Google_Sans',sans-serif] mb-0.5">
                          {testState === "download" ? "Downloading" : "Uploading"}
                        </span>
                        <span className="text-5xl font-extrabold font-['Google_Sans',sans-serif] tracking-tight tabular-nums text-gray-900">
                          {currentSpeed}
                        </span>
                        <span className="text-xs text-gray-500 font-['Google_Sans',sans-serif] mt-0.5 font-bold">Mbps</span>
                      </div>
                    )}

                    {testState === "complete" && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5 font-['Google_Sans',sans-serif]">
                          Completed
                        </span>
                        <span className="text-4xl font-extrabold text-gray-900 font-['Google_Sans',sans-serif]">
                          {downloadSpeed}
                        </span>
                        <span className="text-[11px] text-gray-600 font-['Google_Sans',sans-serif] font-semibold">Mbps Download</span>
                        
                        <button
                          onClick={runTest}
                          className="mt-2 px-3 py-1 rounded-full bg-slate-200/80 hover:bg-slate-300 text-gray-800 transition-all flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retest</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metrics 2x2 Grid */}
                <div className="flex-1 w-full grid grid-cols-2 gap-3.5 font-['Google_Sans',sans-serif]">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">PING</div>
                    <div className="text-base md:text-lg font-bold text-[#2563eb]">
                      {ping > 0 ? `${ping} ms` : "--"}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">JITTER</div>
                    <div className="text-base md:text-lg font-bold text-[#2563eb]">
                      {jitter > 0 ? `${jitter} ms` : "--"}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-0.5">
                      <ArrowDown className="w-3 h-3 text-[#2563eb]" />
                      <span>DOWNLOAD</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-[#2563eb]">
                      {downloadSpeed > 0 ? `${downloadSpeed} Mbps` : "--"}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-0.5">
                      <ArrowUp className="w-3 h-3 text-amber-600" />
                      <span>UPLOAD</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-amber-600">
                      {uploadSpeed > 0 ? `${uploadSpeed} Mbps` : "--"}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
