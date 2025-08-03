import express from 'express';
import { deleteParticipant, getAllParticipants, getUserRegistrations, registerParticipant, updateParticipant } from '../controllers/registration.controller.js';
import { auth } from '../middleware/auth.middleware.js';


const router = express.Router();


router.post('/register', auth, registerParticipant);
router.get('/register', auth, getAllParticipants);
router.get("/register/:user_id", auth, getUserRegistrations); 
router.put('/register/:participant_id', auth, updateParticipant);
router.delete('/register/:participant_id', auth, deleteParticipant);

export default router;