import Features from "@/components/Features";
import Integration from "@/components/Integration";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-brand-black pt-16">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-[85vh]">
        <div className="absolute top-1/4 w-[600px] h-[300px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
            ARKA <span className="text-brand-blue">CONTROL</span>
          </h1>
          <p className="mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            The high-performance FinOps control plane for Generative AI. 
            Intercept, route, and optimize your infrastructure costs in real-time.
          </p>
          
          <div className="mt-10 flex gap-4 justify-center">
            <button className="bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_40px_rgba(0,112,243,0.3)]">
              Get Beta Access
            </button>
            <button className="border border-white/10 hover:bg-white/5 text-white px-10 py-4 rounded-full font-bold transition-all">
              GitHub
            </button>
          </div>
        </div>
      </section>

      {/* THE NEW BENTO GRID */}
      <Features />
      {/* THE CODE DEMO */}
      <Integration />
      
    </main>
  );
}