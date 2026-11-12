import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Playground from "@/components/Playground";
import Integration from "@/components/Integration";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-brand-black pt-16">
      <Hero />
      {/* THE NEW BENTO GRID */}
      <Features />
      {/* PRICING */}
      <Pricing />
      {/* API PLAYGROUND */}
      <Playground />
      {/* THE CODE DEMO */}
      <Integration />
    </main>
  );
}