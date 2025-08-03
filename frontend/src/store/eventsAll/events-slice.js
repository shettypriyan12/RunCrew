import { createSlice } from '@reduxjs/toolkit';

import { addEventAll, deleteEventAll, getAllEvents, getEventByName, updateEventAll } from './events-actions';

const initialEventsState = {
    events: [],
    searchedEvents: [],
    status: 'idle',
    allStatus: 'idle',
    searchStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
    allErr: null,
    searchErr: null,
    updateErr: null,
    deleteErr: null,
    comment: ""
}

const eventsSlice = createSlice({
    name: 'allEvent',
    initialState: initialEventsState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addEventAll.pending, (state) => {
                state.status = "pending";
            })
            .addCase(addEventAll.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.comment = "Event added successfully";
            })
            .addCase(addEventAll.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "rejected";
            })

            .addCase(getAllEvents.pending, (state) => {
                state.allStatus = "pending";
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.allStatus = "fulfilled";
                state.events = action.payload;
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.allErr = action.payload;
                state.allStatus = "rejected";
            })

            .addCase(getEventByName.pending, (state) => {
                state.searchStatus = "pending";
            })
            .addCase(getEventByName.fulfilled, (state, action) => {
                state.searchStatus = "fulfilled";
                state.searchedEvents = action.payload;
            })
            .addCase(getEventByName.rejected, (state, action) => {
                state.searchErr = action.payload;
                state.searchStatus = "rejected";
            })

            .addCase(updateEventAll.pending , (state)=>{
                state.updateStatus = "pending";
            })
            .addCase(updateEventAll.fulfilled , (state, action)=>{
                state.updateStatus = "fulfilled";
            })
            .addCase(updateEventAll.rejected , (state, action)=>{
                state.updateStatus = "rejected";
                state.updateErr = action.payload;
            })

            .addCase(deleteEventAll.pending , (state)=>{
                state.deleteStatus = "pending";
            })
            .addCase(deleteEventAll.fulfilled , (state, action)=>{
                state.deleteStatus = "fulfilled";
                state.comment = "Event data deleted successfully";
            })
            .addCase(deleteEventAll.rejected , (state, action)=>{
                state.deleteStatus = "rejected";
                state.deleteErr = action.payload;
            })
    }
})

export const eventsActions = eventsSlice.actions;

export default eventsSlice.reducer;