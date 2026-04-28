const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Global mapping to store connected users: userId -> socketId
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log('Socket Connected:', socket.id);

    // When a user logs in, they emit 'register' with their user ID
    socket.on('register', (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });

    // Custom Server-to-Client emit function for internal API routes
    // This allows Next.js API routes or Server Actions to fetch the global `io`
  });

  // Make io accessible globally so Server Actions can emit events
  global.io = io;
  global.connectedUsers = connectedUsers;

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000 (with Socket.io)');
  });
});
