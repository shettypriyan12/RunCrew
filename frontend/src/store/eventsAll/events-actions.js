import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosHttp from '../../utils/axiosHttp';

export const addEventAll = createAsyncThunk("events/add", async (formData, { dispatch, rejectWithValue }) => {

    try {
        const res = await axiosHttp.post("/events", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch(getAllEvents());

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t add event" });
    }
})

export const getAllEvents = createAsyncThunk("events/fetchAll", async (params = {}) => {

    try {
        const {
            page = 1,
            limit = 1000,
            search = "",
            sort = "asc",
            category = ""
        } = params;
        const res = await axiosHttp.get("/events", {
            params: { page, limit, search, sort, category }
        });

        // console.log(data);
        return res.data.data.data;

    } catch (err) {
        throw new Error(err);
    }
})

export const getEventByName = createAsyncThunk("events/fetchByName", async (value, { dispatch }) => {

    try {
        const { eventName } = value;

        const res = await axiosHttp.get(`/events/${eventName}`);

        return res.data.data;
    } catch (err) {
        throw new Error(err);
    }
})

export const updateEventAll = createAsyncThunk("events/update", async ({ event_id, formData }, { rejectWithValue }) => {

    try {
        const res = await axiosHttp.put(`/events/${event_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t update event" });
    }
})

export const deleteEventAll = createAsyncThunk("events/delete", async ( event, { dispatch, rejectWithValue }) => {

    const { cat_id, event_id } = event;

    try {
        const res = await axiosHttp.delete(`/events/${cat_id}/${event_id}`);

        dispatch(getAllEvents());

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t delete event details" });
    }
})