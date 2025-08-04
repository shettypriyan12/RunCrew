import { db } from "../index.js";
import { eventModel } from "../models/event.model.js";
import multer from "multer";
import path from "path";
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

export const addEvent = async (req, res) => {
    // const db = req.db;
    const { category } = req.body;

    const sql = `INSERT INTO event (category) values (?)`;

    try {
        await eventModel.validate({ category }, { abortEarly: false });

        const [result] = await db.query(sql, [category]);

        if (result.affectedRows > 0) {
            return success(res, 201, "Event created successfully", { category });
        }

        // Fallback if nothing was inserted
        else {
            return failure(res, 400, "Event not created");
        }

    }
    catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
};

export const getEvents = async (req, res) => {
    const sql = `SELECT * FROM event`;

    try {
        const [result] = await db.query(sql);

        if (result.length > 0) {
            success(res, 200, "Event fetched successfully", result);
        }


        else {
            return failure(res, 400, "Event not found");
        }
    }
    catch (err) {
        failure(res, 500, "Something went wrong");
    }
};

export const getEvent = async (req, res) => {
    const eventId = req.params.event_id;
    const sql = `SELECT * FROM event WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [eventId]);
        if (result.length > 0) {
            return success(res, 200, "Event fetched successfully", result);
        }

        return failure(res, 400, "Event not found");

    } catch (err) {
        failure(res, 500, "Something went wrong");
    }
};

export const updateEvent = async (req, res) => {
    const eventId = req.params.event_id;
    const { category } = req.body;

    const sql = `UPDATE event SET category = ? WHERE id = ?`;

    try {
        await eventModel.validate({ category }, { abortEarly: false });

        const [result] = await db.query(sql, [category, eventId]);

        if (result.affectedRows > 0) {
            return success(res, 200, "Event updated successfully", { category });
        }

        return failure(res, 400, "Event not found");

    } catch (err) {
        if (err.name === "ValidationError") {
            failure(res, 400, "Validation failed");
        }

        failure(res, 500, "Something went wrong");
    }
};

export const deleteEvent = async (req, res) => {
    const eventId = req.params.event_id;
    const sql = `DELETE FROM event WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [eventId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: "Event deleted successfully",
                success: true,
            });
        }

        return failure(res, 400, "Event not found");

    } catch (err) {
        failure(res, 500, "Something went wrong");
    }
};



// For all events and nested tables 

