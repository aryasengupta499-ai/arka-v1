"use client";

import { useState } from "react";
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

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    const mockResponses: Record<string, string> = {
      "gpt-4o": `Based on your request "${input}", here's the optimized response using GPT-4o routing.`,
      "llama-3.1-8b": `Fast path: "${input}" processed via Llama-3.1-8b on Groq. Cost: $0.0002`,
      "claude-3-sonnet": `Reasoning path: "${input}" analyzed by Claude-3-Sonnet. Cost: $0.0015`,
    };

    setResponse(mockResponses[model] || mockResponses["gpt-4o"]);
    setIsLoading(false);
  };

  return (
    <section id="playground" className="relative z-10 py-24 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-brand-blue/5 blur-[160px] animate-[ambient-pulse_10s_ease-in-out_infinite]" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[40%] rounded-full bg-brand-purple/5 blur-[180px] animate-[ambient-drift_12s_ease-in-out_infinite] delay-[2s]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-600/5 blur-[140px] animate-[ambient-pulse_8s_ease-in-out_infinite] delay-[4s]" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            API Playground
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Test ARKA's intelligent routing with your own prompts. See which model gets selected and the cost in real-time.
          </p>
        </div>

        {/* MacOS-Style Glass Window */}
        <div className="relative rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02] backdrop-blur-xl glass-panel-hover group">
          
          {/* Window Header */}
          <div className="flex items-center px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            </div>
            <div className="ml-5 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-xs font-mono text-slate-400">arkaplayground.arctic.route</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Input Panel */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Model Selection</label>
                  <Terminal className="w-3 h-3 text-brand-blue/50" />
                </div>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 transition-all backdrop-blur-sm"
                >
                  <option value="gpt-4o">GPT-4o (Premium)</option>
                  <option value="llama-3.1-8b">Llama-3.1-8b (Fast)</option>
                  <option value="claude-3-sonnet">Claude-3-Sonnet (Reasoning)</option>
                </select>

                <div className="mt-4">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Your Prompt</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask ARKA anything..."
                    rows={6}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 transition-all backdrop-blur-sm resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleExecute}
                  disabled={isLoading || !input.trim()}
                  className={`w-full mt-3 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    isLoading || !input.trim()
                      ? "bg-white/5 border border-white/10 text-slate-500 disabled:cursor-not-allowed"
                      : "bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Intercepting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Execute Request
                    </>
                  )}
                </button>
              </div>

              {/* Output Panel */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Model Response</label>
                  {response && (
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Routed: {model}</span>
                  )}
                </div>
                <div className="relative group">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 min-h-[300px] font-mono text-sm">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
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
                    <div className="absolute inset-0 rounded-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] pointer-events-none" />
                  )}
                </div>
                {response && (
                  <div className="flex items-center gap-2 pt-3 mt-1 border-t border-white/10 text-xs font-mono text-slate-500">
                    <span>{model}</span>
                    <span className="w-px h-3 bg-white/10"></span>
                    <span>Tokens: 42</span>
                    <span className="w-px h-3 bg-white/10"></span>
                    <span className="text-emerald-400">Cost: $0.0012</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}