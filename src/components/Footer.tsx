import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-midnight pt-24 pb-8 relative z-10 scanlines">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-black text-3xl tracking-tight text-white">
              ARKA <span className="text-acid">.</span>
            </Link>
            <p className="mt-6 text-slate-400 max-w-sm font-light leading-relaxed">
              The intelligent proxy engine for Generative AI. Control costs, enforce guardrails, and scale your infrastructure with confidence.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><Link href="#" className="hover:text-cobalt transition-colors">Smart Routing</Link></li>
              <li><Link href="#" className="hover:text-cobalt transition-colors">Budget Guardrails</Link></li>
              <li><Link href="#" className="hover:text-cobalt transition-colors">Analytics</Link></li>
              <li><Link href="#" className="hover:text-cobalt transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><Link href="#" className="hover:text-cobalt transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-cobalt transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-cobalt transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-cobalt transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-[10px] text-slate-600 font-light">
          <p>© {new Date().getFullYear()} ARKA Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-cobalt transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-cobalt transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-cobalt transition-colors">Twitter (X)</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}