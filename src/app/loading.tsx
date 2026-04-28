'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] bg-[#020617] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-2 border-orange-500/20 border-t-orange-500 shadow-[0_0_20px_rgba(255,126,0,0.2)]"
        />
        
        {/* Inner Logo Initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-black italic text-white"
          >
            TS
          </motion.div>
        </div>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold"
      >
        Initializing Marketplace
      </motion.p>
    </div>
  );
}
