'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, ChevronRight, LayoutGrid } from 'lucide-react';
import { getCategories } from '@/actions/category';

export function CategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await getCategories();
      if (res.success) setCategories(res.data);
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-12">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          <div className="relative glass p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-4 group-hover:border-emerald-500/50 transition-all group-hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
               {/* This would be the 3D Glassmorphism Icon */}
               <LayoutGrid className="text-emerald-400 group-hover:text-emerald-300" size={32} />
            </div>
            <p className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">{cat.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await getCategories();
      if (res.success) setCategories(res.data);
    }
    load();
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-100 hover:bg-white/10 transition-all font-medium"
      >
        <Grid size={20} className="text-emerald-400" />
        All Categories
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-4 w-[600px] glass border border-white/10 rounded-2xl p-8 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <div className="grid grid-cols-2 gap-8 relative z-10">
              {categories.map((cat) => (
                <div key={cat.id} className="group cursor-pointer">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-all">
                        <LayoutGrid size={18} className="text-emerald-400" />
                      </div>
                      <span className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {cat.name}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-600 group-hover:text-emerald-400 transition-all translate-x-0 group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
              <p className="text-xs text-zinc-500">Unlimited categories powered by dynamic attributes.</p>
              <button className="text-xs font-bold text-emerald-400 hover:underline">View All Trends</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
