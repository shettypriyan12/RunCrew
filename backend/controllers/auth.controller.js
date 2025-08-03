import { db } from '../index.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { success, failure } from '../response.js';

export const signUp = async (req, res) => {

    const checkUserSQL = `SELECT * FROM users WHERE email = ? OR phone = ?`;
    const insertUserSQL = `INSERT INTO users (name , email , phone , password) values (? ,? ,? ,?)`;

    try {
        const { name, email, phone, password } = req.body;

        const [existingUser] = await db.query(checkUserSQL, [email, phone]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Please use a different email or contact for log in.", success: false })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        // console.log(hashedPassword);
        const [insertResult] = await db.query(insertUserSQL, [name, email, phone || null, hashedPassword]);

        if (insertResult.affectedRows > 0) {
            const createdUser = { id: insertResult.insertId, name, email, phone };

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
                subject: "🎉 Welcome to RunCrew! ",
                text: `You’re officially part of a community built for runners, by runners. Whether you're chasing a new personal best or just getting started, we're here to support every step of your journey.

            Let’s lace up and hit the ground running! 🏃💨

            👉 Start by exploring upcoming marathons or setting your running goals!`,
            };

            await transporter.sendMail(mailOptions);
            return success(res, 201, "User created successfully", createdUser);
        }

        return failure(res, 400, "Something went wrong");

    } catch (error) {
        return failure(res, 500, error.message);
    }
}


export const login = async (req, res) => {

    const { emailOrPhone, password } = req.body;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

    const checkUserSQL = isEmail ?
        `SELECT * FROM users WHERE email = ?` :
        `SELECT * FROM users WHERE phone = ?`;

    if (!emailOrPhone || !password) {
        return res.status(400).json({ message: "Email/phone and password are required", success: false });
    }

    if (!isEmail && !isPhone) {
        return res.status(400).json({ message: "Enter a valid email or phone number", success: false });
    }
    try {
        const [existingUser] = await db.query(checkUserSQL, [emailOrPhone]);
        if (existingUser.length === 0) {
            return res.status(409).json({ message: "User doesn't exist.", success: false })
        }

        const user = existingUser[0];
        // console.log(user);
        

        const validUser = bcrypt.compareSync(password, user.password);
        if (validUser) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            },process.env.TOKEN_SECRET_KEY,{ expiresIn: '2h' })

            return res.status(200).json({   
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                },
                token,
                message: "Login successfull",
                success: true
            })
        } else {
            return failure(res, 400, " Invalid credentials ")
        }

    } catch (error) {
        return failure(res, 500, error.message)
    }
}



export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if (user.length === 0) {
            return failure(res , 404 , "Email not registered");
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        await db.query(
            `UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?`,
            [token, expiry, email]
        );

        const resetLink = `${process.env.VITE_FRONTEND_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Link',
            html: `
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 1 hour.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return success(res, 200 , "Reset link sent to your email")

    } catch (err) {
        console.error("Forgot Password Error:", err);
        return failure(res, 500 , "Something went wrong while sending reset link")
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const [user] = await db.query(
            `SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()`,
            [token]
        );

        if (user.length === 0) {
            return failure(res , 400 , "Invalid or expired token");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?`,
            [hashedPassword, token]
        );

        return success(res , 200, "Password reset successful");

    } catch (err) {
        console.error("Reset Password Error:", err);

        return failure(res, 500, "Something went wrong while resetting password");
    }
};


