import { db } from '../index.js';
import nodemailer from 'nodemailer';

import { success, failure } from '../response.js';

export const registerParticipant = async (req, res) => {
    try {
        const { user_id, event_id, event_name, cat_id, category, start,
            full_name, email, phone, dob, gender,
            country, state, city, pincode,
            emergency_contact_name, emergency_contact_phone,
            medical_condition, is_paid
        } = req.body;

        if (!start || isNaN(Date.parse(start))) {
            return res.status(400).json({ message: "Invalid start date format" });
        }
        const mysqlFormattedStart = new Date(start).toISOString().slice(0, 19).replace('T', ' ');

        const sql = `
            INSERT INTO participant_registrations (
                user_id, event_id, event_name, cat_id, category, start,
                full_name, email, phone, dob, gender,
                country, state, city, pincode,
                emergency_contact_name, emergency_contact_phone,
                medical_condition, is_paid
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
        `;

        const [registered] = await db.query(sql, [
            user_id, event_id, event_name, cat_id, category, mysqlFormattedStart,
            full_name, email, phone, dob, gender,
            country, state, city, pincode,
            emergency_contact_name, emergency_contact_phone,
            medical_condition, is_paid
        ]);

        if (registered.affectedRows > 0) {
            const createdUser = { id: registered.id, event_name, email, phone };
            const formattedStartdate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(start));
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                to: createdUser.email,
                from: process.env.EMAIL,
                subject: "🎉 Welcome to RunCrew! Thanks for registering",
                text: `You’re officially registered for *${event_name}* on *${formattedStartdate}*! 🎉

            We’re excited to have you join us for an unforgettable experience. Whether you’re racing to beat a personal best or just here to enjoy the journey, this event is all about celebrating your passion and determination.
                        
            📍 Keep an eye out for important updates as the day approaches — and don’t forget to stretch! 😉
                        
            Let’s make *${event_name}* one to remember! 🏃‍♀️🏃💨`,
            };

            await transporter.sendMail(mailOptions);
            return res.status(201).json({ message: "Participant registered", participant_id: registered.insertId });
        }

        return failure(res, 400, "Something went wrong")

    } catch (err) {
        console.error("Registration error:", err);
        return failure(res, 500, "Registration failed");
    }
};


export const getAllParticipants = async (req, res) => {
    try {
        const sql = `SELECT * FROM participant_registrations `;
        const [participants] = await db.query(sql);
        return success(res, 200, "Participants fetched successfully", participants);
    } catch (err) {
        console.error(err);
        return failure(res, 500, "Could not fetch participants");
    }
};

export const getUserRegistrations = async (req, res) => {
    const userId = req.params.user_id;

    const sql = `
        SELECT *
        FROM participant_registrations
        WHERE user_id = ?
    `;

    try {
        const [registrations] = await db.query(sql, [userId]);
        // console.log(registrations);
        

        if (registrations.length > 0) {
            return success(res, 200, "User registrations fetched successfully", registrations);

        }

        return failure(res, 400 , "Something went wrong");
        
    } catch (error) {
        console.error("Get user registrations error:", error);
        return failure(res, 500, "Failed to fetch user registrations");
    }
};


export const updateParticipant = async (req, res) => {
    try {
        const participantId = req.params.participant_id;
        const { full_name, email, phone, dob, gender, country, state, city, pincode, emergency_contact_name, emergency_contact_phone, medical_condition, is_paid } = req.body;

        const sql = `
            UPDATE participant_registrations SET
                full_name = ?, email = ?, phone = ?, dob = ?, gender = ?,
                country = ?, state = ?, city = ?, pincode = ?,
                emergency_contact_name = ?, emergency_contact_phone = ?,
                medical_condition = ?, is_paid = ?
            WHERE id = ?
        `;

        const [updated] = await db.query(sql, [
            full_name, email, phone, dob, gender,
            country, state, city, pincode,
            emergency_contact_name, emergency_contact_phone,
            medical_condition, is_paid, participantId
        ]);

        if (updated.affectedRows > 0) {
            return success(res, 200, "Participant updated successfully", updated);
        }

        return failure(res, 400, "Something went wrong");

    } catch (err) {
        console.error("Update error:", err);
        return failure(res, 500, "Update failed");
    }
};

export const deleteParticipant = async (req, res) => {
    try {
        const participantId = req.params.participant_id;
        const sql = `DELETE FROM participant_registrations WHERE id = ?`;
        const [deleted] = await db.query(sql, [participantId]);

        if (deleted.affectedRows > 0) {
            return success(res, 200, "Participant deleted successfully", deleted);
        }

        return failure(res, 400, "Participant not found");

    } catch (err) {
        console.error("Delete error:", err);
        return failure(res, 500, "Delete failed");
    }
};