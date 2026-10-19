import express from "express";

import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controller/messageController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.post("/", createMessage);
router.get("/", getMessages);

router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
