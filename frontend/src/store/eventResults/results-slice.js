import { createSlice } from '@reduxjs/toolkit';
import { getAllResults, getUserResults, addResult, updateResult, deleteResult } from './results-action';

const initialResultState = {
    results: [],
    allResults: [],
    userResults: [],
    status: 'idle',
    allStatus: 'idle',
    error: null,
    allErr: null,
    message: null,
};

const resultsSlice = createSlice({
    name: 'results',
    initialState: initialResultState,
    reducers: {
        resetResultStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllResults.pending, (state) => {
                state.allStatus = 'pending';
            })
            .addCase(getAllResults.fulfilled, (state, action) => {
                state.allStatus = 'fulfilled';
                state.allResults = action.payload;
            })
            .addCase(getAllResults.rejected, (state, action) => {
                state.allStatus = 'rejected';
                state.allErr = action.payload;
            })

            .addCase(getUserResults.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getUserResults.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.userResults = action.payload;
            })
            .addCase(getUserResults.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

            .addCase(addResult.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addResult.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.message = action.payload;
            })
            .addCase(addResult.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

            .addCase(updateResult.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateResult.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.message = action.payload;
            })
            .addCase(updateResult.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

            .addCase(deleteResult.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteResult.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.message = action.payload;
            })
            .addCase(deleteResult.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

export const resultsActions = resultsSlice.actions;
export default resultsSlice.reducer;
