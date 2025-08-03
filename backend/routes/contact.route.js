import express from 'express';
import { addContact, deleteContact, getContact, getContacts } from '../controllers/contact.controller.js';
import { isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/contact' , isAdmin , addContact);
router.get('/contact' , isAdmin , getContacts);
router.get('/contact/:contact_id' , isAdmin , getContact);
router.delete('/contact/:contact_id' , isAdmin , deleteContact);

export default router;