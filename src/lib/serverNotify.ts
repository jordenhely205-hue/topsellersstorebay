import { prisma } from '@/lib/prisma';

export async function sendNotification(userId: string, title: string, message: string, type: 'ORDER' | 'WALLET' | 'SYSTEM') {
  // 1. Save to Database
  const notification = await prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type
    }
  });

  // 2. Try to emit via Socket.io if running on the custom server
  try {
    // @ts-ignore - global.io is attached in server.js
    if (global.io && global.connectedUsers) {
      // @ts-ignore
      const socketId = global.connectedUsers.get(userId);
      if (socketId) {
        // @ts-ignore
        global.io.to(socketId).emit('notification', {
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          isRead: notification.isRead,
          createdAt: notification.createdAt.toISOString()
        });
      }
    }
  } catch (error) {
    console.error('Failed to emit socket notification:', error);
  }

  return notification;
}
