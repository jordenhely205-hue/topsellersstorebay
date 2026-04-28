'use client';

import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, FileText, ZoomIn } from 'lucide-react';
import { useState } from 'react';

// Simulated pending vendors for the UI mockup
const pendingVendors = [
  { id: 'vp_01', storeName: 'Tech Haven', documentUrl: '/placeholder-id.jpg', submittedAt: '2 hours ago' },
  { id: 'vp_02', storeName: 'Gadget World', documentUrl: '/placeholder-tax.jpg', submittedAt: '5 hours ago' }
];

export default function DocumentVerificationPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold text-white">Document Verification</h2>
        <p className="text-zinc-400 mt-1">Review ID and Tax documents for new vendors to ensure platform security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Pending Review</h3>
            <div className="bg-white/5 rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/10">
              <Search size={16} className="text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search vendors..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 w-32"
              />
            </div>
          </div>

          <div className="space-y-4">
            {pendingVendors.map((vendor) => (
              <div key={vendor.id} className="flex flex-col gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{vendor.storeName}</p>
                      <p className="text-xs text-zinc-400">Submitted {vendor.submittedAt}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedDoc(vendor.documentUrl)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                  >
                    <ZoomIn size={14} /> View Doc
                  </button>
                </div>

                <div className="flex gap-2 mt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors text-sm font-medium">
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors text-sm font-medium">
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Document Viewer */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[500px]"
        >
          {selectedDoc ? (
            <div className="relative w-full h-full flex flex-col items-center group">
              <h3 className="text-lg font-bold text-white self-start mb-4">Document Viewer</h3>
              <div className="flex-1 w-full rounded-lg border border-white/10 bg-black/50 overflow-hidden flex items-center justify-center relative">
                {/* Mockup for image viewer */}
                <div className="text-center p-8">
                  <FileText size={64} className="text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 text-sm">Secure Document Display</p>
                  <p className="text-xs text-zinc-600 mt-2">{selectedDoc}</p>
                </div>
                
                {/* Hover zoom instruction */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white flex items-center gap-2"><ZoomIn /> Click to expand</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-zinc-500" />
              </div>
              <p className="text-zinc-400">Select a document to review</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
