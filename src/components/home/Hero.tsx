'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import AISearch from './AISearch';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Cinematic Background Blur */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-400 uppercase tracking-widest">
             <ShoppingBag size={14} />
             The Ultimate Global Marketplace
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
            Discover the <span className="text-gradient">Premium</span><br/>
            E-Commerce Experience
          </h1>
          
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
            Shop unlimited categories from top-rated sellers in the UK and USA. 
            Cinematic design meets high-performance commerce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg shadow-[0_0_30px_rgba(255,126,0,0.3)] hover:shadow-[0_0_40px_rgba(255,126,0,0.5)] transition-all flex items-center gap-2 group">
               Shop Now
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
               View Collections
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 w-full"
        >
          <AISearch />
        </motion.div>
      </div>

      {/* Hero Banner Grid (Simplified representation for code) */}
      <div className="mt-24 w-full h-[300px] flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-1000">
         {/* Placeholder for the banner images provided by user */}
         <div className="w-full max-w-6xl h-full glass border-white/5 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 uppercase tracking-[0.5em] font-bold">
               Powered by Top Seller Store technology
            </p>
         </div>
      </div>
    </section>
  );
}