export const addEventAll = async (req, res) => {

    const uploadSingle = upload.single("img");
    uploadSingle(req, res, async function (err) {
        if (err) return res.status(400).json({ success: false, message: err.message });

        const { category, name, start, end, cost, location, tags = [] } = req.body;
        const filename = req.file ? `/event-files/${req.file.filename}` : null;

        try {
            let cat_id, table;

            const cleanCategory = category.trim().toLowerCase().replace(/\s+/g, "_");
            const [[existsCat]] = await db.query(`SELECT id, category FROM event WHERE category = ?`, [cleanCategory]);

            if (existsCat) {
                cat_id = existsCat.id;
                table = existsCat.category;
            } else {
                const [newCat] = await db.query(`INSERT INTO event (category) VALUES (?)`, [cleanCategory]);
                cat_id = newCat.insertId;
                table = cleanCategory;

                const createTableSQL = `
                    CREATE TABLE IF NOT EXISTS ${table} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        cat_id INT,
                        name VARCHAR(150),
                        start DATETIME,
                        end DATETIME,
                        cost VARCHAR(100),
                        img VARCHAR(200),
                        location VARCHAR(255),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `;
                await db.query(createTableSQL);
            }

            const insertEventSQL = `
            INSERT INTO ${table} (cat_id, name, start, end, cost, img, location) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
            const [eventResult] = await db.query(insertEventSQL, [cat_id, name, start, end, cost, filename, location]);
            const event_id = eventResult.insertId;

            const checkTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
            if (checkTags.length > 0) {
                const insertTagsSQL = `INSERT INTO tags (cat_id, event_id, tag) VALUES ?`;
                const tagValues = checkTags.map(tag => [cat_id, event_id, tag]);
                await db.query(insertTagsSQL, [tagValues]);
            }

            return success(res, 201, "Event added successfully", { event_id, table, img: filename });
        } catch (error) {
            return failure(res, 500, "Internal server error");
        }
    })

};


export const getAllEvents = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        sort = "asc",
        search = "",
        category = ""
    } = req.query;

    const offset = (page - 1) * limit;
    const sortDirection = sort.toLowerCase() === "desc" ? "DESC" : "ASC";

    try {
        const [eventTypes] = await db.query(`SELECT id AS cat_id, category FROM event`);

        if (!eventTypes.length) {
            return success(res, 200, "No event categories found", { totalCount: 0, data: [] });
        }

        const unionQueries = [];

        for (const { cat_id, category } of eventTypes) {

            const tableName = category.toLowerCase();
            const alias = tableName.slice(0, 3).toLowerCase();

            const [tableExists] = await db.query(`SHOW TABLES LIKE ?`, [tableName]);
            if (tableExists.length === 0) {
                console.warn(`⚠️ Skipping missing table: ${tableName}`);
                continue; 
            }

            const query = `
                SELECT 
                    ${cat_id} AS cat_id,
                    '${category}' AS event_type,
                    t.event_id,
                    ${alias}.name AS event_name,
                    ${alias}.start,
                    ${alias}.end,
                    ${alias}.cost,
                    ${alias}.img,
                    ${alias}.location,
                    ${alias}.created_at,
                    GROUP_CONCAT(t.tag SEPARATOR ', ') AS tags
                FROM ${tableName} ${alias}
                JOIN tags t ON t.cat_id = ${cat_id} AND t.event_id = ${alias}.id
                GROUP BY t.cat_id, t.event_id
            `;
            unionQueries.push(query);
        }

        const baseQuery = unionQueries.join(" UNION ALL ");

        const filters = [];
        const params = [];

        if (search) {
            filters.push(`(
                event_name LIKE ? OR
                location LIKE ? OR
                DATE_FORMAT(start, '%Y-%m-%d %H:%i:%s') LIKE ? OR
                cost LIKE ?
            )`);
            const likeSearch = `%${search}%`;
            params.push(likeSearch, likeSearch, likeSearch, likeSearch);
        }

        if (category) {
            filters.push(`cat_id = ?`);
            params.push(category);
        }

        const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

        // 3. Final paginated query
        const paginatedQuery = `
            SELECT * FROM (${baseQuery}) AS base
            ${whereClause}
            ORDER BY cost ${sortDirection}
            LIMIT ? OFFSET ?
        `;
        const countQuery = `
            SELECT COUNT(*) AS totalCount FROM (${baseQuery}) AS base
            ${whereClause}
        `;

        const paginatedParams = [...params, Number(limit), Number(offset)];
        const [countResult] = await db.query(countQuery, params);
        const [rows] = await db.query(paginatedQuery, paginatedParams);

        const totalCount = countResult[0]?.totalCount || 0;

        const resultWithId = rows.map((row, index) => ({
            id: offset + index + 1,
            ...row,
        }));

        return success(res, 200, "Events fetched successfully", {
            totalCount,
            page: Number(page),
            limit: Number(limit),
            data: resultWithId,
        });
    } catch (err) {
        console.error("🔥 getAllEvents error:", err);
        return failure(res, 500, "Internal server error");
    }
};


export const getGroupedEventWithTagsByName = async (req, res) => {

    const eName = req.params.event_name;
    
    const getCategoriesSQL = `SELECT id AS cat_id, category FROM event`;

    try {
        const [eventTypes] = await db.query(getCategoriesSQL);
        if (!eventTypes.length) return failure(res, 400, "No event categories found");

        const unionQueries = [];

        for (const { cat_id, category } of eventTypes) {
            const tableName = category.toLowerCase();
            const alias = category.slice(0, 3).toLowerCase();
            const query = `
                SELECT 
                    ${cat_id} AS cat_id,
                    '${tableName}' AS event_type,
                    t.event_id,
                    ${alias}.name AS event_name,
                    ${alias}.start,
                    ${alias}.end,
                    ${alias}.cost,
                    ${alias}.img,
                    ${alias}.location,
                    ${alias}.created_at,
                    GROUP_CONCAT(t.tag SEPARATOR ', ') AS tags
                FROM ${tableName} ${alias}
                JOIN tags t ON t.cat_id = ${cat_id} AND t.event_id = ${alias}.id
                GROUP BY t.cat_id, t.event_id
            `;

            unionQueries.push(query);
        }

        const baseQuery = unionQueries.join(" UNION ");

        const fullQuery = `
            SELECT * FROM (${baseQuery}) AS all_events
            WHERE event_name = ?;
        `;

        const [result] = await db.query(fullQuery, [eName]);

        if (result.length > 0) {
            return success(res, 200, "Event fetched successfully", result);
        } else {
            return failure(res, 404, "Event not found");
        }
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};


export const updateEventAll = async (req, res) => {

    const uploadSingle = upload.single("img");

    uploadSingle(req, res, async function (err) {
        if (err) return res.status(400).json({ success: false, message: err.message });

        const { cat_id, name, start, end, cost, location, tags = [] } = req.body;
        const { event_id } = req.params;

        try {
            const [[eventTypeRow]] = await db.query(`SELECT category FROM event WHERE id = ?`, [cat_id]);
            if (!eventTypeRow) return failure(res, 400, "Invalid category ID");

            const table = eventTypeRow.category.toLowerCase();

            let newImgPath = null;

            if (!req.body) {
                return failure(res, 400, "No form data received");
            }

            if (req.file) {
                const [[existsImg]] = await db.query(`SELECT img from ${table} WHERE id = ?`, [event_id]);
                const oldImgPath = existsImg?.img;

                if (oldImgPath) {
                    const cleanPath = oldImgPath.replace(/^\/event-files\//, '');
                    const fullPath = path.join('uploads', cleanPath);

                    fs.unlink(fullPath, (err) => {
                        if (err) console.warn("Old image not deleted:", err);
                    });
                }

                newImgPath = `/event-files/${req.file.filename}`;
            }

            const updateEventSQL = `
                UPDATE ${table}
                SET name = ?, start = ?, end = ?, cost = ?, location = ?
                ${newImgPath ? ', img = ?' : ''}
                WHERE id = ?
            `;

            const params = [name, start, end, cost, location];
            if (newImgPath) params.push(newImgPath);
            params.push(event_id);

            await db.query(updateEventSQL, params);

            const checkTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;

            if (checkTags.length > 0) {
                await db.query(`DELETE FROM tags WHERE cat_id = ? AND event_id = ?`, [cat_id, event_id]);
                const insertTagsSQL = `INSERT INTO tags (cat_id, event_id, tag) VALUES ?`;
                const tagValues = checkTags.map(tag => [cat_id, event_id, tag]);
                await db.query(insertTagsSQL, [tagValues]);
            }

            return success(res, 200, "Event updated successfully");
        } catch (error) {
            return failure(res, 500, "Internal server error");
        }
    })
};


export const deleteEventAll = async (req, res) => {
    const { cat_id, event_id } = req.params;

    try {
        const [eventRows] = await db.query(`SELECT category FROM event WHERE id = ?`, [cat_id]);

        if (!eventRows.length) {
            return failure(res, 404, "Event category not found");
        }

        const categoryName = eventRows[0].category.toLowerCase();

        const [[imageRow]] = await db.query(`SELECT img FROM ${categoryName} WHERE id = ?`, [event_id]);

        const imgUrl = imageRow?.img;

        if (imgUrl) {
            const cleanPath = imgUrl.replace(/^\/event-files\//, '');
            const fullImgPath = path.join('uploads', cleanPath);

            fs.unlink(fullImgPath, (err) => {
                if (err) console.warn("Could not delete old image:", err.message);
                // else console.log("Image deleted:", fullImgPath);
            });
        }

        const deleteMainQuery = `DELETE FROM ${categoryName} WHERE id = ?`;
        await db.query(deleteMainQuery, [event_id]);

        const deleteTagsQuery = `DELETE FROM tags WHERE cat_id = ? AND event_id = ?`;
        await db.query(deleteTagsQuery, [cat_id, event_id]);

        return success(res, 200, "Event deleted successfully");
    } catch (error) {
        return failure(res, 500, "Internal server error");
    }
};
