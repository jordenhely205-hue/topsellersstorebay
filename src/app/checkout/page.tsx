'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingBag, ShieldCheck, ChevronLeft, MapPin, Truck } from 'lucide-react';
import { useCurrency } from '@/store/useCurrency';
import { TrustBadges } from '@/components/shared/PaymentUI';

export default function CheckoutPage() {
  const { formatPrice, currency } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'PAYPAL' | 'APPLE'>('STRIPE');

  // Mock Cart Data
  const cartItems = [
    { id: '1', name: 'Premium Leather Jacket', price: 299, quantity: 1, image: '' },
    { id: '2', name: 'Wireless Headphones', price: 149, quantity: 1, image: '' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details & Payment */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Shipping Details Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-emerald-400" />
                <h2 className="text-xl font-bold text-white">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" />
                <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" />
                <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all md:col-span-2" />
                <input type="text" placeholder="Shipping Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all md:col-span-2" />
              </div>
            </motion.div>

            {/* Payment Method Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-3xl p-8 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="text-blue-400" />
                <h2 className="text-xl font-bold text-white">Payment Method</h2>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'STRIPE', name: 'Credit / Debit Card', desc: 'Secure payment via Stripe' },
                  { id: 'PAYPAL', name: 'PayPal Checkout', desc: 'Pay with your PayPal account' },
                  { id: 'APPLE', name: 'Apple / Google Pay', desc: 'Express checkout' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${paymentMethod === method.id ? 'bg-white/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-emerald-500' : 'border-zinc-700'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">{method.name}</p>
                        <p className="text-xs text-zinc-500">{method.desc}</p>
                      </div>
                    </div>
                    {/* Simplified Representative Icons */}
                    <div className="flex gap-2 opacity-60">
                      <div className="w-8 h-5 bg-zinc-800 rounded border border-white/10" />
                      <div className="w-8 h-5 bg-zinc-800 rounded border border-white/10" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <ShoppingBag className="text-emerald-400" />
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/5" />
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{item.name}</p>
                          <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-zinc-300">{formatPrice(item.price)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 flex items-center gap-2"><Truck size={14} /> Shipping</span>
                    <span className="text-white font-medium">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 text-white">
                    <span>Total ({currency})</span>
                    <span className="text-emerald-400">{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-extrabold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform active:scale-95">
                  Complete Purchase
                </button>

                <div className="mt-4">
                   <TrustBadges />
                </div>
              </motion.div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                 <ShieldCheck className="text-emerald-500" size={20} />
                 <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Encrypted Transaction</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
