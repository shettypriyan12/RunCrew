import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, IconButton, Tooltip, Modal, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import c from './ManagePayments.module.css';
import { deletePayments, getPayments } from '../../../store/payments/payment-actions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const ManagePayments = () => {
    const [view, setView] = useState(false);
    // const [edit, setEdit] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const dispatch = useDispatch();
    const { payments, status, error } = useSelector(state => state.payment);

    // console.log(payments);


    useEffect(() => {
        dispatch(getPayments());
    }, [dispatch]);

    const handleView = (row) => {
        setSelectedPayment(row);
        setView(true);
    };

    // const handleEdit = (payment) => {
    //     setSelectedPayment(payment);
    //     setEdit(true);
    // };

    const handleDelete = (payment) => {
        if (window.confirm('Are you sure you want to delete this registration?')) {
            dispatch(deletePayments(payment.payment_id)).then(() => {
                dispatch(getPayments());
            });
        }
    };

    const columns = [
        { field: 'payment_id', headerName: 'ID', width: 40 },
        { field: 'participant_id', headerName: 'Event ID', width: 70 },
        { field: 'participant_name', headerName: 'Name', width: 110 },
        { field: 'event_name', headerName: 'Event Name', width: 100 },
        { field: 'razorpay_order_id', headerName: 'Order-id', width: 120 },
        { field: 'razorpay_payment_id', headerName: 'Receipt', width: 110 },
        { field: 'currency', headerName: 'Currency', width: 40 },
        { field: 'amount', headerName: 'Price', width: 60 },
        {
            field: 'is_paid', headerName: 'Payment Status', width: 100,
            renderCell: (params) => (
                <span style={{ color: params.value ? 'green' : 'orange', fontWeight: 600 }}>
                    {params.value ? 'Success' : 'Pending'}
                </span>
            ),
        },
        {
            field: 'paid_at', headerName: 'Time', width: 140,
            renderCell: (params) =>
                params.value ? format(new Date(params.value), 'MMMM do yyyy, h:mm a') : 'N/A',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <Tooltip title="View">
                        <IconButton onClick={() => handleView(params.row)}>
                            <VisibilityIcon fontSize="small" sx={{ color: '#4169E1' }} />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditIcon fontSize="small" sx={{ color: '#FFD700' }} />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    if (status === 'pending') {
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <Typography color="error">
                Error: {error?.message || 'Failed to fetch participants'}
            </Typography>
        );
    }

    return (
        <section className={c.managePayment}>
            <div className={c.dataTable} style={{ height: 500 }}>
                <h1>Payment Registrations</h1>
                <DataGrid
                    rows={payments}
                    columns={columns}
                    getRowId={(row) => row.payment_id}
                    pageSize={5}
                    disableRowSelectionOnClick
                    hideFooterSelectedRowCount
                />
            </div>

            {/* View */}
            <Modal open={view} onClose={() => setView(false)}>
                <Box
                    sx={{
                        ...style,
                        maxWidth: 600,
                        width: '95%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        p: 4,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Typography variant="h5" className={c.viewHead} gutterBottom>
                        Payment Details
                    </Typography>

                    <Box className={c.detailContainer}>
                        <div className={c.detailRow}><strong>Name:</strong> {selectedPayment?.participant_name}</div>
                        <div className={c.detailRow}><strong>Event Name:</strong> {selectedPayment?.event_name}</div>
                        <div className={c.detailRow}><strong>Order ID:</strong> {selectedPayment?.razorpay_order_id}</div>
                        <div className={c.detailRow}><strong>Transaction Receipt:</strong> {selectedPayment?.razorpay_payment_id}</div>
                        <div className={c.detailRow}><strong>Currency:</strong> {selectedPayment?.currency}</div>
                        <div className={c.detailRow}><strong>Amount:</strong> ₹{selectedPayment?.amount}</div>
                        <div className={c.detailRow}>
                            <strong>Payment Status:</strong>{' '}
                            {selectedPayment?.is_paid ? <span className={c.paid}>✅ Paid</span> : <span className={c.notPaid}>❌ Not Paid</span>}
                        </div>
                        <div className={c.detailRow}>
                            <strong>Paid At:</strong>{' '}
                            {selectedPayment?.paid_at ? format(new Date(selectedPayment.paid_at), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                        </div>
                    </Box>

                    <Box mt={3} textAlign="right">
                        <Button variant="contained" onClick={() => setView(false)}>Close</Button>
                    </Box>
                </Box>
            </Modal>


        </section>
    );
};

export default ManagePayments;





