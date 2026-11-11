import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Integration from "@/components/Integration";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-brand-black pt-16">
      <Hero />
      {/* THE NEW BENTO GRID */}
      <Features />
      {/* THE CODE DEMO */}
      <Integration />
    </main>
  );
}