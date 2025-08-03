import {db} from "../index.js";
import { tagModel } from "../models/tag.model.js";
import { success, failure } from "../response.js";

export const addTag = async (req, res) => {
    const { cat_id, event_id, tag } = req.body;
    const sql = `INSERT INTO tags (cat_id, event_id, tag) VALUES (?, ?, ?)`;

    try {
        await tagModel.validate({ cat_id, event_id, tag }, { abortEarly: false });

        const [result] = await db.query(sql, [cat_id, event_id, tag]);

        if (result.affectedRows > 0) {
            return success(res, 201, "Tag created successfully", { cat_id, event_id, tag });
        } else {
            return failure(res, 400, "Tag not created");
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            return failure(res, 400, "Validation failed");
        }

        return failure(res, 500, "Something went wrong");
    }
};


export const getTags = async (req, res) => {
    const sql = `SELECT * FROM tags`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "Tags fetched successfully", result);
        }
        else {
            return failure(res, 400, "Tags not found");
        }
    } catch (err) {
        failure(res, 500, "Something went wrong");
    }
};

export const getTag = async (req, res) => {
    const tagId = req.params.tag_id;
    const sql = `SELECT * FROM tags WHERE id= ?`;

    try {
        const [result] = await db.query(sql, [tagId]);

        if (result.length > 0) {
            success(res, 200, "Tag fetched successfully", result);
        }
        else {
            return failure(res, 400, "Tag not found");
        }
    } catch (err) {
        failure(res, 500, "Something went wrong");
    }
};

export const updateTag = async (req, res) => {
    const tagId = req.params.tag_id;
    const fields = [cat_id, event_id, tag];
    const updates = [];
    const values = [];

    fields.forEach((field) => {
        if (req.body[field]) {
            updates.push(`${field} = ?`);
            values.push(req.body[field]);
        }
    });

    if (updates.length === 0) {
        return failure(res, 400, "No fields to update");
    }

    const sql = `UPDATE tags SET ${updates.join(",")} WHERE id + ?`;
    values.push(tagId);
    try {
        const [result] = await db.query(sql, values);

        if (result.affectedRows > 0) {
            return success(res, 200, "Tag updated successfully", req.body);
        }
        else {
            return failure(res, 400, "Tag not updated");
        }
    } catch (err) {
        failure(res, 500, "Something went wrong");
    }
};

export const deleteTag = async (req, res) => {
    const tagId = req.params.tag_id;
    const sql = `DELETE FROM tags WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [tagId]);

        if (result.affectedRows > 0) {
            return success(res, 200, "Tag deleted successfully");
        }
        else {
            return failure(res, 400, "Tag not deleted");
        }
    } catch (err) {
        failure(res, 500, "Something went wrong");
    }
};