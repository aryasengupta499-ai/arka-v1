"use client";

import { motion } from "framer-motion";

export default function Pricing() {
  const TIERS = [
    {
      id: "hobby",
      name: "Hobby",
      price: "$0",
      description: "For solo devs and side projects.",
      popular: false,
      features: ["10,000 requests/mo", "Live Cost Telemetry", "24-hour log retention"],
      cta: "Start Building Free",
      ctaVariant: "outline",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$49",
      description: "For growing AI startups.",
      popular: true,
      features: ["1,000,000 requests/mo", "Budget Guardrails", "30-day log retention"],
      cta: "Join Private Beta",
      ctaVariant: "primary",
    },
    {
      id: "scale",
      name: "Scale",
      price: "$199",
      description: "For production workloads.",
      popular: false,
      features: ["5,000,000 requests/mo", "API Key Management", "Unlimited retention"],
      cta: "Join Private Beta",
      ctaVariant: "outline",
    },
  ];

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollTransition = {
    duration: 0.8,
    ease: "easeOut" as const,
  };

  return (
    <section id="pricing" className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-10%] left=[-10%] w-[60%] h-[40%] rounded-full bg-cobalt/20 blur-[160px] animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[40%] rounded-full bg-acid/10 blur-[180px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[-10%] left=[20%] w-[40%] h-[40%] rounded-full bg-cobalt/10 blur-[140px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-[56px] md:text-[72px] font-black tracking-tight mb-6 text-transparent animate-gradient-text">
            Pricing built for <span className="text-acid">scale</span>.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Start optimizing for free. Upgrade when your AI traffic demands enterprise guardrails.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={scrollVariants}
              transition={scrollTransition}
              className={`flex flex-col rounded-[2rem] p-10 relative overflow-hidden transition-all duration-500 ease-in-out hover:-translate-y-8 ring-1 ring-white/10 hover:ring-cobalt/50 bg-gradient-to-br from-white/[0.02] to-transparent ${
                tier.popular
                  ? "border-cobalt/40 shadow-2xl shadow-cobalt/25 transform md:-translate-y-8 bg-white/[0.04]"
                  : "border-white/10 hover:border-cobalt/40 hover:shadow-[0_0_40px_rgba(21,10,198,0.2)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-cobalt via-acid to-cobalt text-midnight text-[10px] font-black px-4 py-1.5 rounded-bl-[2rem] tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold mb-4 ${tier.popular ? "text-acid" : "text-white"}`}>
                  {tier.name}
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">{tier.description}</p>
                <div className="mb-10">
                  <span className={`text-[64px] font-black ${tier.popular ? "text-acid" : "text-white"}`}>
                    {tier.price}
                  </span>
                  <span className="text-slate-500 ml-2 text-sm">/mo</span>
                </div>
                <ul className="flex-1 space-y-5 mb-10 text-sm text-slate-400 font-light">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-4">
                      <span className={`text-xs ${tier.popular ? "text-acid" : "text-slate-600"}`}>�</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-5 rounded-[1.5rem] font-black transition-all duration-300 ${
                    tier.popular
                      ? "bg-acid text-midnight shadow-[0_0_40px_rgba(212,255,36,0.5)] hover:shadow-[0_0_60px_rgba(212,255,36,0.8)] hover:scale-[1.02] active:scale-95"
                      : "bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.08] hover:border-cobalt/50 hover:text-acid backdrop-blur-md"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}