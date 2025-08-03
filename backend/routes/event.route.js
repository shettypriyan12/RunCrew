import express from 'express';

import { addEvent, deleteEvent, getEvent, getEvents, getAllEvents, updateEvent, getGroupedEventWithTagsByName, addEventAll, updateEventAll, deleteEventAll } from '../controllers/event.controller.js';
import { auth, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/events', auth, isAdmin, addEventAll);
router.get('/events', getAllEvents);
router.get('/events/:event_name', getGroupedEventWithTagsByName);
router.put('/events/:event_id', auth, isAdmin, updateEventAll);
router.delete('/events/:cat_id/:event_id', auth, isAdmin, deleteEventAll);

router.post("/event", addEvent);
router.get("/event", getEvents);
router.get("/event/:event_id", getEvent);
router.put("/event/:event_id", updateEvent);
router.delete("/event/:event_id", deleteEvent);


export default router;