import jwt from 'jsonwebtoken';
import { db } from '../index.js';

export const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

            if (decoded) {
                const [rows] = await db.execute(
                    'SELECT id, name, email, phone, role FROM users WHERE id = ?', [decoded.id]
                );

                if (rows.length === 0) {
                    return res.status(401).json({
                        message: "User not found",
                        success: false,
                    });
                }
                req.user = rows[0];
                return next();
            } else {
                console.error("Auth middleware error:", error.message);
                return res.status(401).json({
                    message: "Invalid token",
                    success: false,
                });
            }
        }

        return res.status(401).json({
            message: "No token provided",
            success: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user.role === "admin") {
        return next();
    } else {
        return res.status(403).json({
            message: "You don't have permission to perform this action.",
        });
    }
};

export const isSelfOrAdmin = (req, res, next) => {
    const userIdParam = parseInt(req.params.user_id, 10);
    const loggedInUserId = req.user.id;
    const userRole = req.user.role;

    if (userRole === 'admin' || userIdParam === loggedInUserId) {
        return next();
    }

    return res.status(403).json({
        message: "You are not authorized to access this resource",
        success: false,
    });
};