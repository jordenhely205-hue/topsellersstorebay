import { DollarSign, Percent, Users, UserPlus, PackageSearch, CreditCard } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import RevenueChart from '@/components/admin/RevenueChart';
import RecentOrdersFeed from '@/components/admin/RecentOrdersFeed';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
          Control Room Overview
        </h2>
        <p className="text-zinc-400 mt-1">Welcome back. Here's your marketplace performance.</p>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$1,240,500.00" 
          icon={DollarSign} 
          trend="12.5%" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Commission" 
          value="$124,050.00" 
          icon={Percent} 
          trend="12.5%" 
          trendUp={true} 
        />
        <StatCard 
          title="Active Vendors" 
          value="142" 
          icon={Users} 
          trend="5" 
          trendUp={true} 
        />
        <StatCard 
          title="New Registrations" 
          value="24" 
          icon={UserPlus} 
          trend="2" 
          trendUp={true} 
        />
        <StatCard 
          title="Pending Orders" 
          value="3,412" 
          icon={PackageSearch} 
        />
        <StatCard 
          title="Payout Requests" 
          value="$45,200.00" 
          icon={CreditCard} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="h-[400px]">
          <RecentOrdersFeed />
        </div>
      </div>
    </div>
  );
}
