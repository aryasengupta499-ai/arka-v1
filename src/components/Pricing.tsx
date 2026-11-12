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
    <section id="pricing" className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Pricing built for scale.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Start optimizing for free. Upgrade when your AI traffic demands enterprise guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-3xl p-8 border transition-all ${
                tier.popular
                  ? "bg-indigo-500/10 border-indigo-500/30 shadow-2xl shadow-indigo-500/10 transform md:-translate-y-4"
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{tier.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="flex-1 space-y-4 mb-8 text-sm text-slate-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="text-emerald-400">�</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  tier.ctaVariant === "primary"
                    ? "bg-brand-blue text-white hover:bg-blue-600"
                    : "border border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}