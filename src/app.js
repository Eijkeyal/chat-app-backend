import express from "express";
import cors from "cors";
import http from "node:http";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);

app.use("/conversations/:conversationId/messages", messageRoutes);
app.use("/messages", messageRoutes);

app.use(errorMiddleware);

export default app;
