import { createSlice } from '@reduxjs/toolkit';
import { createOrder, verifyPayment, recordPayment, getPayments, deletePayments } from './payment-actions';

const initialPaymentState = {
    payments: [],
    order: null,
    status: 'idle',
    deleteStatus:'idle',
    error: null,
    deleteErr: null,
    verificationMessage: null,
    verifying: false,
    recording: false,
    recordMessage: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState: initialPaymentState,
    reducers: {
        resetPaymentStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.verificationMessage = null;
            state.order = null;
            state.verifying = false;
            state.recording = false;
            state.recordMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPayments.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.payments = action.payload;
            })
            .addCase(getPayments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

            .addCase(createOrder.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

            .addCase(verifyPayment.pending, (state) => {
                state.verifying = true;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.verifying = false;
                state.verificationMessage = action.payload;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.verifying = false;
                state.error = action.payload;
            })

            .addCase(recordPayment.pending, (state) => {
                state.recording = true;
            })
            .addCase(recordPayment.fulfilled, (state, action) => {
                state.recording = false;
                state.recordMessage = action.payload;
            })
            .addCase(recordPayment.rejected, (state, action) => {
                state.recording = false;
                state.error = action.payload;
            })

            .addCase(deletePayments.pending, (state) => {
                state.deleteStatus = "pending";
                state.deleteErr = null;
            })
            .addCase(deletePayments.fulfilled, (state, action) => {
                state.deleteStatus = 'fulfilled';
            })
            .addCase(deletePayments.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteErr = action.payload;
            });
    },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;

