import express from 'express';
import { addRace, getRaces , getRace , updateRace , deleteRace } from '../controllers/races.controller.js';
import {  } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/races'  , addRace);
router.get('/races'  , getRaces);
router.get('/races/:race_id'  , getRace);
router.put('/races/:race_id'  , updateRace);
router.delete('/races/:race_id'  , deleteRace);


export default router;
