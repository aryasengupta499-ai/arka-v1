"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Mail, User, Building2, Briefcase } from "lucide-react";
import { useModal } from "@/lib/modal-context";

interface FormData {
  email: string;
  name: string;
  company: string;
  role: string;
  useCase: string;
}

interface FormErrors {
  email?: string;
  name?: string;
}

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
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
    setFormData({ email: "", name: "", company: "", role: "", useCase: "" });
    setErrors({});
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-[85vh]">
        <div className="absolute top-1/4 w-[600px] h-[300px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Private Beta — Limited Spots
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
          >
            ARKA <span className="text-brand-blue">CONTROL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            The high-performance FinOps control plane for Generative AI. 
            Intercept, route, and optimize your infrastructure costs in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <button
              onClick={openModal}
              className="bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_40px_rgba(0,112,243,0.3)] flex items-center gap-2"
            >
              Get Beta Access
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a
              href="https://github.com/arka-control"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 hover:bg-white/5 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* BETA ACCESS MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-brand-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 id="modal-title" className="text-xl font-bold text-white">
                  Join the Private Beta
                </h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {/* FORM STEP */}
                {step === "form" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4"
                  >
                    <p className="text-zinc-400 text-sm text-center">
                      We&apos;re onboarding select teams. Tell us about yourself.
                    </p>

                    <div className="space-y-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="you@company.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${
                              errors.email ? "border-red-500/50" : "border-white/10"
                            } text-white placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all`}
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
                        <label htmlFor="name" className="block text-xs font-medium text-zinc-300 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Jane Doe"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border ${
                              errors.name ? "border-red-500/50" : "border-white/10"
                            } text-white placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all`}
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
                        <label htmlFor="company" className="block text-xs font-medium text-zinc-300 mb-1">
                          Company
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Acme Corp"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                            disabled={isSubmitting}
                            autoComplete="organization"
                          />
                        </div>
                      </div>

                      {/* Role */}
                      <div>
                        <label htmlFor="role" className="block text-xs font-medium text-zinc-300 mb-1">
                          Role
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <select
                            id="role"
                            value={formData.role}
                            onChange={(e) => handleInputChange("role", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all appearance-none"
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

                      {/* Use Case */}
                      <div>
                        <label htmlFor="useCase" className="block text-xs font-medium text-zinc-300 mb-1">
                          Primary Use Case
                        </label>
                        <select
                          id="useCase"
                          value={formData.useCase}
                          onChange={(e) => handleInputChange("useCase", e.target.value)}
                          className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all appearance-none"
                          disabled={isSubmitting}
                        >
                          <option value="">What problem are you solving?</option>
                          <option value="cost_reduction">Reduce LLM API costs</option>
                          <option value="budget_control">Set budget limits per team/project</option>
                          <option value="model_routing">Auto-route to best model per task</option>
                          <option value="analytics">Real-time cost/usage visibility</option>
                          <option value="multi_model">Use multiple providers (OpenAI, Anthropic, open-source)</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Access"
                      )}
                    </button>

                    <p className="text-center text-xs text-zinc-500">
                      By submitting, you agree to our{" "}
                      <a href="#" className="underline hover:text-zinc-300">Privacy Policy</a>
                      {" "}and consent to being contacted about ARKA Control.
                    </p>
                  </motion.form>
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
                    <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
                    <p className="text-zinc-400 mb-6">
                      We&apos;ll reach out to <strong className="text-white">{formData.email}</strong> within 24 hours with next steps.
                    </p>
                    <button
                      onClick={closeModal}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
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
                    <p className="text-zinc-400 mb-6">
                      Please try again or email us directly at <a href="mailto:beta@arka.com" className="text-brand-blue underline">beta@arka.com</a>
                    </p>
                    <button
                      onClick={() => { setStep("form"); resetForm(); }}
                      className="w-full py-3 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-medium transition-colors"
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