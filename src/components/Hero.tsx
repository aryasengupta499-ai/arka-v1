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
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-[90vh] px-6">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] animate-[ambient-pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[140px] animate-[ambient-drift_10s_ease-in-out_infinite] delay-[2s]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-600/5 blur-[100px] animate-[ambient-pulse_12s_ease-in-out_infinite] delay-[4s]" />
        <div className="absolute top-[10%] left-[50%] -translate-x-50% w-[30%] h-[30%] rounded-full bg-pink-600/5 blur-[80px] animate-[ambient-drift_8s_ease-in-out_infinite] delay-[1s]" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue/50 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-widest">
              Private Beta — Limited Spots
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-slate-300 text-neon-glow"
          >
            ARKA <span className="text-brand-blue">CONTROL</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            The financial infrastructure for Generative AI. Intercept, route, and optimize your infrastructure costs in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={openModal}
              className="group relative px-10 py-4 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue text-white font-bold rounded-full transition-all overflow-hidden hover:scale-105 hover:shadow-[0_0_30px_rgba(0,112,243,0.4)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                Enter Control Center
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <a
              href="https://github.com/arya-ai/arka-v1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full font-bold transition-all border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white/[0.05] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h2 id="modal-title" className="text-2xl font-bold text-white">
                  Secure your spot.
                </h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 space-y-6"
                  >
                    <p className="text-slate-400 text-sm text-center">
                      ARKA {TIERS.find(t => t.id === selectedTier)?.name} is currently in private beta. Enter your email to lock in early-bird pricing.
                    </p>

                    {/* Tier Cards */}
                    <div className="space-y-3">
                      {TIERS.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => selectTier(tier.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${
                            selectedTier === tier.id
                              ? "bg-brand-blue/10 border-brand-blue/50 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedTier === tier.id ? "bg-brand-blue text-white" : "bg-white/10 text-slate-500"}`}>
                              {tier.popular ? <Layers className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-white">{tier.name}</span>
                                {tier.popular && <span className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded">Popular</span>}
                              </div>
                              <span className="text-slate-500 text-xs">{tier.description}</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{tier.price}</span>
                            <span className="text-slate-600 text-xs">/mo</span>
                          </div>
                          <span className="text-xs text-slate-500">Select</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-4">
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <p className="text-slate-400 text-sm text-center">
                          Tell us about yourself.
                        </p>

                        <div className="space-y-4">
                          {/* Email */}
                          <div>
                            <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1">
                              Work Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="founder@startup.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border ${
                                  errors.email ? "border-red-500/50" : "border-white/10"
                                } text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-all`}
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
                            <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1">
                              Full Name *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Jane Doe"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border ${
                                  errors.name ? "border-red-500/50" : "border-white/10"
                                } text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-all`}
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
                            <label htmlFor="company" className="block text-xs font-medium text-slate-300 mb-1">
                              Company
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                id="company"
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                placeholder="Acme Corp"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-all"
                                disabled={isSubmitting}
                                autoComplete="organization"
                              />
                            </div>
                          </div>

                          {/* Role */}
                          <div>
                            <label htmlFor="role" className="block text-xs font-medium text-slate-300 mb-1">
                              Role
                            </label>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <select
                                id="role"
                                value={formData.role}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-all appearance-none"
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
                            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(0,112,243,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
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

                          <p className="text-center text-xs text-slate-600 mt-6">
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
                    className="p-6 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-slate-400 mb-6">
                      We'll email you the moment your{" "}
                      <span className="text-brand-blue font-bold">{TIERS.find(t => t.id === selectedTier)?.name}</span>{" "}
                      tier access is ready.
                    </p>
                    <button
                      onClick={() => { closeModal(); resetForm(); }}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
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
                    className="p-6 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <X className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Something went wrong</h3>
                    <p className="text-slate-400 mb-6">
                      Please try again or email us directly at <a href="mailto:beta@arka.com" className="text-brand-blue underline">beta@arka.com</a>
                    </p>
                    <button
                      onClick={() => { setStep("form"); resetForm(); }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue text-white font-medium transition-colors"
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