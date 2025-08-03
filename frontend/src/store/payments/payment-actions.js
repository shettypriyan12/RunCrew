import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosHttp from '../../utils/axiosHttp';


export const getPayments = createAsyncThunk('payments/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.get('/payments');

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch payments");
    }
});

export const deletePayments = createAsyncThunk('payments/delete', async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosHttp.delete(`/payments/${id}`);

        dispatch(getPayments());
        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t delete payment" });
    }
})

export const createOrder = createAsyncThunk('payment/createOrder', async ({ amount, participant_id }, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post('/razorpay/create-order', { amount, participant_id });
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
}
);


export const verifyPayment = createAsyncThunk('payment/verifyPayment', async (paymentData, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post('/razorpay/verify-payment', paymentData);

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Payment verification failed");
    }
}
);

export const recordPayment = createAsyncThunk('payment/recordPayment', async (paymentDetails, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post('/razorpay/record-payment', paymentDetails);
        return res.data.message;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to record payment');
    }
}
);
