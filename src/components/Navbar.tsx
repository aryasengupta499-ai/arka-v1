"use client";

import Link from "next/link";
import { useModal } from "@/lib/modal-context";

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-brand-black/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tighter text-white">
          ARKA <span className="text-brand-blue text-lg">.</span>
        </Link>

        {/* Center Links (Hidden on mobile for now) */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#proxy" className="hover:text-white transition-colors">Smart Proxy</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Control Center</Link>
          <Link href="#docs" className="hover:text-white transition-colors">Docs</Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all border border-white/10">
            Sign In
          </button>
          <button
            onClick={openModal}
            className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_rgba(0,112,243,0.3)]"
          >
            Get Beta Access
          </button>
        </div>

      </div>
    </nav>
  );
}