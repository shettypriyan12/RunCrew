import express from 'express'
import { getAllResults, getUserResults, createResult, updateResult, deleteResult } from '../controllers/eventResults.controller.js';

import { auth, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/results/user/:user_id', auth, getUserResults);

router.post('/results', auth, isAdmin, createResult);
router.get('/results', auth, isAdmin, getAllResults);
router.put('/results/:result_id', auth, isAdmin, updateResult);
router.delete('/results/:result_id', auth, isAdmin, deleteResult);


export default router;
