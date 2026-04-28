'use client';

import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Package, DollarSign } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const salesData = [
  { day: 'Mon', sales: 2400 },
  { day: 'Tue', sales: 1398 },
  { day: 'Wed', sales: 9800 },
  { day: 'Thu', sales: 3908 },
  { day: 'Fri', sales: 4800 },
  { day: 'Sat', sales: 3800 },
  { day: 'Sun', sales: 4300 },
];

const stockData = [
  { name: 'iPhone 15', stock: 5 },
  { name: 'Leather Jacket', stock: 12 },
  { name: 'AirPods Pro', stock: 2 },
  { name: 'Samsung S24', stock: 8 },
];

export default function VendorAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Vendor Analytics</h2>
        <p className="text-zinc-400 mt-1">Deep dive into your sales performance and stock status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Net Sales" value="$14,500.00" icon={DollarSign} trend="8.2%" trendUp={true} />
        <StatCard title="Orders" value="128" icon={Package} trend="12%" trendUp={true} />
        <StatCard title="Low Stock Items" value="3" icon={AlertTriangle} trendUp={false} />
        <StatCard title="Popularity" value="4.8/5" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Performance Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-8">Sales Performance</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="sales" stroke="#10b981" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Low Stock Alert Board */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-8">Stock Alert</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={10} width={100} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
                <Bar dataKey="stock" radius={[0, 4, 4, 0]}>
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.stock < 5 ? '#f43f5e' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span>Critical (Below 5 units)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
