'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, ExternalLink, RefreshCcw, AlertCircle } from 'lucide-react';
import { createStripeConnectAccount } from '@/actions/stripeConnect';

export default function VendorPaymentsSettings({ vendor }: { vendor: any }) {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    const res = await createStripeConnectAccount();
    if (res.success && res.url) {
      window.location.href = res.url;
    } else {
      alert(res.error || 'Failed to start Stripe onboarding');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Payout Configuration</h3>
              <p className="text-xs text-zinc-500">Connect your account to receive automated payouts.</p>
            </div>
          </div>
          
          {vendor.isStripeConnected ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              <CheckCircle2 size={14} />
              Connected
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
              <AlertCircle size={14} />
              Setup Required
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-6">
          <div className="flex items-start gap-4">
             <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">S</div>
             </div>
             <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-1">Stripe Express Account</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We use Stripe Express to handle secure, automated payments. Once connected, your shares will be transferred directly to your bank account after order fulfillment.
                </p>
             </div>
          </div>

          {!vendor.isStripeConnected ? (
            <button
              onClick={handleConnect}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? <RefreshCcw size={20} className="animate-spin" /> : <ExternalLink size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              {loading ? 'Starting Onboarding...' : 'Connect with Stripe'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                 <span className="text-xs text-zinc-500">Connected Account ID</span>
                 <code className="text-xs text-blue-400">{vendor.stripeConnectId}</code>
              </div>
              <button className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                 View Stripe Dashboard <ExternalLink size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
