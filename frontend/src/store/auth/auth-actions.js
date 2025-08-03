import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosHttp";
import { jwtDecode } from "jwt-decode";


export const signUp = createAsyncThunk("auth/signUp", async (userData, { rejectWithValue }) => {

    try {

        const res = await axiosHttp.post("/sign-up", userData);
        return res.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Sign up failed" });
    }
})

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {

    try {

        const res = await axiosHttp.post("/login", credentials);

        const token = res.data.token
        const decoded = jwtDecode(token);

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('tokenExpiry', decoded.exp * 1000);
        sessionStorage.setItem('user', JSON.stringify(res.data.data));
        return res.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
})


