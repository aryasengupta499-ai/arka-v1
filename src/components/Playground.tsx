"use client";

import { useState } from "react";
import { Zap, Send, Loader2 } from "lucide-react";

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
    <section id="playground" className="relative z-10 py-24 px-6 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            API Playground
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Test ARKA's intelligent routing with your own prompts. See which model gets selected and the cost in real-time.
          </p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
          {/* Window Header */}
          <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <p className="ml-4 text-xs font-mono text-slate-500">app/api/playground/route.ts</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-4">
                <label className="text-xs font-medium text-slate-400">Model Selection</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-brand-blue transition-colors"
                >
                  <option value="gpt-4o">GPT-4o (Premium)</option>
                  <option value="llama-3.1-8b">Llama-3.1-8b (Fast)</option>
                  <option value="claude-3-sonnet">Claude-3-Sonnet (Reasoning)</option>
                </select>

                <label className="text-xs font-medium text-slate-400 mt-4">Your Prompt</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask ARKA anything..."
                  rows={6}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors resize-none"
                ></textarea>

                <button
                  onClick={handleExecute}
                  disabled={isLoading || !input.trim()}
                  className="w-full mt-2 bg-brand-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Intercepting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Execute Request
                    </>
                  )}
                </button>
              </div>

              {/* Output */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-400">Model Response</label>
                  {response && (
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Routed: {model}</span>
                  )}
                </div>
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