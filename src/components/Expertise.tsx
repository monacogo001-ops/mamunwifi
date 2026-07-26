"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

interface MilestoneCardProps {
  number: string;
  title: string;
  text: string;
  price?: string;
  className: string;
  slideDirection: "left" | "right";
}

function MilestoneCard({
  number,
  title,
  text,
  price,
  className,
  slideDirection,
}: MilestoneCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const inFocalZone = rect.top <= viewportHeight * 0.65 && rect.bottom >= viewportHeight * 0.25;
      setIsActive(inFocalZone);
    };

    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    checkScrollPosition();
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: slideDirection === "right" ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`md:absolute md:w-[480px] rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-500 z-10 ${className} ${
        isActive
          ? "bg-[#2563eb] border-blue-400 shadow-[0_20px_50px_rgba(37,99,235,0.4)] scale-[1.02]"
          : "bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      }`}
    >
      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300 absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isActive ? "bg-blue-300" : "bg-gray-400"}`} />
      </div>

      <div
        className={`w-full h-full rounded-[1.5rem] mt-6 p-8 flex flex-col min-h-[220px] transition-colors duration-500 font-['Tiro_Bangla','Noto_Serif_Bengali','Google_Sans',sans-serif] ${
          isActive ? "bg-blue-900/50 text-white" : "bg-[#f4f4f4] text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xl font-serif italic transition-colors duration-500 ${
              isActive ? "text-blue-200" : "text-gray-400"
            }`}
          >
            {number}
          </span>
          {price && (
            <span
              className={`text-sm md:text-base font-bold font-['Tiro_Bangla','Noto_Serif_Bengali',sans-serif] px-3.5 py-1 rounded-full transition-colors duration-500 shadow-sm ${
                isActive
                  ? "bg-white/20 text-white border border-white/20"
                  : "bg-blue-600 text-white"
              }`}
            >
              {price}
            </span>
          )}
        </div>

        <h3
          className={`text-2xl md:text-3xl font-semibold mb-3 tracking-tight leading-snug font-['Tiro_Bangla','Noto_Serif_Bengali',sans-serif] transition-colors duration-500 ${
            isActive ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>

        <p
          className={`text-sm md:text-base font-normal leading-relaxed tracking-normal font-['Tiro_Bangla','Noto_Serif_Bengali',sans-serif] transition-colors duration-500 ${
            isActive ? "text-blue-100" : "text-gray-600"
          }`}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function TypewriterHeader({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {},
      }}
      className={className}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-2.5">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.15 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const secConfig = portfolioState?.sectionsConfig.find((s) => s.id === "expertise");
  if (secConfig && !secConfig.isActive) return null;
  if (portfolioState && !portfolioState.expertiseData.isActive) return null;

  const sectionBadge = portfolioState?.expertiseData.sectionBadge || "Our Services";
  const sectionTitle = portfolioState?.expertiseData.sectionTitle || "High-Speed Internet & Professional IT Network Setup";
  const sectionSubtitle = portfolioState?.expertiseData.sectionSubtitle || "Delivering fast, stable, and highly secure internet connections and enterprise IT network configurations for residential and corporate sectors.";

  const activeCards = portfolioState?.expertiseData.cards.filter(c => c.isActive) || [];

  const cardPositions = [
    { pos: "md:top-[10px] md:right-[2%] lg:right-[5%] md:-rotate-1", dir: "right" as const },
    { pos: "md:top-[560px] md:left-[2%] lg:left-[5%] md:rotate-2", dir: "left" as const },
    { pos: "md:top-[1050px] md:right-[2%] lg:right-[5%] md:-rotate-2", dir: "right" as const },
  ];

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="bg-white pt-24 pb-8 md:pb-12 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto relative md:h-[1480px]">
        
        {/* Header Box */}
        <div className="md:absolute top-10 left-0 md:w-[480px] lg:w-[500px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-blue-200 rounded-full px-5 py-1.5 text-sm text-[#2563eb] mb-8 shadow-sm bg-blue-50 font-medium font-['Google_Sans',sans-serif]">
            {sectionBadge}
          </div>
          
          <TypewriterHeader
            text={sectionTitle}
            className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.08] mb-6 tracking-tight font-medium font-['Google_Sans',sans-serif]"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed font-normal font-['Google_Sans',sans-serif]"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* Desktop S-Curve Path (Hidden on Mobile & Tablet to Prevent Text Overlap) */}
        <svg
          className="hidden xl:block absolute top-0 left-0 w-full h-[1480px] pointer-events-none z-0"
          viewBox="0 0 1000 1480"
          preserveAspectRatio="none"
        >
          <path
            d="M 820,100 C 600,280 400,450 350,720 C 300,980 750,950 700,1200 C 650,1350 350,1380 180,1440"
            fill="none"
            stroke="#dbeafe"
            strokeWidth="2"
            strokeDasharray="8 10"
          />
          <mask id="path-mask">
            <motion.path
              d="M 820,100 C 600,280 400,450 350,720 C 300,980 750,950 700,1200 C 650,1350 350,1380 180,1440"
              fill="none"
              stroke="white"
              strokeWidth="20"
              style={{ pathLength }}
            />
          </mask>
          <path
            d="M 650,200 C 400,320 200,450 300,720 C 400,980 750,950 700,1200 C 650,1350 350,1380 180,1440"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeDasharray="8 10"
            mask="url(#path-mask)"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Endpoint Technical Stack Badge */}
        <div className="hidden md:flex absolute top-[1425px] left-[130px] z-30 items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#2563eb] border-4 border-blue-200 shadow-md animate-pulse" />
          <span className="inline-block text-xs font-semibold text-[#2563eb] uppercase tracking-[0.15em] px-4 py-1.5 bg-blue-50 rounded-full border border-blue-200 shadow-sm font-['Google_Sans',sans-serif]">
            Technical Stack
          </span>
        </div>

        {/* Mobile Animated Line */}
        <svg
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 2,0 L 2,100"
            fill="none"
            stroke="#dbeafe"
            strokeWidth="4"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
          <mask id="path-mask-mobile">
            <motion.path
              d="M 2,0 L 2,100"
              fill="none"
              stroke="white"
              strokeWidth="4"
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path
            d="M 2,0 L 2,100"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeDasharray="4 6"
            mask="url(#path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Milestone Cards */}
        <div className="flex flex-col gap-12 md:gap-0 relative z-10">
          {activeCards.map((item, idx) => {
            const defaultTitles = ["সিলভার (10 Mbps)", "গোল্ড (25 Mbps)", "ডায়মন্ড (50 Mbps)"];
            const defaultPrices = ["৳৫০০/মাস", "৳৮০০/মাস", "৳১২০০/মাস"];
            const defaultDescs = [
              "আনলিমিটেড ব্রাউজিং, বাফারলেস ইউটিউব এবং ২৪/৭ সাপোর্ট।",
              "আনলিমিটেড ৪কে স্ট্রিমিং, ফাস্ট গেমিং, আল্ট্রা-লো ল্যাটেন্সি এবং বিডিআইএক্সে ফুল স্পিড।",
              "মাল্টি-ডিভাইস হেভি ইউজ, আনলিমিটেড ডাউনলোড, ডেডিকেটেড ব্যান্ডউইথ এবং ২৪/৭ ভিআইপি সাপোর্ট।"
            ];

            const cardTitle = (item.title && (item.title.includes("সিলভার") || item.title.includes("গোল্ড") || item.title.includes("ডায়মন্ড"))) 
              ? item.title 
              : defaultTitles[idx] || item.title;

            const cardPrice = item.price || defaultPrices[idx];

            const cardText = (item.description && !item.description.includes("Deploying") && !item.description.includes("Designing") && !item.description.includes("Providing"))
              ? item.description
              : defaultDescs[idx] || item.description;

            return (
              <MilestoneCard
                key={idx}
                number={item.number}
                title={cardTitle}
                price={cardPrice}
                text={cardText}
                className={cardPositions[idx]?.pos || ""}
                slideDirection={cardPositions[idx]?.dir || "right"}
              />
            );
          })}
        </div>

        {/* Handwritten Annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden md:block absolute top-[1350px] left-[60%] font-['Caveat',cursive] text-3xl text-blue-600 rotate-6 select-none"
        >
          Turning ideas into reality!
        </motion.div>

      </div>
    </section>
  );
}
