import { createSlice } from "@reduxjs/toolkit";

import { signUp, login } from "./auth-actions";

const initialUserState = {
    user: JSON.parse(sessionStorage.getItem('user')) || null, 
    token: sessionStorage.getItem('token') || null,
    loginStatus: 'idle',
    signUpStatus: 'idle',
    loginErr: null,
    signUpErr: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState: initialUserState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginStatus = 'pending';
                state.loginErr = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled';
                state.user = action.payload.data;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginErr = action.payload.message;
                state.loginStatus = 'failed';
            })
            .addCase(signUp.pending, (state) => {
                state.signUpStatus = 'pending';
                state.signUpErr = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUpStatus = 'fulfilled';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.signUpErr = action.payload.message;
                state.signUpStatus = 'failed';
            });
    }
});


export const authActions = authSlice.actions;

export default authSlice.reducer;