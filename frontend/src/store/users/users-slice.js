import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUserById, getUsers, updateUser } from "./users-action";

const initialUserState = {
    users: [],
    searchedUser: [],
    status: 'idle',
    searchedStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
    searchedErr: null,
    updateErr: null,
    deleteErr: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    extraReducers: (builder) => {
        builder
            // users
            .addCase(getUsers.pending , (state) => {
                state.status = "pending";
                state.error = null;
            } )
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            }) //user
            .addCase(getUserById.pending , (state) => {
                state.searchedStatus = "pending";
                state.searchedErr = null;
            } )
            .addCase(getUserById.fulfilled, (state, action) => {
                state.searchedStatus = 'fulfilled';
                state.searchedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.searchedStatus = 'failed';
                state.searchedErr = action.payload;
            })  //update
            .addCase(updateUser.pending , (state) => {
                state.updateStatus = "pending";
                state.updateErr = null;
            } )
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateStatus = 'fulfilled';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateErr = action.payload;
            })  //delete
            .addCase(deleteUser.pending , (state) => {
                state.deleteStatus = "pending";
                state.deleteErr = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteStatus = 'fulfilled';
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteErr = action.payload;
            })  
        }
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;