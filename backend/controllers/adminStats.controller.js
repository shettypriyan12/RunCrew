import { db } from "../index.js";
import { success, failure } from "../response.js";

export const getEventParticipantCounts = async (req, res) => {
    try {
        const sql = `
            SELECT e.event_name, COUNT(pr.id) AS count
            FROM events e
            LEFT JOIN participant_registrations pr ON e.event_id = pr.event_id
            GROUP BY e.event_id
        `;
        const [rows] = await db.query(sql);
        return success(res, 200, "Event participant counts fetched", rows);
    } catch (error) {
        console.error("Error fetching chart data:", error);
        return failure(res, 500, "Internal Server Error");
    }
};
