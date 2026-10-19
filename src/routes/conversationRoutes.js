import express from "express";
import {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
} from "../controller/conversationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, createConversation);
router.get("/", authMiddleware, getConversations);
router.get("/:id", authMiddleware, getConversationById);
router.delete("/:id", authMiddleware, deleteConversation);

export default router;
