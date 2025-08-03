import express from 'express';
import { createOrder, deletePayments, getAllPayments, recordPayment, verifyPayment } from '../controllers/payment.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/payments', auth, getAllPayments);
router.delete('/payments/:payment_id', auth, deletePayments);

router.post('/razorpay/create-order', auth, createOrder);
router.post('/razorpay/verify-payment', auth, verifyPayment);
router.post('/razorpay/record-payment', auth, recordPayment);

export default router;