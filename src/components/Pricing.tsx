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

  return (
    <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-brand-purple/10 blur-[160px] animate-[ambient-pulse_10s_ease-in-out_infinite]" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[40%] rounded-full bg-brand-blue/10 blur-[180px] animate-[ambient-drift_12s_ease-in-out_infinite] delay-[2s]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-600/5 blur-[140px] animate-[ambient-pulse_8s_ease-in-out_infinite] delay-[4s]" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Pricing built for scale.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Start optimizing for free. Upgrade when your AI traffic demands enterprise guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-3xl p-8 relative overflow-hidden transition-all duration-500 ${
                tier.popular
                  ? "glass-panel gradient-border bg-white/[0.03] shadow-2xl shadow-indigo-500/20 transform md:-translate-y-4 border-white/10"
                  : "glass-panel glass-panel-hover bg-white/[0.02] border-white/10 hover:border-brand-blue/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-2 ${tier.popular ? "text-brand-blue" : "text-white"}`}>
                  {tier.name}
                </h3>
                <p className="text-slate-400 text-sm mb-6">{tier.description}</p>
                <div className="mb-8">
                  <span className={`text-5xl font-bold ${tier.popular ? "text-white" : "text-slate-300"}`}>
                    {tier.price}
                  </span>
                  <span className="text-slate-500 ml-2">/mo</span>
                </div>
                <ul className="flex-1 space-y-4 mb-8 text-sm text-slate-400">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className={`text-xs ${tier.popular ? "text-emerald-400" : "text-slate-500"}`}>�</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}