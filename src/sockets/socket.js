import { verifyToken } from "../utils/jwt.js";

const initSocket = (io) => {
  // Authenticate the socket connection using JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error: No token"));
    }

    try {
      const decoded = verifyToken(token);

      socket.userId = decoded.userId;

      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id} (user ${socket.userId})`);

    // Client sends the conversationId when opening a conversation
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leaveConversation", (conversationId) => {
      socket.leave(conversationId);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export default initSocket;
