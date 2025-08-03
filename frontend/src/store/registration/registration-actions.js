import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosHttp from '../../utils/axiosHttp';

export const registerParticipant = createAsyncThunk('participant/register', async (participantData, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post('/register', participantData);

        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to register");
    }
}
);


export const getAllParticipants = createAsyncThunk('participant/getAll', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.get('/register');

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch participants');
    }
});

export const getUserRegistrations = createAsyncThunk( "participants/getUserRegistrations", async (user_id, { rejectWithValue }) => {
        try {
            const res = await axiosHttp.get(`/register/${user_id}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch registrations");
        }
    }
);

export const updateParticipant = createAsyncThunk('participant/update', async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.put(`/register/${id}`, updatedData);
        return { id, data: res.data.data };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to update participant");
    }
});

export const deleteParticipant = createAsyncThunk('participant/delete', async (id, { rejectWithValue }) => {
    try {
        await axiosHttp.delete(`/register/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to delete participant");
    }
});