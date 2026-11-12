"use client";

import Link from "next/link";
import { useModal } from "@/lib/modal-context";

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-midnight/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-black text-xl tracking-tight text-white">
          ARKA <span className="text-acid text-lg">.</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-10 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#proxy" className="hover:text-white transition-colors">Smart Proxy</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Control Center</Link>
          <Link href="#docs" className="hover:text-white transition-colors">Docs</Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-white/[0.03] hover:bg-white/[0.08] text-white px-6 py-3 rounded-[1rem] text-sm font-bold transition-all border border-white/10 hover:border-cobalt/50">
            Sign In
          </button>
          <button
            onClick={openModal}
            className="bg-acid text-midnight font-black px-6 py-3 rounded-[1rem] text-sm transition-all shadow-[0_0_25px_rgba(212,255,36,0.5)] hover:shadow-[0_0_40px_rgba(212,255,36,0.7)] hover:scale-105"
          >
            Get Beta Access
          </button>
        </div>

      </div>
    </nav>
  );
}