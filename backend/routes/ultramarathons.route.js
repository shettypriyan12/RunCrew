import express from 'express';

import { addUltram , deleteUltram , getUltram ,getUltrams , updateUltram } from '../controllers/ultramarathons.controller.js';
import { } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/ultramarathons' ,  addUltram);
router.get('/ultramarathons' ,  getUltrams);
router.get('/ultramarathons/:um_id' ,  getUltram);
router.put('/ultramarathons/:um_id' ,  updateUltram);
router.delete('/ultramarathons/:um_id' ,  deleteUltram);


export default router;