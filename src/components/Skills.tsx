"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function Skills() {
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [complaintTab, setComplaintTab] = useState<"submit" | "status">("submit");
  const [complaintName, setComplaintName] = useState("");
  const [complaintMobile, setComplaintMobile] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("স্লো ইন্টারনেট");
  const [complaintTicket, setComplaintTicket] = useState<string | null>(null);
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);
  const [searchTicketInput, setSearchTicketInput] = useState("");
  const [searchResult, setSearchResult] = useState<{ found: boolean; ticket: string; status: string; time: string } | null>(null);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const secConfig = portfolioState?.sectionsConfig.find((s) => s.id === "skills");
  if (secConfig && !secConfig.isActive) return null;

  const skillCards = portfolioState?.skillCardsData.filter((c) => c.isActive) || [];

  if (skillCards.length === 0) {
    return null;
  }

  // Predefined design styles for 1-to-1 visual match (changed purple to blue for Mamun Wifi)
  const cardDesigns: Record<string, { colSpan: string; bgColor: string; borderColor: string }> = {
    frontend: {
      colSpan: "lg:col-span-2",
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-200/60",
    },
    backend: {
      colSpan: "lg:col-span-1",
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-200/60",
    },
    ai: {
      colSpan: "lg:col-span-1",
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-200/60",
    },
    cloud: {
      colSpan: "lg:col-span-2",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-200/60",
    },
  };

  return (
    <section id="skills" className="relative w-full bg-white mt-12 md:-mt-14 pt-6 md:pt-0 pb-12 md:pb-16 overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header with Slide-Up Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 font-['Tiro_Bangla','Noto_Serif_Bengali','Google_Sans',sans-serif]"
        >
          <div>
            <span className="inline-block text-xs font-semibold text-[#2563eb] uppercase tracking-[0.15em] px-4 py-1.5 bg-blue-50 rounded-full mb-4 border border-blue-100 shadow-xs font-mono">
              NETWORK INFRASTRUCTURE
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              আমাদের প্রযুক্তি ও <span className="text-[#2563eb]">সেবাসমূহ</span>
            </h2>
          </div>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md font-medium">
            উন্নত মানের নেটওয়ার্ক সলিউশন, উচ্চগতির ব্রডব্যান্ড এবং নিরবচ্ছিন্ন ফাইবার অপটিক ইন্টারনেট সংযোগ।
          </p>
        </motion.div>

        {/* 4 Skill Cards Grid with Left / Right Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(260px,auto)]">
          {skillCards.map((cat, idx) => {
            const isNetworkCard = cat.id === "frontend" || cat.category.toLowerCase().includes("network");
            const isServiceCard = cat.id === "backend" || cat.category.toLowerCase().includes("service");
            const isComplaintCard = cat.id === "cloud" || cat.category.toLowerCase().includes("cloud") || cat.category.toLowerCase().includes("complaint");

            const videoSrc = isNetworkCard 
              ? (cat.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-glowing-fiber-optic-cables-in-motion-41584-large.mp4")
              : cat.videoUrl;

            const hasVideo = Boolean(videoSrc);

            const categoryTitle = isServiceCard ? "SERVICE AREA" : cat.category;
            const categoryDesc = isServiceCard ? "আমাদের ফাইবার অপটিক ইন্টারনেট সেবার কভারেজ এলাকাসমূহ:" : cat.description;

            const defaultAreaPills = [
              "পশ্চিম সরমঙ্গল",
              "টেকেরহাট",
              "ঘোসাল কান্দি",
              "তেঁতুল তলা",
              "মন্দির রোড",
              "মাস্টার কলনি",
              "ঘোসাল কান্দি শেখ বাড়ি",
              "খালিয়া",
              "মাঝি কান্দি",
              "বৌলগ্রাম"
            ];

            const pills = isNetworkCard
              ? []
              : isServiceCard
              ? defaultAreaPills
              : (cat.skillsText ? cat.skillsText.split(",").map((s) => s.trim()) : []);

            const design = cardDesigns[cat.id] || {
              colSpan: "lg:col-span-1",
              bgColor: "bg-gray-50/50",
              borderColor: "border-gray-200/60",
            };

            const isLeftAnimation = isNetworkCard;
            const isRightAnimation = isServiceCard;

            return (
              <motion.div
                key={cat.id}
                initial={{
                  opacity: 0,
                  x: isLeftAnimation ? -70 : isRightAnimation ? 70 : 0,
                  y: isComplaintCard ? 50 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                onClick={() => {
                  if (hasVideo && videoSrc) {
                    setModalVideoUrl(videoSrc);
                  }
                }}
                className={`group relative ${design.colSpan} ${design.bgColor} border ${design.borderColor} rounded-[2rem] p-8 md:p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                  hasVideo ? "cursor-pointer" : "will-change-transform"
                }`}
              >
                {isComplaintCard ? (
                  <div className="relative z-10 flex flex-col justify-between h-full font-['Hind_Siliguri','Google_Sans',sans-serif]">
                    <div>
                      {/* 2 Tabs Header Switcher */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <button
                          type="button"
                          onClick={() => setComplaintTab("submit")}
                          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                            complaintTab === "submit"
                              ? "bg-slate-900 text-yellow-400 border border-slate-900 shadow-md"
                              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span>অভিযোগ জানান</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setComplaintTab("status")}
                          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                            complaintTab === "status"
                              ? "bg-slate-900 text-yellow-400 border border-slate-900 shadow-md"
                              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span>অভিযোগের বর্তমান অবস্থা জানুন</span>
                        </button>
                      </div>

                      {/* Tab 1: Submit Complaint */}
                      {complaintTab === "submit" && (
                        <div>
                          {complaintTicket ? (
                            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-emerald-900 space-y-2">
                              <div className="flex items-center gap-2 font-bold text-base text-emerald-700">
                                <span>আপনার অভিযোগটি সফলভাবে জমা নেওয়া হয়েছে!</span>
                              </div>
                              <p className="text-xs font-mono">
                                টিকিট আইডি: <span className="font-bold text-emerald-950 font-mono text-sm">{complaintTicket}</span>
                              </p>
                              <p className="text-xs text-emerald-800">
                                আমাদের সাপোর্ট টিম অতি শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                              </p>
                              <button
                                type="button"
                                onClick={() => setComplaintTicket(null)}
                                className="mt-2 text-xs text-blue-600 underline font-semibold cursor-pointer"
                              >
                                নতুন অভিযোগ জমা দিন
                              </button>
                            </div>
                          ) : (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!complaintMobile.trim()) {
                                  alert("দয়া করে আপনার মোবাইল নম্বর দিন");
                                  return;
                                }
                                setIsSubmittingComplaint(true);
                                setTimeout(() => {
                                  setIsSubmittingComplaint(false);
                                  const ticket = `CMP-${Math.floor(Math.random() * 8999 + 1000)}`;
                                  setComplaintTicket(ticket);
                                  setSearchTicketInput(ticket);
                                  setComplaintName("");
                                  setComplaintMobile("");
                                  setComplaintDetails("");
                                }, 700);
                              }}
                              className="space-y-4"
                            >
                              {/* Row 1: Name and Mobile Number */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  placeholder="আপনার নাম"
                                  value={complaintName}
                                  onChange={(e) => setComplaintName(e.target.value)}
                                  className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs font-medium"
                                />
                                <input
                                  type="tel"
                                  placeholder="মোবাইল নম্বর*"
                                  value={complaintMobile}
                                  onChange={(e) => setComplaintMobile(e.target.value)}
                                  required
                                  className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs font-medium"
                                />
                              </div>

                              {/* Row 2: Select Problem Type */}
                              <div>
                                <select
                                  value={selectedIssue}
                                  onChange={(e) => setSelectedIssue(e.target.value)}
                                  className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs font-medium cursor-pointer"
                                >
                                  <option value="" disabled>সমস্যার ধরন নির্বাচন করুন</option>
                                  <option value="স্লো ইন্টারনেট">স্লো ইন্টারনেট (Slow Speed)</option>
                                  <option value="লাইন বিচ্ছিন্ন">লাইন বিচ্ছিন্ন (Disconnected)</option>
                                  <option value="রাউটার বা লাল বাতি">রাউটার বা লাল বাতি (Router Red Light)</option>
                                  <option value="বিলিং সংক্রান্ত">বিলিং সংক্রান্ত (Billing Issue)</option>
                                  <option value="অন্যান্য সমস্যা">অন্যান্য সমস্যা (Other)</option>
                                </select>
                              </div>

                              {/* Row 3: Write Details */}
                              <div>
                                <textarea
                                  placeholder="সমস্যার বিস্তারিত লিখুন..."
                                  value={complaintDetails}
                                  onChange={(e) => setComplaintDetails(e.target.value)}
                                  rows={3}
                                  className="w-full bg-white border border-gray-300 rounded-2xl p-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none shadow-xs font-medium"
                                />
                              </div>

                              {/* Action Button: Submit Complaint */}
                              <button
                                type="submit"
                                disabled={isSubmittingComplaint}
                                className="w-full py-4 bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-bold text-base rounded-2xl shadow-md transition-all duration-300 cursor-pointer disabled:opacity-50"
                              >
                                {isSubmittingComplaint ? "জমা দেওয়া হচ্ছে..." : "অভিযোগ জমা দিন"}
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      {/* Tab 2: Check Complaint Status */}
                      {complaintTab === "status" && (
                        <div className="space-y-4">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!searchTicketInput.trim()) {
                                alert("দয়া করে আপনার টিকিট আইডি বা মোবাইল নম্বর দিন");
                                return;
                              }
                              setSearchResult({
                                found: true,
                                ticket: searchTicketInput,
                                status: "প্রসেসিং চলছে (টেকনিশিয়ান অ্যাসাইন করা হয়েছে)",
                                time: "আজ ৩:৩০ PM",
                              });
                            }}
                            className="space-y-4"
                          >
                            <input
                              type="text"
                              placeholder="টিকিট আইডি বা মোবাইল নম্বর দিন"
                              value={searchTicketInput}
                              onChange={(e) => setSearchTicketInput(e.target.value)}
                              required
                              className="w-full bg-white border border-gray-300 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono shadow-xs font-semibold"
                            />

                            <button
                              type="submit"
                              className="w-full py-4 bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-bold text-base rounded-2xl shadow-md transition-all duration-300 cursor-pointer"
                            >
                              খুঁজুন
                            </button>
                          </form>

                          {/* Search Results Display */}
                          {searchResult && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-2 mt-4 shadow-sm"
                            >
                              <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                                <span>টিকিট: <strong className="text-gray-900">{searchResult.ticket}</strong></span>
                                <span className="text-emerald-600 font-bold">সক্রিয়</span>
                              </div>
                              <div className="text-sm font-bold text-slate-900 font-['Hind_Siliguri',sans-serif]">
                                অবস্থা: {searchResult.status}
                              </div>
                              <p className="text-xs text-gray-600">
                                আমাদের টেকনিক্যাল ইনচার্জ ফিল্ড ওয়ার্ক করছেন।
                              </p>
                            </motion.div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dynamically Loaded Background Video */}
                    {hasVideo && videoSrc && (
                      <>
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none z-0"
                        >
                          <source src={videoSrc} />
                        </video>
                        {/* Dark gradient overlay for text readability over video */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none z-0" />
                      </>
                    )}

                    {/* White Hover Highlight (Disabled for Video Cards) */}
                    {!hasVideo && (
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0" />
                    )}

                    <div className="relative z-10 mb-6">
                      {/* Skill Card Title */}
                      <h3 className={`text-2xl md:text-3xl font-bold mb-3 tracking-[0.05em] uppercase font-['Montserrat',sans-serif] transition-colors duration-300 ${
                        hasVideo ? "text-white drop-shadow-md" : "text-gray-900 group-hover:text-[#2563eb]"
                      }`}>
                        {categoryTitle}
                      </h3>

                      {/* Skill Card Subtitle Paragraph */}
                      <p className={`text-sm md:text-base leading-relaxed max-w-sm font-normal font-['Google_Sans',sans-serif] tracking-normal ${
                        hasVideo ? "text-gray-100 drop-shadow-sm" : "text-gray-600"
                      }`}>
                        {categoryDesc}
                      </p>
                    </div>

                    {/* Skills/Location Pills */}
                    {pills.length > 0 && (
                      <div className="relative z-10 flex flex-wrap gap-2.5 font-['Google_Sans',sans-serif]">
                        {pills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            onClick={(e) => {
                              if (hasVideo) e.stopPropagation();
                            }}
                            className={`px-3.5 py-1.5 text-xs md:text-sm rounded-xl font-medium transition-all duration-300 cursor-default shadow-xs ${
                              isServiceCard
                                ? "bg-blue-50/90 text-blue-900 border border-blue-200/80 hover:bg-blue-600 hover:text-white"
                                : "bg-white/90 text-gray-700 backdrop-blur-md border border-black/5 hover:shadow-md hover:-translate-y-1 hover:text-[#2563eb]"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Premium Full-Screen Video Lightbox Modal Popup */}
      {modalVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <button
            onClick={() => setModalVideoUrl(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl transition-all duration-300 z-50 border border-white/10"
          >
            ✕
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video
              src={modalVideoUrl}
              autoPlay
              controls
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

    </section>
  );
}
