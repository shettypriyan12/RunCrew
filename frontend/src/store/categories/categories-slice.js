import { createSlice } from "@reduxjs/toolkit";

import { getCategories } from "./categories-action";

const initialCategoryState = {
    event: [],
    status: 'idle',
    error: null,
}

const categorySlice = createSlice({
    name: "event",
    initialState: initialCategoryState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getCategories.fulfilled , (state,action)=>{
                state.status = "fulfilled";
                state.event = action.payload;
            })
            .addCase(getCategories.rejected , (state,action)=>{
                state.status = "rejected";
                state.error = action.payload;
            })
    }
})

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;