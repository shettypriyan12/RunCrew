import { createSlice } from "@reduxjs/toolkit";
import { deleteParticipant, getAllParticipants, getUserRegistrations, registerParticipant, updateParticipant } from "./registration-actions";

const initialParticipantState = {
    participant: [],
    allParticipants: [],
    userRegistrations: [],
    status: 'idle',
    allStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
    allErr: null,
    updateErr: null,
    deleteErr: null,
    comment: "",
}

const participantSlice = createSlice({
    name: 'participant',
    initialState: initialParticipantState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
            state.comment = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerParticipant.pending, (state) => {
                state.status = "pending";
            })
            .addCase(registerParticipant.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.comment = "Participant registered ";
            })
            .addCase(registerParticipant.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            //get ALL Participants
            .addCase(getAllParticipants.pending, (state) => {
                state.allStatus = 'pending';
            })
            .addCase(getAllParticipants.fulfilled, (state, action) => {
                state.allStatus = 'fulfilled';
                state.allParticipants = action.payload;
            })
            .addCase(getAllParticipants.rejected, (state, action) => {
                state.status = 'rejected';
                state.allErr = action.payload;
            })
            // USER PARTICIPANTS
            .addCase(getUserRegistrations.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getUserRegistrations.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.userRegistrations = action.payload;
            })
            .addCase(getUserRegistrations.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
                //UPDATE
            .addCase(updateParticipant.pending, (state) => {
                state.updateStatus = 'pending';
            })
            .addCase(updateParticipant.fulfilled, (state, action) => {
                state.updateStatus = 'fulfilled';
                state.comment = "Participant updated successfully";
            })
            .addCase(updateParticipant.rejected, (state, action) => {
                state.updateStatus = 'rejected';
                state.updateErr = action.payload;
            })      //deleteParticipant
            .addCase(deleteParticipant.pending, (state) => {
                state.deleteStatus = 'pending';
            })
            .addCase(deleteParticipant.fulfilled, (state, action) => {
                state.deleteStatus = 'fulfilled';
                state.comment = "Participant deleted successfully";
            })
            .addCase(deleteParticipant.rejected, (state, action) => {
                state.deleteStatus = 'rejected';
                state.deleteErr = action.payload;
            })

    }
})

export const participantActions = participantSlice.actions;

export default participantSlice.reducer;