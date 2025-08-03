import express from 'express';
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { forgotPassword, login, resetPassword, signUp } from '../controllers/auth.controller.js';
import { auth, isAdmin, isSelfOrAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/user' , addUser);
router.get('/user' , auth , isAdmin , getUsers);
router.get('/user/:user_id' , auth , getUser);
router.put('/user/:user_id' , auth , isSelfOrAdmin , updateUser);
router.delete('/user/:user_id' , auth , isAdmin , deleteUser);

router.post('/sign-up' , signUp );
router.post('/login' , login );
router.post('/forgot-password' , forgotPassword );
router.post('/reset-password' , resetPassword );

export default router;