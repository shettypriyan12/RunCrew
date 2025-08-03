import { db } from "../index.js";
import { success, failure } from "../response.js";


const recalculateRanking = async (event_id, cat_id) => {
    const participantSql = `
        SELECT id FROM participant_registrations
        WHERE event_id = ? AND cat_id = ?
    `;
    const [participants] = await db.query(participantSql, [event_id, cat_id]);
    if (participants.length === 0) return;

    const participantIds = participants.map(p => p.id);

    const getSql = `
        SELECT er.result_id
        FROM event_results er
        WHERE er.participant_id IN (?) AND er.status = 'Completed'
        ORDER BY er.finish_time ASC
    `;
    const [results] = await db.query(getSql, [participantIds]);

    const updateSql = `
        UPDATE event_results
        SET ranking = ?
        WHERE result_id = ?
    `;
    for (let i = 0; i < results.length; i++) {
        await db.query(updateSql, [i + 1, results[i].result_id]);
    }
};


export const createResult = async (req, res) => {
    const { participant_id, finish_time, status } = req.body;

    if (!participant_id || !finish_time) {
        return failure(res, 400, "Missing required fields");
    }

    try {
        const getSql = `SELECT event_id, cat_id FROM participant_registrations WHERE id = ?`;
        const [participant] = await db.query(getSql, [participant_id]);

        if (participant.length === 0) {
            return failure(res, 404, "Participant not found");
        }

        const { event_id, cat_id } = participant[0];

        const insertSql = `
            INSERT INTO event_results (participant_id, finish_time, status)
            VALUES (?, ?, ?)
        `;
        const [insertResult] = await db.query(insertSql, [
            participant_id,
            finish_time,
            status || 'Completed',
        ]);

        if (insertResult.affectedRows > 0) {
            await recalculateRanking(event_id, cat_id);
            return success(res, 201, "Result added and ranking updated");
        }

        return failure(res, 500, "Failed to add result");
    } catch (error) {
        console.error("Create result error:", error);
        return failure(res, 500, "Error while adding result");
    }
};

export const getAllResults = async (req, res) => {
    const sql = `
        SELECT 
            er.result_id,
            er.participant_id,
            pr.full_name,
            pr.event_name,
            pr.event_id, 
            pr.cat_id,
            CASE WHEN er.status = 'Completed' THEN er.finish_time ELSE NULL END AS finish_time,
            er.status,
            CASE WHEN er.status = 'Completed' THEN er.ranking ELSE NULL END AS ranking,
            er.recorded_at
        FROM event_results er
        JOIN participant_registrations pr ON er.participant_id = pr.id
        ORDER BY pr.cat_id, pr.event_id, er.ranking ASC
    `;
    try {
        const [results] = await db.query(sql);

        if (results.length > 0) {
            return success(res, 200, "Results fetched successfully", results);
        }

        return failure(res, 400, "Result not found");
    } catch (error) {
        console.error("Get results error:", error);
        return failure(res, 500, "Failed to fetch results");
    }
};


export const updateResult = async (req, res) => {
    const resultId = req.params.result_id;
    const { finish_time, status } = req.body;

    const getSql = `
    SELECT pr.event_id, pr.cat_id
    FROM event_results er
    JOIN participant_registrations pr ON er.participant_id = pr.id
    WHERE er.result_id = ?
`;

    const [rows] = await db.query(getSql, [resultId]);
    if (!rows.length) return failure(res, 404, "Result not found");

    const { event_id, cat_id } = rows[0];

    const updateSql = `
        UPDATE event_results 
        SET finish_time = ?, status = ?
        WHERE result_id = ?
    `;
    try {
        await db.query(updateSql, [finish_time, status, resultId]);
        await recalculateRanking(event_id, cat_id);
        return success(res, 200, "Result updated and ranking recalculated");
    } catch (error) {
        console.error("Update result error:", error);
        return failure(res, 500, "Failed to update result");
    }
};


export const deleteResult = async (req, res) => {
    const resultId = req.params.result_id;

    const getSql = `
    SELECT pr.event_id, pr.cat_id
    FROM event_results er
    JOIN participant_registrations pr ON er.participant_id = pr.id
    WHERE er.result_id = ?
`;

    const [rows] = await db.query(getSql, [resultId]);
    if (!rows.length) return failure(res, 404, "Result not found");

    const { event_id, cat_id } = rows[0];

    const deleteSql = `DELETE FROM event_results WHERE result_id = ?`;
    try {
        await db.query(deleteSql, [resultId]);
        await recalculateRanking(event_id, cat_id);
        return success(res, 200, "Result deleted and ranking recalculated");
    } catch (error) {
        console.error("Delete result error:", error);
        return failure(res, 500, "Failed to delete result");
    }
};


export const getUserResults = async (req, res) => {
    const userId = req.params.user_id;

    const sql = `
        SELECT 
            er.result_id,
            pr.user_id,
            pr.event_name,
            er.finish_time,
            er.status,
            er.ranking,
            er.recorded_at
        FROM event_results er
        JOIN participant_registrations pr ON er.participant_id = pr.id
        WHERE pr.user_id = ?
        ORDER BY er.recorded_at DESC
        
    `;
    try {
        const [results] = await db.query(sql, [userId]);
        if (results.length > 0) {
            return success(res, 200, "User results fetched", results);
        }

        return failure(res, 400, "Something went wrong");

    } catch (error) {
        console.error("User results error:", error);
        return failure(res, 500, "Failed to fetch user results");
    }
};

