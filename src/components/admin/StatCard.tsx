'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 relative overflow-hidden group border border-white/10"
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-zinc-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-white">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span>{trendUp ? '↑' : '↓'}</span>
              <span>{trend}</span>
              <span className="text-zinc-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <Icon size={24} className="text-blue-400" />
        </div>
      </div>
    </motion.div>
  );
}
