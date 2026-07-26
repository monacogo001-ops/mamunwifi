"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, CheckCircle, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-gray-900 border border-gray-800 text-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/60">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#ff2a2a]" />
              <span className="font-semibold text-lg text-white">
                {PERSONAL_INFO.name}&apos;s Resume
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading ${PERSONAL_INFO.name}_Resume.pdf...`);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#ff2a2a] text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-950/50"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body - Resume Document Preview */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-800 pb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
                  {PERSONAL_INFO.name}
                </h2>
                <p className="text-[#ff2a2a] font-medium text-lg mb-3">
                  {PERSONAL_INFO.role}
                </p>
                <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
              </div>
              <div className="space-y-2 text-xs text-gray-400 sm:text-right">
                <div className="flex items-center sm:justify-end gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#ff2a2a]" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ff2a2a]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#ff2a2a]" />
                  <span>github.com/rafsan-dev</span>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Core Tech Stack & Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 15", "TypeScript", "React", "Node.js", "Tailwind CSS v4",
                  "Framer Motion", "GSAP", "MongoDB", "PostgreSQL", "Supabase",
                  "REST APIs", "GraphQL", "Git & GitHub", "AI Integration"
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 text-gray-200 text-xs rounded-full border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Featured Highlights
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800/80">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">Full Stack E-Commerce Engineering</h4>
                    <span className="text-xs text-red-400 font-mono">2024 - Present</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3">
                    Architected high-throughput automotive & luxury jewellery platforms using Next.js 15, PostgreSQL, and Supabase handling inventory, payment gateway workflows, and admin content management.
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#ff2a2a]" />
                      <span>Optimized web vitals resulting in under 1s average page loading time.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#ff2a2a]" />
                      <span>Integrated secure real-time payments and automated order notifications.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800/80">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">Frontend UI/UX & Motion Design</h4>
                    <span className="text-xs text-red-400 font-mono">2023 - Present</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Designed and built agency portals and creative web applications with Framer Motion, GSAP, and Tailwind CSS for smooth interactive micro-animations.
                  </p>
                </div>
              </div>
            </div>

            {/* Education / Credentials */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Education & Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-950/50 rounded-xl border border-gray-800">
                  <h4 className="font-semibold text-white text-sm mb-1">B.Sc. in Computer Science</h4>
                  <p className="text-xs text-gray-400">Software Engineering Specialization</p>
                </div>
                <div className="p-4 bg-gray-950/50 rounded-xl border border-gray-800">
                  <h4 className="font-semibold text-white text-sm mb-1">Meta Full-Stack Professional</h4>
                  <p className="text-xs text-gray-400">Advanced Web & API Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
