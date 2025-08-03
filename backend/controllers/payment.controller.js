import dotenv from 'dotenv';
dotenv.config();
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db } from '../index.js';

import { success, failure } from '../response.js';


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const getAllPayments = async (req, res) => {
    const sql = `
    SELECT 
        p.payment_id,
        p.participant_id,
        pr.full_name AS participant_name,
        pr.event_name,
        p.razorpay_order_id,
        p.razorpay_payment_id,
        p.razorpay_signature,
        p.amount,
        p.currency,
        pr.is_paid,
        p.paid_at
        FROM payments p
        JOIN participant_registrations pr ON p.participant_id = pr.id
        ORDER BY p.paid_at DESC
    `;

    try {
        const [result] = await db.query(sql);
        
        if (result.length > 0) {
            return success(res, 200, "Payment fetching successfull", result);
        }

        return failure(res, 400, "No payments fetched");
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const deletePayments = async (req, res) => {

    const paymentId = req.params.payment_id;
    const sql = `DELETE FROM payments where payment_id = ?`;

    try {
        const [result] = await db.query(sql, [paymentId]);

        if (result.affectedRows > 0) {
            success(res, 200, "user deleted successfully", result);
        }
        return failure(res, 400, "user not found");

    } catch (err) {
        return failure(res, 500, "Something went wrong")
    }
}


export const createOrder = async (req, res) => {

    const {
        amount,
        currency = 'INR',
        receipt = 'receipt#1'
    } = req.body;

    const amountInPaise = amount * 100;
    try {
        const options = {
            amount: amountInPaise,
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);
        success(res, 200, "Order created", order);
    } catch (error) {
        console.error(error);
        failure(res, 500, "Failed to create Razorpay order");
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            participant_id
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !participant_id) {
            return failure(res, 400, "Missing required payment verification fields");
        }
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return failure(res, 400, "Invalid payment signature");
        }

        const sql = `UPDATE participant_registrations SET is_paid = 1 WHERE id = ?`;
        const [result] = await db.query(sql, [participant_id]);

        if (result.affectedRows === 1) {
            return success(res, 200, "Payment verified and registration updated", { valid: true });
        } else {
            return failure(res, 404, "Participant registration not found");
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        return failure(res, 500, "Payment verification failed");
    }
};


export const recordPayment = async (req, res) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        participant_id,
        amount,
        currency = 'INR'
    } = req.body;

    let conn;
    try {
        conn = await db.getConnection();
        await conn.beginTransaction();

        const insertSQL = `
            INSERT INTO payments 
            (participant_id, razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, currency, paid_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        await conn.execute(insertSQL, [
            participant_id,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            amount,
            currency
        ]);

        const updateSQL = `
            UPDATE participant_registrations
            SET is_paid = 1
            WHERE id = ?
        `;
        const [updateResult] = await conn.execute(updateSQL, [participant_id]);

        if (updateResult.affectedRows === 0) {
            await conn.rollback();
            return res.status(404).json({ message: "Participant not found or already paid" });
        }

        await conn.commit();
        res.status(201).json({ message: "Payment recorded and registration updated" });
    } catch (err) {
        if (conn) await conn.rollback();
        console.error("Error recording payment:", err);
        res.status(500).json({ message: "Database error" });
    } finally {
        if (conn) conn.release();
    }
};

