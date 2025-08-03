import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosHttp";

export const getCategories = createAsyncThunk("event/fetchAll", async (_,{ rejectWithValue }) => {
    try {

        const res = await axiosHttp.get("/event");

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t get event" });
    }
})