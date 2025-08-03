import express from "express";
import { auth, isAdmin } from '../middleware/auth.middleware.js';
import { getEventParticipantCounts } from "../controllers/adminStats.controller.js";

const router = express.Router();


router.get("/event-participants-count", auth, isAdmin, getEventParticipantCounts);


export default router;