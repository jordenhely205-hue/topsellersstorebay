'use client';

import { useCurrency } from '@/store/useCurrency';
import { motion } from 'framer-motion';
import { Globe, ChevronDown, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 hover:bg-white/10 transition-all"
      >
        <Globe size={14} className="text-emerald-400" />
        {currency}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-24 glass border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
        >
          {['USD', 'GBP'].map((c: any) => (
            <button
              key={c}
              onClick={() => {
                setCurrency(c);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${currency === c ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
        <ShieldCheck size={14} className="text-emerald-400" />
        Secure SSL Encrypted Checkout
      </div>
      <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Simplified representative text for icons */}
         <div className="text-xs font-black italic text-zinc-100">VISA</div>
         <div className="text-xs font-black italic text-zinc-100">MasterCard</div>
         <div className="text-xs font-black italic text-zinc-100 font-serif">PayPal</div>
         <div className="text-xs font-black italic text-zinc-100">Stripe</div>
      </div>
    </div>
  );
}
