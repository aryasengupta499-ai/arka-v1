"use client";

import { motion } from "framer-motion";

export default function Integration() {
  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollTransition = {
    duration: 0.8,
    ease: "easeOut" as const,
  };

  return (
    <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-10%] left=[-10%] w=[60%] h=[40%] rounded-full bg-cobalt/20 blur-[160px] animate-pulse-slow" />
      <div className="absolute top=[40%] right=[-10%] w=[50%] h=[40%] rounded-full bg-acid/10 blur-[180px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom=[-10%] left=[20%] w=[40%] h=[40%] rounded-full bg-cobalt/10 blur-[140px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-[56px] md:text-[72px] font-black tracking-tight mb-6 text-transparent animate-gradient-text">
            Change <span className="text-acid">one line</span> of code.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            No heavy SDKs. Just point your existing OpenAI client to the ARKA proxy.
          </p>
        </motion.div>

        {/* ── MacOS-Style Code Window ── */}
        <motion.div
          variants={scrollVariants}
          transition={scrollTransition}
          className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02] backdrop-blur-xl glass-panel-hover group"
        >
          
          {/* Window Header */}
          <div className="flex items-center px-8 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="ml-6 flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">app/api/chat/route.ts</span>
            </div>
          </div>

          {/* Code Content */}
          <div className="p-8 overflow-x-auto">
            <pre className="text-sm md:text-base font-mono leading-relaxed text-slate-300">
              <code>
                <span className="text-cobalt">import</span> <span className="text-cobalt">OpenAI</span> <span className="text-cobalt">from</span> <span className="text-acid">'openai'</span>;<br /><br />
                <span className="text-zinc-500">{`// 1. Initialize the client`}</span><br />
                <span className="text-cobalt">const</span> <span className="text-cobalt">openai</span> <span className="text-white">=</span> <span className="text-cobalt">new</span> <span className="text-acid">OpenAI</span>({`{`}<br />
                {`  `}apiKey: process.env.<span className="text-cobalt">OPENAI_API_KEY</span>,<br />
                <span className="text-zinc-500 bg-red-500/10 block px-2 -mx-2">{`  // baseURL: 'https://api.openai.com/v1',  <-- Remove this`}</span>
                <span className="text-acid bg-acid/10 block px-2 -mx-2">{`  baseURL: 'https://proxy.arka.com/v1',      <-- Add ARKA`}</span>
                {`}`});<br /><br />
                <span className="text-zinc-500">{`// 2. ARKA automatically intercepts and routes!`}</span><br />
                <span className="text-cobalt">const</span> <span className="text-cobalt">response</span> <span className="text-white">=</span> <span className="text-cobalt">await</span> openai.chat.completions.<span className="text-acid">create</span>({`{`}<br />
                {`  `}model: <span className="text-cobalt">'gpt-4'</span>, <span className="text-zinc-500">{`// ARKA will swap to 3.5 if simple enough`}</span><br />
                {`  `}messages: [{`{`} role: <span className="text-cobalt">'user'</span>, content: <span className="text-cobalt">'Hello!'</span> {`}`}],<br />
                {`}`});
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}