"use client";

import { motion } from "framer-motion";

export default function Features() {
  const scrollVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollTransition = {
    duration: 0.7,
    ease: "easeOut" as const,
  };

  return (
    <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-blue-600/5 blur-[160px] animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[40%] rounded-full bg-purple-600/5 blur-[180px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-600/5 blur-[140px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Everything you need to scale AI.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stop overpaying for compute. ARKA handles the heavy lifting.
          </p>
        </motion.div>

        {/* Glassmorphic Bento Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Feature 1: Wide Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="md:col-span-2 glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
          >
            {/* Ambient glow behind icon */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-[60px] rounded-full group-hover:bg-brand-blue/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center mb-6 border border-brand-blue/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors duration-300">
                Smart Model Routing
              </h3>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Dynamically route requests to the most cost-effective model based on the complexity of the prompt. Automatically swap expensive models for faster alternatives when appropriate.
              </p>
            </div>
          </motion.div>

          {/* Feature 2: Standard Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="col-span-1 glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 border border-indigo-600/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                Budget Guardrails
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Set hard limits on API spending per user or project to intercept requests and prevent billing surprises.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Standard Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="col-span-1 glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 blur-[60px] rounded-full group-hover:bg-emerald-600/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-600/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">🔌</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                Drop-in Proxy
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Change one line of code in your existing app to point to your new ARKA control plane. No heavy SDKs required.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Wide Card */}
          <motion.div
            variants={scrollVariants}
            transition={scrollTransition}
            className="md:col-span-2 glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 blur-[60px] rounded-full group-hover:bg-pink-600/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 border border-pink-600/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
                Granular Analytics
              </h3>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Monitor your infrastructure with real-time logs. Track latency, token usage, and API costs down to the millisecond.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}