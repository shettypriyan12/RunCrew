import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosHttp from '../../utils/axiosHttp';

export const getAllResults = createAsyncThunk('results/getAll', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.get('/results');
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch results");
    }
});

export const getUserResults = createAsyncThunk('results/getUser', async (user_id, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.get(`/results/user/${user_id}`);
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch your results");
    }
});

export const addResult = createAsyncThunk('results/add', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post('/results', data);
        return res.data.message;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to add result");
    }
});

export const updateResult = createAsyncThunk('results/update', async ({ result_id, data }, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.put(`/results/${result_id}`, data);
        return res.data.message;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to update result");
    }
});

export const deleteResult = createAsyncThunk('results/delete', async (result_id, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.delete(`/results/${result_id}`);
        return res.data.message;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to delete result");
    }
});
