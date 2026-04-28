'use client';

import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock } from 'lucide-react';

const recentOrders = [
  { id: 'ORD-001', vendor: 'Tech Haven', customer: 'John Doe', amount: 1299.0, status: 'PROCESSING', time: '2 mins ago' },
  { id: 'ORD-002', vendor: 'Gadget World', customer: 'Sarah Smith', amount: 45.0, status: 'DELIVERED', time: '15 mins ago' },
  { id: 'ORD-003', vendor: 'Apple Store NYC', customer: 'Mike Johnson', amount: 999.0, status: 'SHIPPED', time: '1 hour ago' },
  { id: 'ORD-004', vendor: 'Tech Haven', customer: 'Emily Davis', amount: 250.0, status: 'PROCESSING', time: '2 hours ago' },
  { id: 'ORD-005', vendor: 'Accessories Pro', customer: 'Chris Brown', amount: 29.99, status: 'DELIVERED', time: '3 hours ago' },
];

export default function RecentOrdersFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-xl p-6 border border-white/10 flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Recent Orders</h3>
          <p className="text-sm text-zinc-400">Live activity feed</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-400 font-medium">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {recentOrders.map((order, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            key={order.id} 
            className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className={`p-2 rounded-lg ${
              order.status === 'DELIVERED' ? 'bg-emerald-500/20 text-emerald-400' :
              order.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400' :
              'bg-amber-500/20 text-amber-400'
            }`}>
              {order.status === 'DELIVERED' ? <CheckCircle size={20} /> :
               order.status === 'SHIPPED' ? <Package size={20} /> :
               <Clock size={20} />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-zinc-100">{order.id}</p>
                <p className="text-sm font-bold text-emerald-400">${order.amount.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-zinc-400">
                  <span className="text-blue-400">{order.vendor}</span> • {order.customer}
                </p>
                <p className="text-xs text-zinc-500">{order.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
