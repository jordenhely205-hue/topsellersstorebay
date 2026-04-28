'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Zap, ArrowRight } from 'lucide-react';

export default function AISearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: string) => {
    setQuery(e);
    if (e.length > 2) {
      setLoading(true);
      // Mock instant results
      setTimeout(() => {
        setResults([
          { id: 1, name: 'Premium Tech Bundle', price: '$499', category: 'Electronics' },
          { id: 2, name: 'Designer Fashion Set', price: '$120', category: 'Fashion' },
        ]);
        setLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus-within:border-orange-500/50 transition-all">
          <Search className="text-zinc-500 group-focus-within:text-orange-400 transition-colors" size={20} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products, brands, or categories..." 
            className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder:text-zinc-600"
          />
          {query && <X size={18} className="text-zinc-500 cursor-pointer hover:text-white" onClick={() => setQuery('')} />}
        </div>
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-4 glass rounded-2xl border border-white/10 overflow-hidden z-[100] shadow-2xl"
          >
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
               <Zap size={14} className="text-orange-400 fill-orange-400" />
               <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Instant AI Results</span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {results.map((res) => (
                <div key={res.id} className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5" />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{res.name}</h4>
                      <p className="text-xs text-zinc-500">{res.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-zinc-100">{res.price}</span>
                    <ArrowRight size={14} className="text-zinc-700 group-hover:text-orange-400 transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
