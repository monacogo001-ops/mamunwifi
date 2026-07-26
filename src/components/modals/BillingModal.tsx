"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, CheckCircle2, ShieldCheck, Wallet, ArrowRight, Loader2 } from "lucide-react";

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  color: string;
  hoverBg: string;
  textColor: string;
}

const METHODS_DATA: PaymentMethod[] = [
  { id: "bkash", name: "bKash", color: "bg-[#e2136e]", hoverBg: "hover:bg-[#c90a5e]", textColor: "text-white" },
  { id: "nagad", name: "Nagad", color: "bg-[#f69220]", hoverBg: "hover:bg-[#df7d12]", textColor: "text-white" },
  { id: "rocket", name: "Rocket", color: "bg-[#8c3494]", hoverBg: "hover:bg-[#72237a]", textColor: "text-white" },
  { id: "card", name: "Credit/Debit Card", color: "bg-blue-600", hoverBg: "hover:bg-blue-500", textColor: "text-white" },
];

const PACKAGES_DATA = [
  { id: "pkg-1", name: "Standard 10 Mbps", price: 500 },
  { id: "pkg-2", name: "Premium 25 Mbps", price: 800 },
  { id: "pkg-3", name: "Ultra 40 Mbps", price: 1000 },
  { id: "pkg-4", name: "Extreme 80 Mbps", price: 1500 },
];

export default function BillingModal({ isOpen, onClose }: BillingModalProps) {
  const [clientId, setClientId] = useState("");
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES_DATA[1].id);
  const [selectedMethod, setSelectedMethod] = useState(METHODS_DATA[0].id);
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId.trim()) {
      alert("Please enter a valid Client ID.");
      return;
    }
    
    // Simulate payment processing flow
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2500);
  };

  const resetState = () => {
    setClientId("");
    setSelectedPkg(PACKAGES_DATA[1].id);
    setSelectedMethod(METHODS_DATA[0].id);
    setPaymentStep("form");
    onClose();
  };

  if (!isOpen) return null;

  const activePkgObj = PACKAGES_DATA.find((p) => p.id === selectedPkg);
  const activeMethodObj = METHODS_DATA.find((m) => m.id === selectedMethod);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetState}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-lg bg-[#0e111a] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-white overflow-hidden"
        >
          {/* Background glow lights */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px]" />

          {/* Header (Hide only on success screen) */}
          {paymentStep !== "success" && (
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-['Google_Sans',sans-serif] tracking-tight">
                    বিল পেমেন্ট
                  </h2>
                  <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase mt-0.5">
                    Online Bill Payment Gateway
                  </p>
                </div>
              </div>
              <button
                onClick={resetState}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 1: Form Fill */}
          {paymentStep === "form" && (
            <form onSubmit={handlePay} className="space-y-6 relative z-10">
              {/* Client ID input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 font-mono uppercase tracking-wider">
                  Client ID (গ্রাহক আইডি)*
                </label>
                <input
                  type="text"
                  placeholder="e.g. MW-10492"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#2563eb] transition-all"
                />
              </div>

              {/* Package Tier Dropdown/Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 font-mono uppercase tracking-wider block">
                  Select Package (প্যাকেজ নির্বাচন)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PACKAGES_DATA.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkg(pkg.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        selectedPkg === pkg.id
                          ? "bg-blue-600/10 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/15"
                      }`}
                    >
                      <span className="text-xs font-bold font-sans">{pkg.name}</span>
                      <span className="text-sm font-black font-mono text-white mt-1">
                        {pkg.price} TK
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 font-mono uppercase tracking-wider block">
                  Payment Method (পেমেন্ট পদ্ধতি)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {METHODS_DATA.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 font-bold ${
                        selectedMethod === method.id
                          ? "bg-white/15 border-white/30 text-white shadow-md"
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      <Wallet className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-semibold">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Button */}
              <button
                type="submit"
                className="w-full bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>Proceed to Pay {activePkgObj?.price} TK</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SSL Secured & Encrypted Transaction</span>
              </div>
            </form>
          )}

          {/* Step 2: Processing state */}
          {paymentStep === "processing" && (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-6 relative z-10">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              <div>
                <h3 className="text-lg font-bold">Processing Payment</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Connecting to {activeMethodObj?.name} checkout gateway. Please do not close or reload the page.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Success state */}
          {paymentStep === "success" && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-6 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              </motion.div>

              <div>
                <h3 className="text-2xl font-black text-emerald-400 font-sans">Payment Successful!</h3>
                <p className="text-xs text-gray-400 mt-1.5">
                  Thank you! Your internet connection bill has been updated.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-left space-y-3 font-mono text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Client ID:</span>
                  <span className="font-bold text-white uppercase">{clientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Package:</span>
                  <span className="text-white">{activePkgObj?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paid Via:</span>
                  <span className="text-white capitalize">{activeMethodObj?.name}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2.5 mt-2">
                  <span className="text-gray-400 font-bold">Amount Paid:</span>
                  <span className="font-black text-emerald-400">{activePkgObj?.price} TK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TxID:</span>
                  <span className="text-white font-sans text-[10px]">
                    TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={resetState}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
