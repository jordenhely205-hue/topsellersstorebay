import { io } from 'socket.io-client';

// Initialize the socket connection
export const socket = io(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', {
  autoConnect: false, // Don't connect until user is authenticated
});
