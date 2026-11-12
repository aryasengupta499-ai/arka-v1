"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Loader2, Code2, Terminal } from "lucide-react";

export default function Playground() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [model, setModel] = useState("gpt-4o");

  const handleExecute = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setResponse(null);

    await new Promise((r) => setTimeout(r, 1500));

    const mockResponses: Record<string, string> = {
      "gpt-4o": `Based on your request "${input}", here's the optimized response using GPT-4o routing.`,
      "llama-3.1-8b": `Fast path: "${input}" processed via Llama-3.1-8b on Groq. Cost: $0.0002`,
      "claude-3-sonnet": `Reasoning path: "${input}" analyzed by Claude-3-Sonnet. Cost: $0.0015`,
    };

    setResponse(mockResponses[model] || mockResponses["gpt-4o"]);
    setIsLoading(false);
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollTransition = {
    duration: 0.8,
    ease: "easeOut" as const,
  };

  return (
    <section id="playground" className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-10%] left=[-10%] w-[60%] h-[40%] rounded-full bg-cobalt/20 blur-[160px] animate-pulse-slow" />
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
            API <span className="text-acid">Playground</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Test ARKA's intelligent routing with your own prompts. See which model gets selected and the cost in real-time.
          </p>
        </motion.div>

        {/* ── MacOS-Style Glass Window ── */}
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
              <Code2 className="w-4 h-4 text-slate-400" />
              <p className="text-xs font-mono text-slate-400">arkaplayground.arctic.route</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Input Panel */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Model Selection</label>
                  <Terminal className="w-4 h-4 text-cobalt/60" />
                </div>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1rem] px-5 py-4 text-slate-300 focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt/20 transition-all backdrop-blur-sm cursor-pointer"
                >
                  <option value="gpt-4o">GPT-4o (Premium)</option>
                  <option value="llama-3.1-8b">Llama-3.1-8b (Fast)</option>
                  <option value="claude-3-sonnet">Claude-3-Sonnet (Reasoning)</option>
                </select>

                <div className="mt-5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Your Prompt</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask ARKA anything..."
                    rows={6}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[1rem] px-5 py-4 text-white focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt/20 transition-all backdrop-blur-sm resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleExecute}
                  disabled={isLoading || !input.trim()}
                  className={`w-full mt-2 py-5 rounded-[1.5rem] font-black transition-all duration-300 ${
                    isLoading || !input.trim()
                      ? "bg-white/[0.03] border border-white/10 text-slate-500 disabled:cursor-not-allowed"
                      : "bg-acid text-midnight shadow-[0_0_40px_rgba(212,255,36,0.5)] hover:shadow-[0_0_60px_rgba(212,255,36,0.8)] hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-3" />
                      Intercepting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-3" />
                      Execute Request
                    </>
                  )}
                </button>
              </div>

              {/* Output Panel */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Model Response</label>
                  {response && (
                    <span className="text-[10px] text-acid bg-acid/10 px-3 py-1 rounded border border-acid/20">Routed: {model}</span>
                  )}
                </div>
                <div className="relative group">
                  <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 min-h-[320px] font-mono text-sm">
                    {isLoading ? (
                      <div className="flex items-center gap-3 text-slate-500 animate-pulse">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing request...
                      </div>
                    ) : response ? (
                      <div className="text-slate-300 whitespace-pre-wrap">{response}</div>
                    ) : (
                      <p className="text-slate-600 text-sm">Execute a request to see the response here.</p>
                    )}
                  </div>
                  {/* Glowing border effect on output when active */}
                  {response && (
                    <div className="absolute inset-0 rounded-[1.5rem] border border-acid/30 shadow-[0_0_30px_rgba(212,255,36,0.25)] pointer-events-none" />
                  )}
                </div>
                {response && (
                  <div className="flex items-center gap-4 pt-5 mt-1 border-t border-white/10 text-[10px] font-mono text-slate-500">
                    <span>{model}</span>
                    <span className="w-px h-3 bg-white/10"></span>
                    <span>Tokens: 42</span>
                    <span className="w-px h-3 bg-white/10"></span>
                    <span className="text-acid">Cost: $0.0012</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}