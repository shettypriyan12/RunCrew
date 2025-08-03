import { db } from "../index.js";
import { userModel } from "../models/user.model.js";
import { success, failure } from "../response.js";

export const addUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const sql = `INSERT INTO users (name , email , phone , password) values (?, ?, ?, ?)`;
    try {
        await userModel.validate({ name, email, phone, password }, { abortEarly: false });

        const [result] = await db.query(sql, [name, email, phone || null , password]);

        if (result.affectedRows > 0) {
            return success(res, 201, "user created successfully", { name, email, phone, password });
        }
        else {
            return failure(res, 400, "user not created");
        }

    }
    catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
}

export const getUsers = async (req, res) => {
    const sql = `SELECT * FROM users`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "user fetched successfully", result);
        }

        else {
            return failure(res, 400, "user not found");
        }
    }
    catch (err) {
        // console.log("DB Error:", err);
        failure(res, 500, "Something went wrong");
    }
}

export const getUser = async (req, res) => {
    const userId = req.params.user_id;
    const sql = `SELECT * FROM users WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [userId]);

        if (result.length > 0) {
            success(res, 200, "user fetched successfully", result);
        }
        else {
            return failure(res, 400, "user not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.user_id;
    const fields = ["name", "email", "phone", "password", "role"];
    const values = [];
    const updates = [];


    fields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates.push(`${field} = ?`);
            values.push(req.body[field]);
        }
    });

    if (updates.length === 0) {
        return failure(res, 400, "No fields to update");
    }

    const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    values.push(userId);

    try {
        const [result] = await db.query(sql, values);

        if (result.affectedRows > 0) {
            return success(res, 200, "User data updated successfully", req.body);
        } else {
            return failure(res, 400, "User data not updated");
        }
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.user_id;
    const sql = `DELETE FROM users WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [userId]);

        if (result.affectedRows > 0) {
            success(res, 200, "user deleted successfully", result);
        }
        else {
            return failure(res, 400, "user not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}