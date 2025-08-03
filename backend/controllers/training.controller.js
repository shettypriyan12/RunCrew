import { db } from "../index.js";
import { eventCatModel } from "../models/eventCat.model.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { success, failure } from "../response.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./public/uploads")) {
            fs.mkdirSync("./public/uploads");
        }
        cb(null, './uploads');
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

export const addTraining = async (req, res) => {

    const uploadSingle = upload.single("img");

    uploadSingle(req, res, async function (err) {
        if (err) return res.status(400).json({ success: false, message: err.message });

        const { cat_id, name, start, end, cost, img, location } = req.body;
        const filename = req.file ? `/uploads/${req.file.filename}` : null;
        const sql = `INSERT INTO training (cat_id, name, start, end, cost, img, location) values (?, ?, ?, ?, ?, ?, ?)`;

        try {
            await eventCatModel.validate({ cat_id, name, start, end, cost, img: filename, location }, { abortEarly: false });

            const [result] = await db.query(sql, [cat_id, name, start, end, cost, filename, location]);

            if (result.affectedRows > 0) {
                return success(res, 201, "Training created successfully", { cat_id, name, start, end, cost, img: filename, location });
            }
            else {
                return failure(res, 400, "Training not created");
            }

        }
        catch (err) {
            if (err.name === "ValidationError") {
                failure(res, 400, "Validation failed");
            }

            failure(res, 500, "Something went wrong");
        }
    })

}

export const getTrainings = async (req, res) => {
    const sql = `SELECT * FROM training`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "Training fetched successfully", result);
        }

        else {
            return failure(res, 400, "Training not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const getTraining = async (req, res) => {
    const trainingId = req.params.training_id;
    const sql = `SELECT * FROM training WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [trainingId]);

        if (result.length > 0) {
            success(res, 200, "Training fetched successfully", result);
        }

        else {
            return failure(res, 400, "Training not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const updateTraining = async (req, res) => {
    const trainingId = req.params.training_id;
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

    const sql = `UPDATE training SET ${updates.join(", ")} WHERE id = ?`;
    values.push(trainingId);

    try {
        // await eventCatModel.validate({ cat_id, name, start, end, cost, img, location }, { abortEarly: false });   

        const [result] = await db.query(sql, values);

        if (result.affectedRows > 0) {
            return success(res, 200, "Training updated successfully", req.body);
        } else {
            return failure(res, 400, "Training not updated");
        }
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}


export const deleteTraining = async (req, res) => {
    const trainingId = req.params.training_id;
    const sql = `DELETE FROM training WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [trainingId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: "Training deleted successfully",
                success: true,
            });
        }

        else {
            return failure(res, 400, "Training not deleted");
        }
    }
    catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}
