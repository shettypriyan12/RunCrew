import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosHttp";


export const getUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.get("/user");

        // console.log(res.data.data);
        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch users" });

    }
})

export const getUserById = createAsyncThunk("users/fetchById", async (id, { rejectWithValue }) => {
    try {

        const res = await axiosHttp.get(`/user/${id}`);

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch user" });
    }
})


export const updateUser = createAsyncThunk("users/update", async (info, { rejectWithValue }) => {
    try {
        const { id, ...rest } = info;

        const res = await axiosHttp.put(`/user/${id}`, rest);

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t update user" });
    }
})

export const deleteUser = createAsyncThunk("users/delete", async (id, { dispatch, rejectWithValue }) => {
    try {

        const res = await axiosHttp.delete(`/user/${id}`);

        dispatch(getUsers());

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t delete user" });
    }
})
