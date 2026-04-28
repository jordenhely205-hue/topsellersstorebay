'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Package, CreditCard, CheckCircle, Info } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { socket } from '@/lib/socketClient';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'ORDER' | 'WALLET' | 'SYSTEM';
  isRead: boolean;
  createdAt: string;
};

export default function NotificationDrawer() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (session?.user?.id) {
      // Connect to socket and register user
      socket.connect();
      socket.emit('register', session.user.id);

      // Listen for incoming live notifications
      socket.on('notification', (newNotification: Notification) => {
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
        
        // Show browser push notification if permitted
        if (Notification.permission === 'granted') {
          new window.Notification(newNotification.title, {
            body: newNotification.message,
          });
        }
      });

      return () => {
        socket.off('notification');
        socket.disconnect();
      };
    }
  }, [session]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      // TODO: Emit API call to mark all as read
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ORDER': return <Package className="text-blue-400" size={20} />;
      case 'WALLET': return <CreditCard className="text-emerald-400" size={20} />;
      case 'SYSTEM': return <CheckCircle className="text-amber-400" size={20} />;
      default: return <Info className="text-zinc-400" size={20} />;
    }
  };

  return (
    <>
      {/* Bell Button */}
      <button 
        onClick={toggleDrawer}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Bell className="text-zinc-300" size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 sm:w-96 h-full glass border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Notifications</h3>
                <button onClick={toggleDrawer} className="text-zinc-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                    <Bell size={48} className="mb-4 opacity-20" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 rounded-xl border ${notif.isRead ? 'bg-white/5 border-transparent' : 'bg-white/10 border-white/20'} flex gap-4 transition-colors`}
                    >
                      <div className="mt-1">
                        {getIcon(notif.type)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                        <p className="text-sm text-zinc-400 mt-1">{notif.message}</p>
                        <p className="text-xs text-zinc-500 mt-2">{notif.createdAt}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
