import { LayoutDashboard, Package, Wallet, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'My Products', href: '/vendor/products', icon: Package },
    { name: 'Wallet & Payouts', href: '/vendor/wallet', icon: Wallet },
    { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
    { name: 'Store Settings', href: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 glass border-r border-white/5 h-screen sticky top-0 flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
            Seller Hub
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 text-zinc-400 hover:bg-white/5 hover:text-zinc-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
