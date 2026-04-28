'use client';

import { motion } from 'framer-motion';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, commission: 2400 },
  { name: 'Tue', revenue: 3000, commission: 1398 },
  { name: 'Wed', revenue: 2000, commission: 9800 },
  { name: 'Thu', revenue: 2780, commission: 3908 },
  { name: 'Fri', revenue: 1890, commission: 4800 },
  { name: 'Sat', revenue: 2390, commission: 3800 },
  { name: 'Sun', revenue: 3490, commission: 4300 },
];

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-xl p-6 border border-white/10"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Revenue & Commission</h3>
        <p className="text-sm text-zinc-400">Weekly performance overview</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#a1a1aa" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#a1a1aa" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(24, 24, 27, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              style={{ filter: 'drop-shadow(0px 0px 8px rgba(59,130,246,0.5))' }}
            />
            <Line 
              type="monotone" 
              dataKey="commission" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              style={{ filter: 'drop-shadow(0px 0px 8px rgba(16,185,129,0.5))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
