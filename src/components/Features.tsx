export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Everything you need to scale AI.
        </h2>
        <p className="text-zinc-400 text-lg">Stop overpaying for compute. ARKA handles the heavy lifting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1: Wide Card */}
        <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-8 relative overflow-hidden hover:bg-white/[0.05] transition-colors">
          <div className="w-12 h-12 bg-brand-blue/20 rounded-lg flex items-center justify-center mb-6 border border-brand-blue/30">
            <span className="text-xl">⚡</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Smart Model Routing</h3>
          <p className="text-zinc-400 max-w-md">
            Dynamically route requests to the most cost-effective model based on the complexity of the prompt. Automatically swap expensive models for faster alternatives when appropriate.
          </p>
        </div>

        {/* Feature 2: Standard Card */}
        <div className="col-span-1 bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors">
           <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 border border-white/10">
            <span className="text-xl">🛡️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Budget Guardrails</h3>
          <p className="text-zinc-400">
            Set hard limits on API spending per user or project to intercept requests and prevent billing surprises.
          </p>
        </div>

        {/* Feature 3: Standard Card */}
        <div className="col-span-1 bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors">
           <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 border border-white/10">
            <span className="text-xl">🔌</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Drop-in Proxy</h3>
          <p className="text-zinc-400">
            Change one line of code in your existing app to point to your new ARKA control plane. No heavy SDKs required.
          </p>
        </div>

        {/* Feature 4: Wide Card */}
        <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-8 relative overflow-hidden hover:bg-white/[0.05] transition-colors">
           <div className="w-12 h-12 bg-brand-blue/20 rounded-lg flex items-center justify-center mb-6 border border-brand-blue/30">
            <span className="text-xl">📊</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Granular Analytics</h3>
          <p className="text-zinc-400 max-w-md">
            Monitor your infrastructure with real-time logs. Track latency, token usage, and API costs down to the millisecond.
          </p>
        </div>
      </div>
    </section>
  );
}