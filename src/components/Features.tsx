"use client";

import { motion } from "framer-motion";

export default function Features() {
  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollTransition = {
    duration: 0.8,
    ease: "easeOut" as const,
  };

  return (
    <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[50%] rounded-full bg-cobalt/15 blur-[180px] animate-[ambient-pulse_14s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] right-[-20%] w-[60%] h-[50%] rounded-full bg-acid/10 blur-[200px] animate-[ambient-drift_16s_ease-in-out_infinite] delay-[4s]" />
      <div className="absolute bottom-[-15%] left-[10%] w-[55%] h-[45%] rounded-full bg-cobalt/12 blur-[160px] animate-[ambient-pulse_12s_ease-in-out_infinite] delay-[8s]" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-[56px] md:text-[72px] font-black tracking-tight mb-6 text-transparent animate-gradient-text">
            Everything you need to scale <span className="text-acid">AI</span>.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Stop overpaying for compute. ARKA handles the heavy lifting.
          </p>
        </motion.div>

        {/* ── Glassmorphic Bento Grid with Gradient Borders ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature 1: Wide Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="md:col-span-2 glass-panel glass-panel-hover rounded-[2rem] p-10 relative overflow-hidden group transition-all duration-500 ease-in-out hover:-translate-y-4 hover:shadow-[0_0_50px_rgba(21,10,198,0.25)]"
          >
            {/* Icon Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt/20 blur-[80px] rounded-full group-hover:bg-cobalt/30 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-cobalt/15 rounded-[2rem] flex items-center justify-center mb-8 border border-cobalt/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cobalt transition-colors duration-300">
                Smart Model Routing
              </h3>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed font-light">
                Dynamically route requests to the most cost-effective model based on prompt complexity. Automatically swap expensive models for faster alternatives.
              </p>
            </div>
          </motion.div>

          {/* Feature 2: Standard Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="col-span-1 glass-panel glass-panel-hover rounded-[2rem] p-8 relative overflow-hidden group transition-all duration-500 ease-in-out hover:-translate-y-4 hover:shadow-[0_0_50px_rgba(21,10,198,0.25)]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt/20 blur-[80px] rounded-full group-hover:bg-cobalt/30 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-cobalt/15 rounded-[2rem] flex items-center justify-center mb-8 border border-cobalt/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cobalt transition-colors duration-300">
                Budget Guardrails
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                Set hard limits on API spending per user or project to intercept requests before they breach budget.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Standard Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="col-span-1 glass-panel glass-panel-hover rounded-[2rem] p-8 relative overflow-hidden group transition-all duration-500 ease-in-out hover:-translate-y-4 hover:shadow-[0_0_50px_rgba(21,10,198,0.25)]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt/20 blur-[80px] rounded-full group-hover:bg-cobalt/30 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-cobalt/15 rounded-[2rem] flex items-center justify-center mb-8 border border-cobalt/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                <span className="text-2xl">🔌</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cobalt transition-colors duration-300">
                Drop-in Proxy
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                Change one line of code in your existing app to point to your new ARKA control plane. No heavy SDKs required.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Wide Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="md:col-span-2 glass-panel glass-panel-hover rounded-[2rem] p-10 relative overflow-hidden group transition-all duration-500 ease-in-out hover:-translate-y-4 hover:shadow-[0_0_50px_rgba(21,10,198,0.25)]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-acid/20 blur-[80px] rounded-full group-hover:bg-acid/30 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-acid/15 rounded-[2rem] flex items-center justify-center mb-8 border border-acid/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-acid transition-colors duration-300">
                Granular Analytics
              </h3>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed font-light">
                Monitor your infrastructure with real-time logs. Track latency, token usage, and API costs down to the millisecond.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}