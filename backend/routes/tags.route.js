import express from 'express';
import { addTag, deleteTag, getTag, getTags, updateTag } from '../controllers/tags.controller.js';
import { isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/tags', isAdmin , addTag);
router.get('/tags', isAdmin , getTags);
router.get('/tags/:tag_id', isAdmin , getTag);
router.put('/tags/:tag_id', isAdmin , updateTag);
router.delete('/tags/:tag_id', isAdmin , deleteTag);

export default router;