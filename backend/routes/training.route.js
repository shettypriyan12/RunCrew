import express from 'express';

const router = express.Router();

import { addTraining, deleteTraining, getTraining, getTrainings, updateTraining } from '../controllers/training.controller.js';
import { } from '../middleware/auth.middleware.js';

router.post("/training", addTraining);
router.get("/training", getTrainings);
router.get("/training/:training_id", getTraining);
router.put("/training/:training_id", updateTraining);
router.delete("/training/:training_id", deleteTraining);

export default router;