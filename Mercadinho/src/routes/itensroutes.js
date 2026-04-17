import express from "express";
import { getAllItens, getItemById, createItem, updateItem, deleteItem } from "../controllers/itenscontroller.js";
import { authenticateToken } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get("/", authenticateToken, getAllItens);
router.get("/:id", authenticateToken, getItemById);

router.post("/", authenticateToken, createItem);
router.put("/:id", authenticateToken, updateItem);
router.delete("/:id", authenticateToken, deleteItem);

export default router;