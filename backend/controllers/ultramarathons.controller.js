import {db} from "../index.js";
import { eventCatModel } from "../models/eventCat.model.js";
import { success, failure } from "../response.js";

export const addUltram = async (req, res) => {
    const { cat_id, name, start, end, cost, img, location } = req.body;

    const sql = `INSERT INTO ultramarathons (cat_id, name, start, end, cost, img, location) values (?, ?, ?, ?, ?, ?, ?)`;

    try {
        await eventCatModel.validate({ cat_id, name, start, end, cost, img, location }, { abortEarly: false });

        const [result] = await db.query(sql, [cat_id, name, start, end, cost, img, location]);

        if (result.affectedRows > 0) {
            return success(res, 201, "created successfully", { cat_id, name, start, end, cost, img, location });
        }

        else {
            return failure(res, 400, "not created");
        }

    }
    catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
}

export const getUltrams = async (req, res) => {
    const sql = `SELECT * FROM ultramarathons`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "fetched successfully", result);
        }

        else {
            return failure(res, 400, "not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const getUltram = async (req, res) => {
    const ultramId = req.params.um_id;
    const sql = `SELECT * FROM ultramarathons WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [ultramId]);

        if (result.length > 0) {
            success(res, 200, "fetched successfully", result);
        }

        else {
            return failure(res, 400, "not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const updateUltram = async (req, res) => {
    const ultramId = req.params.um_id;
    const fields= ["cat_id", "name", "start", "end", "cost", "img", "location"];
    const values =[];
    const updates= [];


    fields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates.push(`${field} = ?`);
            values.push(req.body[field]);
        }
    });

    if(updates.length === 0) {
        return failure(res, 400, "No fields to update");
    }

    const sql = `UPDATE ultramarathons SET ${updates.join(", ")} WHERE id = ?`;
    values.push(ultramId);

    try {
        // await eventCatModel.validate({ cat_id, name, start, end, cost, img, location }, { abortEarly: false });    

        const [result] = await db.query(sql, values);

        if (result.affectedRows > 0) {
            return success(res, 201, "updated successfully", req.body); 
        }

        else {
            return failure(res, 400, "not updated");
        }

    }
    catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
}

export const deleteUltram = async (req, res) => {
    const ultramId = req.params.um_id;
    const sql = `DELETE FROM ultramarathons WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [ultramId]);

        if (result.affectedRows > 0) {
            return success(res, 200, "deleted successfully");
        }

        else {
            return failure(res, 400, "not deleted");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}