import express from "express";

import {
  createHabit,
  getHabits,
  deleteHabit,
  completeHabit
} from "../controllers/habitController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createHabit);

router.get("/", protect, getHabits);

router.delete("/:id", protect, deleteHabit);

router.post("/:id/complete", protect, completeHabit);

export default router;