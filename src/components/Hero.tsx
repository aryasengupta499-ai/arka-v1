"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Mail, User, Building2, Briefcase, DollarSign, Zap, Layers, ArrowRight } from "lucide-react";
import { useModal } from "@/lib/modal-context";

interface FormData {
  email: string;
  name: string;
  company: string;
  role: string;
  useCase: string;
  tier: string;
}

interface FormErrors {
  email?: string;
  name?: string;
}

const TIERS = [
  { id: "hobby", name: "Hobby", price: "$0", description: "For solo devs and side projects", features: ["10,000 requests/mo", "Live Cost Telemetry", "24-hour log retention"] },
  { id: "pro", name: "Pro", price: "$49", description: "For growing AI startups", features: ["1,000,000 requests/mo", "Budget Guardrails", "30-day log retention"], popular: true },
  { id: "scale", name: "Scale", price: "$199", description: "For production workloads", features: ["5,000,000 requests/mo", "API Key Management", "Unlimited retention"] },
];

export default function Hero() {
  const { isOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState<"form" | "success" | "error">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    company: "",
    role: "",
    useCase: "",
    tier: "hobby",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedTier, setSelectedTier] = useState("hobby");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Valid email required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
          source: "hero_cta",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("success");
      } else if (res.status === 409) {
        setErrors({ email: "This email is already registered" });
        setStep("form");
      } else {
        setStep("error");
      }
    } catch {
      setStep("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setStep("form");
    setFormData({ email: "", name: "", company: "", role: "", useCase: "", tier: "hobby" });
    setSelectedTier("hobby");
    setErrors({});
  };

  const selectTier = (tierId: string) => {
    setSelectedTier(tierId);
    setFormData((prev) => ({ ...prev, tier: tierId }));
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-[100vh] px-6 scanlines">
        
        {/* ── Ambient Background Glows — Cyberpunk ── */}
        <div className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] rounded-full bg-cobalt/25 blur-[140px] animate-[ambient-pulse_12s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] right-[-15%] w-[60%] h-[60%] rounded-full bg-acid/15 blur-[160px] animate-[ambient-drift_15s_ease-in-out_infinite] delay-[3s]" />
        <div className="absolute bottom-[-20%] left-[15%] w-[50%] h-[50%] rounded-full bg-cobalt/15 blur-[120px] animate-[ambient-pulse_10s_ease-in-out_infinite] delay-[6s]" />
        <div className="absolute top-[15%] left-[50%] -translate-x-50% w-[40%] h-[40%] rounded-full bg-acid/20 blur-[100px] animate-[ambient-drift_14s_ease-in-out_infinite] delay-[9s]" />
        <div className="absolute bottom-[10%] right-[20%] w-[35%] h-[35%] rounded-full bg-cobalt/10 blur-[90px] animate-[pulse-slow_9s_ease-in-out_infinite]" />

        {/* ── Central Hero Orb — Pulsing Energy Core ── */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0.3 }}
          animate={{
            scale: [0.7, 1.05, 0.7],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-cobalt/35 via-acid/20 to-transparent blur-[140px] pointer-events-none z-0"
        />

        <div className="relative z-10 text-center px-6 max-w-6xl">
          
          {/* ── Badge ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-midnight/80 border border-cobalt/30 backdrop-blur-md mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt/60 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cobalt"></span>
            </span>
            <span className="text-[10px] font-bold text-cobalt uppercase tracking-[0.2em]">
              Private Beta — Limited Access
            </span>
          </motion.div>

          {/* ── Main Headline ── */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[90px] md:text-[130px] font-black tracking-tighter mb-8 text-transparent animate-gradient-text"
          >
            ARKA <span className="text-acid">CONTROL</span>
          </motion.h1>

          {/* ── Subheadline ── */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            The financial infrastructure for Generative AI. Intercept, route, and optimize your infrastructure costs in real-time.
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={openModal}
              className="group relative px-14 py-5 bg-acid text-midnight font-black rounded-full transition-all overflow-hidden hover:scale-105 hover:shadow-[0_0_60px_rgba(212,255,36,0.7)] active:scale-95"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-3">
                Enter Control Center
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>

            <a
              href="https://github.com/arya-ai/arka-v1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-14 py-5 rounded-full font-bold transition-all border border-cobalt/40 bg-white/5 text-white hover:bg-white/10 hover:border-cobalt/60 hover:text-acid hover:shadow-[0_0_30px_rgba(21,10,198,0.4)] backdrop-blur-md"
            >
              <span className="relative z-10 flex items-center gap-3">
                View GitHub
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* WAITLIST MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-midnight/90 backdrop-blur-2xl"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="w-full max-w-lg bg-white/[0.04] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/10 bg-white/[0.02]">
                <h2 id="modal-title" className="text-3xl font-black text-white tracking-tight">
                  Secure your spot.
                </h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {/* TIER SELECTION STEP */}
                {step === "form" && (
                  <motion.div
                    key="tier"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 space-y-8"
                  >
                    <p className="text-slate-400 text-sm text-center font-light">
                      ARKA {TIERS.find(t => t.id === selectedTier)?.name} is currently in private beta. Enter your email to lock in early-bird pricing.
                    </p>

                    {/* Tier Cards */}
                    <div className="space-y-4">
                      {TIERS.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => selectTier(tier.id)}
                          className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] border transition-all duration-300 ${
                            selectedTier === tier.id
                              ? "bg-cobalt/15 border-cobalt/50 text-white shadow-[0_0_30px_rgba(21,10,198,0.2)]"
                              : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05] hover:border-cobalt/40"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center ${selectedTier === tier.id ? "bg-cobalt text-white" : "bg-white/10 text-slate-500"}`}>
                              {tier.popular ? <Layers className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-white">{tier.name}</span>
                                {tier.popular && <span className="text-xs bg-acid/20 text-acid px-2 py-0.5 rounded font-bold">Most Popular</span>}
                              </div>
                              <span className="text-xs text-slate-500 uppercase tracking-wider">{tier.description}</span>
                            </div>
                            <span className="text-3xl font-black text-white">{tier.price}</span>
                            <span className="text-xs text-slate-600 uppercase tracking-wider">/mo</span>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">Select</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-4">
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <p className="text-slate-400 text-sm text-center font-light">
                          Tell us about yourself.
                        </p>

                        <div className="space-y-5">
                          {/* Email */}
                          <div>
                            <label htmlFor="email" className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                              Work Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="founder@startup.com"
                                className={`w-full pl-12 pr-4 py-4 rounded-[1rem] bg-white/[0.03] border ${
                                  errors.email ? "border-red-500/50" : "border-white/10"
                                } text-white placeholder-slate-600 focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt/50 transition-all`}
                                disabled={isSubmitting}
                                autoComplete="email"
                                required
                              />
                            </div>
                            {errors.email && (
                              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                            )}
                          </div>

                          {/* Name */}
                          <div>
                            <label htmlFor="name" className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                              Full Name *
                            </label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Jane Doe"
                                className={`w-full pl-12 pr-4 py-4 rounded-[1rem] bg-white/[0.03] border ${
                                  errors.name ? "border-red-500/50" : "border-white/10"
                                } text-white placeholder-slate-600 focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt/50 transition-all`}
                                disabled={isSubmitting}
                                autoComplete="name"
                                required
                              />
                            </div>
                            {errors.name && (
                              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                            )}
                          </div>

                          {/* Company */}
                          <div>
                            <label htmlFor="company" className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                              Company
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                id="company"
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                placeholder="Acme Corp"
                                className="w-full pl-12 pr-4 py-4 rounded-[1rem] bg-white/[0.03] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt/50 transition-all"
                                disabled={isSubmitting}
                                autoComplete="organization"
                              />
                            </div>
                          </div>

                          {/* Role */}
                          <div>
                            <label htmlFor="role" className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                              Role
                            </label>
                            <div className="relative">
                              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <select
                                id="role"
                                value={formData.role}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-[1rem] bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt/50 transition-all appearance-none cursor-pointer"
                                disabled={isSubmitting}
                              >
                                <option value="">Select your role</option>
                                <option value="engineer">Software Engineer</option>
                                <option value="lead">Tech Lead / Engineering Manager</option>
                                <option value="cto">CTO / VP Engineering</option>
                                <option value="founder">Founder</option>
                                <option value="finops">FinOps / Platform Engineer</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 py-5 rounded-[1rem] bg-acid text-midnight font-black transition-all hover:shadow-[0_0_50px_rgba(212,255,36,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Securing...
                              </>
                            ) : (
                              "Join the Waitlist"
                            )}
                          </button>

                          <p className="text-center text-[10px] text-slate-600 mt-6 font-light">
                            No credit card required.
                          </p>
                        </div>
                      </motion.form>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS STEP */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-acid/20 border border-acid/30 flex items-center justify-center shadow-[0_0_40px_rgba(212,255,36,0.3)]">
                      <Check className="w-10 h-10 text-acid" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">You're on the list!</h3>
                    <p className="text-slate-400 mb-8">
                      We'll email you the moment your{" "}
                      <span className="text-acid font-black">{TIERS.find(t => t.id === selectedTier)?.name}</span>{" "}
                      tier access is ready.
                    </p>
                    <button
                      onClick={() => { closeModal(); resetForm(); }}
                      className="w-full py-5 rounded-[1rem] border border-cobalt/30 bg-white/[0.03] text-white font-bold transition-all hover:border-cobalt/50 hover:text-acid hover:bg-white/[0.05]"
                    >
                      Close
                    </button>
                  </motion.div>
                )}

                {/* ERROR STEP */}
                {step === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                      <X className="w-10 h-10 text-red-400" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">Something went wrong</h3>
                    <p className="text-slate-400 mb-8">
                      Please try again or email us directly at <a href="mailto:beta@arka.com" className="text-cobalt underline hover:text-acid">beta@arka.com</a>
                    </p>
                    <button
                      onClick={() => { setStep("form"); resetForm(); }}
                      className="w-full py-5 rounded-[1rem] bg-acid text-midnight font-black transition-all hover:shadow-[0_0_40px_rgba(212,255,36,0.5)]"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}