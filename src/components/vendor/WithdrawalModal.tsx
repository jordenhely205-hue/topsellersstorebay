'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, CreditCard, Building2, Smartphone, DollarSign, Send } from 'lucide-react';

export default function WithdrawalModal({ isOpen, onClose, balance }: { isOpen: boolean, onClose: () => void, balance: number }) {
  const [method, setMethod] = useState<'BANK' | 'JAZZCASH' | 'EASYPAISA'>('BANK');
  const [amount, setAmount] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass border border-white/10 p-8 rounded-3xl z-[101] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                  <Wallet size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Request Payout</h3>
                  <p className="text-xs text-zinc-400">Available: ${balance.toFixed(2)}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Method Toggle */}
              <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                {[
                  { id: 'BANK', icon: Building2, label: 'Bank' },
                  { id: 'JAZZCASH', icon: Smartphone, label: 'JazzCash' },
                ].map((m: any) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${method === m.id ? 'bg-white/10 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    <m.icon size={16} />
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 ml-1">Payout Amount</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-4 text-emerald-500" />
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Details based on Method */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500 ml-1">
                    {method === 'BANK' ? 'IBAN / Account Number' : 'Mobile Number'}
                  </label>
                  <input 
                    type="text" 
                    placeholder={method === 'BANK' ? 'PK00...' : '0300...'} 
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500 ml-1">Account Title</label>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all mt-4 group">
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Submit Request
              </button>
              
              <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest">Secure withdrawal • Powered by Storebay</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
