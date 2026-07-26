"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { getStoredPortfolioState, FullPortfolioState } from "@/lib/firebase";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [portfolioState, setPortfolioState] = useState<FullPortfolioState | null>(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    permission: false,
  });

  const [loading, setLoading] = useState(false);

  const syncState = () => {
    setPortfolioState(getStoredPortfolioState());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("portfolioStateUpdated", syncState);
    return () => window.removeEventListener("portfolioStateUpdated", syncState);
  }, []);

  // Parallax Scroll Animation for "CONTACT" Watermark Title
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const secConfig = portfolioState?.sectionsConfig.find((s) => s.id === "contact");
  if (secConfig && !secConfig.isActive) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.permission) {
      alert("Please accept the contact permission checkbox.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6121fad0-efc7-43d8-99fd-6eaa3e488287",
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          phone: formState.phone,
          message: formState.message,
        }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert(`Thanks ${formState.firstName}! Your message was sent successfully.`);
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          permission: false,
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error submitting form:", err);
      alert("Error sending message. Please try again later.");
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900 font-sans"
    >
      {/* Huge Parallax CONTACT Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-20 md:pt-16"
      >
        <h1 className="text-[14vw] md:text-[10vw] leading-[0.8] text-white/5 uppercase tracking-tighter select-none origin-top font-black">
          Contact
        </h1>
      </motion.div>

      {/* Slide-Up Deep Blue Contact Container */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#2563eb] w-full md:w-[85%] lg:w-[80%] p-8 md:p-14 text-white flex flex-col justify-between shadow-2xl rounded-none"
        >
          <div className="text-xs font-mono tracking-[0.2em] mb-8 uppercase opacity-90">
            Reach Us
          </div>

          {/* Contact Information Display Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b border-white/20 pb-10 font-['Hind_Siliguri','Google_Sans',sans-serif]">
            {/* Hotline */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-yellow-300 font-bold mb-2">
                <Phone className="w-3.5 h-3.5" />
                <span>হটলাইন (HOTLINE)</span>
              </div>
              <div className="text-base md:text-lg font-bold font-mono text-white tracking-wide space-y-1">
                <div>০১৭৭৯২৮৮৫৫৫</div>
                <div>০১৫৮১০২৭৯৭২</div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-yellow-300 font-bold mb-2">
                <Mail className="w-3.5 h-3.5" />
                <span>ইমেইল (EMAIL)</span>
              </div>
              <div className="text-sm md:text-base font-medium text-white break-all">
                mamunwifi247@gmail.com
              </div>
            </div>

            {/* Office */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-yellow-300 font-bold mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>অফিস (OFFICE)</span>
              </div>
              <div className="text-sm md:text-base font-semibold text-white">
                পশ্চিম সরমঙ্গল, বাংলাদেশ
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              
              {/* Left Column: 4 Underlined Inputs */}
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="Mobile No (10 digits)"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    maxLength={10}
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
              </div>

              {/* Right Column: Message TextArea */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Type your message here"
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none resize-none flex-1 min-h-[180px]"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Form Action Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="permission"
                  checked={formState.permission}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/40 bg-transparent text-black focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-white/90 font-medium">
                  I give permission to contact me at this email address.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-800 hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "Sending..." : "Send"}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
