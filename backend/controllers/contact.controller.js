import {db} from "../index.js";
import { contactModel } from "../models/contact.model.js";
import { success, failure } from "../response.js";

export const addContact = async (req, res) => {
    const { name , email , phone , subject , message } = req.body;
    const sql = `INSERT INTO contact_us (name , email , phone , subject , message) values (?, ?, ?, ?)`;
    try {
        await contactModel.validate({ name , email , phone , subject , message }, { abortEarly: false });

        const [result] = await db.query(sql, [name , email , phone || null  , subject || null , message]);

        if (result.affectedRows > 0) {
            return success(res, 201, "Contact created successfully", { name , email , phone , subject , message });
        }
        else {
            return failure(res, 400, "Contact not created");
        }

    }
    catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
}

export const getContacts = async (req, res) => {
    const sql = `SELECT * FROM contact_us`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "Contact fetched successfully", result);
        }

        else {
            return failure(res, 400, "Contact not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const getContact = async (req, res) => {
    const contactId = req.params.contact_id;
    const sql = `SELECT * FROM contact_us WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [contactId]);

        if (result.length > 0) {
            success(res, 200, "Contact fetched successfully", result);
        }
        else {
            return failure(res, 400, "Contact not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}

export const deleteContact = async (req, res) => {
    const contactId = req.params.contact_id;
    const sql = `DELETE FROM contact_us WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [contactId]);

        if (result.affectedRows > 0) {
            success(res, 200, "Contact deleted successfully", result);
        }
        else {
            return failure(res, 400, "Contact not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
}