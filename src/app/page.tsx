import Hero from '@/components/home/Hero';
import { CategoryGrid, MegaMenu } from '@/components/shared/CategoryDisplay';
import { CurrencySwitcher } from '@/components/shared/PaymentUI';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 glass border-b border-white/5 z-[100] flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black italic text-white flex items-center gap-2">
               <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-background font-black not-italic">TS</div>
               TOP SELLER <span className="text-orange-500">STORE</span>
            </Link>
            <div className="hidden md:block">
              <MegaMenu />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <CurrencySwitcher />
            <Link href="/cart" className="text-zinc-400 hover:text-orange-400 transition-colors">
              <ShoppingCart size={22} />
            </Link>
            <Link href="/login" className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
              <User size={16} />
              Account
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Category Grid Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
           <h2 className="text-4xl md:text-5xl font-black text-white">Explore Our <span className="text-orange-500">World</span></h2>
           <p className="text-zinc-500 max-w-xl">Browse through our unlimited categories powered by dynamic attributes and high-speed delivery.</p>
        </div>
        <CategoryGrid />
      </section>

      {/* Trust & Footer Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-xs uppercase tracking-[0.3em]">
         © 2026 Top Seller Store eBay • Premium Multi-Vendor Ecosystem
      </footer>
    </main>
  );
}
