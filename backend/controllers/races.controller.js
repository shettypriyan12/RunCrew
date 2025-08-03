import { db } from "../index.js";
import { eventCatModel } from "../models/eventCat.model.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { success, failure } from "../response.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            const uploadPath = "./uploads";
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
    filename: function (req, file, cb) {
        const orgName = file.originalname;
        const ext = path.parse(orgName).ext;
        const name = path.parse(orgName).name;

        const filename = name + "-" + Date.now() + ext;
        // console.log(filename);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

export const addRace = async (req, res) => {

    const uploadSingle = upload.single("img");

    uploadSingle(req, res, async function (err) {
        if (err) return res.status(400).json({ success: false, message: err.message });

        const { cat_id, name, start, end, cost, img, location } = req.body;
        const filename = req.file ? `/event-files/${req.file.filename}` : null;
        const sql = `INSERT INTO races (cat_id, name, start, end, cost, img, location) values (?, ?, ?, ?, ?, ?, ?)`;

        try {

            await eventCatModel.validate({ cat_id, name, start, end, cost, img:filename, location }, { abortEarly: false });

            const [result] = await db.query(sql, [cat_id, name, start, end, cost, filename, location]);

            if (result.affectedRows > 0) {
                return success(res, 201, "races created successfully", { cat_id, name, start, end, cost, img: filename, location });
            }

            else {
                return failure(res, 400, "races not created");
            }

        }
        catch (err) {
            if (err.name === "ValidationError") {
                failure(res, 400, "Validation failed");
            }

            failure(res, 500, "Something went wrong");
        }
    });

}

export const getRaces = async (req, res) => {
    const sql = `SELECT * FROM races`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "races fetched successfully", result);
        }

        else {
            return failure(res, 400, "races not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const getRace = async (req, res) => {
    const raceId = req.params.race_id;
    const sql = `SELECT * FROM races WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [raceId]);

        if (result.length > 0) {
            success(res, 200, "races fetched successfully", result);
        }

        else {
            return failure(res, 400, "races not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const updateRace = async (req, res) => {
    const raceId = req.params.race_id;
    const fields = ["cat_id", "name", "start", "end", "cost", "img", "location"];
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

    const sql = `UPDATE races SET ${updates.join(", ")} WHERE id = ?`;
    values.push(raceId);

    try {
        // await eventCatModel.validate({ cat_id, name, start, end, cost, img, location }, { abortEarly: false });    

        const [result] = await db.query(sql, values);

        if (result.affectedRows > 0) {
            return success(res, 200, "races updated successfully", req.body);
        }

        else {
            return failure(res, 400, "races not updated");
        }
    }
    catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
}


export const deleteRace = async (req, res) => {
    const raceId = req.params.race_id;
    const sql = `DELETE FROM races WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [raceId]);

        if (result.affectedRows > 0) {
            return success(res, 200, "races deleted successfully");
        }

        else {
            return failure(res, 400, "races not deleted");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}
