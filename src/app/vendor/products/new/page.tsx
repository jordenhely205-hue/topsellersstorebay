'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Plus, X, Box, Tag, DollarSign, ListPlus } from 'lucide-react';
import { getCategories } from '@/actions/category';

export default function ProductUploadPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [dynamicAttrs, setDynamicAttrs] = useState<any>({});

  useEffect(() => {
    async function loadCategories() {
      const res = await getCategories();
      if (res.success) setCategories(res.data);
    }
    loadCategories();
  }, []);

  const handleAttrChange = (name: string, value: string) => {
    setDynamicAttrs((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Add New Product</h2>
        <p className="text-zinc-400 mt-1">Upload your products with unlimited flexibility and dynamic categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Box size={20} className="text-emerald-400"/> Basic Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Product Name</label>
                <input type="text" placeholder="e.g. Premium Leather Jacket" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea rows={4} placeholder="Describe your product..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Price ($)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-3 text-zinc-500" />
                    <input type="number" placeholder="0.00" className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Total Stock</label>
                  <input type="number" placeholder="100" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><ListPlus size={20} className="text-blue-400"/> Category & Attributes</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${selectedCategory?.id === cat.id ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border-transparent' : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Dynamic Section based on Selected Category Attributes */}
            {selectedCategory && selectedCategory.attributes && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <p className="text-sm font-semibold text-emerald-400 mb-4">{selectedCategory.name} Specific Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategory.attributes.map((attr: any) => (
                    <div key={attr.name}>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">{attr.name}</label>
                      {attr.type === 'select' ? (
                        <select 
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                          onChange={(e) => handleAttrChange(attr.name, e.target.value)}
                        >
                          <option value="">Select {attr.name}</option>
                          {attr.options?.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          type="text" 
                          placeholder={`Enter ${attr.name}`} 
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                          onChange={(e) => handleAttrChange(attr.name, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!selectedCategory && (
              <div className="text-center py-10 text-zinc-500 text-sm italic">
                Please select a category to view specific attributes.
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Images & Actions */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Product Images</h3>
            <div className="border-2 border-dashed border-emerald-500/30 rounded-xl p-8 text-center bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <UploadCloud size={40} className="mx-auto text-emerald-400 mb-3" />
              <p className="text-sm font-medium text-white">Click or drag images</p>
              <p className="text-xs text-zinc-500 mt-1">High-speed Cloudinary Delivery</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 border border-white/10">
             <button className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-blue-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
                Publish Product
             </button>
             <button className="w-full py-3 mt-3 rounded-lg font-bold text-zinc-300 bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                Save as Draft
             </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
