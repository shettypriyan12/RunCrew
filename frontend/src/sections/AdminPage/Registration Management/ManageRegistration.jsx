import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, IconButton, Tooltip, Modal, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { deleteParticipant, getAllParticipants } from '../../../store/registration/registration-actions';
import EditRegister from './EditRegisteration/EditRegister';
import c from './ManageRegistration.module.css';

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

const ManageRegistration = () => {
    const [view, setView] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const dispatch = useDispatch();
    const { allParticipants, allStatus, allErr } = useSelector(state => state.participant);

    useEffect(() => {
        dispatch(getAllParticipants());
    }, [dispatch]);

    const handleView = (row) => {
        setSelectedParticipant(row);
        setView(true);
    };

    const handleEdit = (participant) => {
        setSelectedParticipant(participant);
        setEdit(true);
    };

    const handleDelete = (participant) => {
        if (window.confirm('Are you sure you want to delete this registration?')) {
            dispatch(deleteParticipant(participant.id)).then(() => {
                dispatch(getAllParticipants());
            });
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'event_id', headerName: 'Event ID', width: 50 },
        { field: 'user_id', headerName: 'User ID', width: 50 },
        { field: 'event_name', headerName: 'Event Name', width: 150 },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'full_name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 120 },
        { field: 'gender', headerName: 'Gender', width: 60 },
        {
            field: 'dob', headerName: 'DOB', width: 70,
            renderCell: (params) => {
                const value = params.row.dob;
                if (!value) return 'N/A';
                try {
                    return format(new Date(value), 'dd-MM-yyyy');
                } catch {
                    return 'Invalid Date';
                }
            }
        },
        { field: 'city', headerName: 'City', width: 60 },
        { field: 'state', headerName: 'State', width: 60 },
        { field: 'emergency_contact_phone', headerName: 'Emergency Phone', width: 90 },
        { field: 'medical_condition', headerName: 'Medical Condition', width: 80 },
        {
            field: 'is_paid', headerName: 'Payment', width: 90,
            renderCell: (params) => (
                <span style={{ color: params.value ? 'green' : 'orange', fontWeight: 600 }}>
                    {params.value ? 'Success' : 'Pending'}
                </span>
            ),
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
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditIcon fontSize="small" sx={{ color: '#FFD700' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    if (allStatus === 'pending') {
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (allStatus === 'failed') {
        return (
            <Typography color="error">
                Error: {allErr?.message || 'Failed to fetch participants'}
            </Typography>
        );
    }

    return (
        <section className={c.manageRegister}>
            <div className={c.dataTable} style={{ height: 500 }}>
                <h1>Participant Registrations</h1>
                <DataGrid
                    rows={allParticipants}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
                    disableRowSelectionOnClick
                    hideFooterSelectedRowCount
                />
            </div>

            {/* View Modal */}
            {/* <Modal open={view} onClose={() => setView(false)}>
                <Box sx={style}>
                    <Typography className={c.viewHead} variant="h6" gutterBottom>Participant Details</Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Name : </strong> {selectedParticipant?.full_name}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Email : </strong> {selectedParticipant?.email}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Phone : </strong> {selectedParticipant?.phone}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Date of Birth : </strong>{" "}
                        {selectedParticipant?.dob ? format(new Date(selectedParticipant.dob), 'MMM dd, yyyy') : 'N/A'}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Gender : </strong> {selectedParticipant?.gender}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Country : </strong> {selectedParticipant?.country}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>State : </strong> {selectedParticipant?.state}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>City : </strong> {selectedParticipant?.city}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Pincode : </strong> {selectedParticipant?.pincode}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Emergency Contact Name : </strong> {selectedParticipant?.emergency_contact_name}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Emergency Contact Phone : </strong> {selectedParticipant?.emergency_contact_phone}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Medical Condition : </strong> {selectedParticipant?.medical_condition || 'None'}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>User ID : </strong> {selectedParticipant?.user_id}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Event ID : </strong> {selectedParticipant?.event_id}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Event Name : </strong> {selectedParticipant?.event_name}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Category : </strong> {selectedParticipant?.category}
                    </Typography>
                    <Typography className={c.viewBody}>
                        <strong className={c.bold}>Payment Status : </strong>
                        {selectedParticipant?.is_paid ? 'Paid' : 'Not Paid'}
                    </Typography>

                    <Box mt={2}>
                        <Button variant="contained" onClick={() => setView(false)}>Close</Button>
                    </Box>
                </Box>
            </Modal> */}

            <Modal open={view} onClose={() => setView(false)}>
                <Box sx={{ ...style, maxWidth: 600, width: '95%', maxHeight: '90vh', p: 4, borderRadius: 2, overflowY: 'auto',   }}>
                    <Typography variant="h5" className={c.viewHead} gutterBottom>
                        Participant Details
                    </Typography>

                    <Box className={c.detailContainer}>
                        <div className={c.detailRow}><strong>Name:</strong> {selectedParticipant?.full_name}</div>
                        <div className={c.detailRow}><strong>Email:</strong> {selectedParticipant?.email}</div>
                        <div className={c.detailRow}><strong>Phone:</strong> {selectedParticipant?.phone}</div>
                        <div className={c.detailRow}>
                            <strong>Date of Birth:</strong>{" "}
                            {selectedParticipant?.dob ? format(new Date(selectedParticipant.dob), 'MMM dd, yyyy') : 'N/A'}
                        </div>
                        <div className={c.detailRow}><strong>Gender:</strong> {selectedParticipant?.gender}</div>
                        <div className={c.detailRow}><strong>Country:</strong> {selectedParticipant?.country}</div>
                        <div className={c.detailRow}><strong>State:</strong> {selectedParticipant?.state}</div>
                        <div className={c.detailRow}><strong>City:</strong> {selectedParticipant?.city}</div>
                        <div className={c.detailRow}><strong>Pincode:</strong> {selectedParticipant?.pincode}</div>
                        <div className={c.detailRow}><strong>Emergency Contact Name:</strong> {selectedParticipant?.emergency_contact_name}</div>
                        <div className={c.detailRow}><strong>Emergency Contact Phone:</strong> {selectedParticipant?.emergency_contact_phone}</div>
                        <div className={c.detailRow}><strong>Medical Condition:</strong> {selectedParticipant?.medical_condition || 'None'}</div>
                        <div className={c.detailRow}><strong>User ID:</strong> {selectedParticipant?.user_id}</div>
                        <div className={c.detailRow}><strong>Event ID:</strong> {selectedParticipant?.event_id}</div>
                        <div className={c.detailRow}><strong>Event Name:</strong> {selectedParticipant?.event_name}</div>
                        <div className={c.detailRow}><strong>Category:</strong> {selectedParticipant?.category}</div>
                        <div className={c.detailRow}>
                            <strong>Payment Status:</strong> {selectedParticipant?.is_paid ? '✅ Paid' : '❌ Not Paid'}
                        </div>
                    </Box>

                    <Box mt={3} textAlign="right">
                        <Button variant="contained" onClick={() => setView(false)}>Close</Button>
                    </Box>
                </Box>
            </Modal>


            {/* Edit Modal */}
            <EditRegister show={edit} onHide={() => setEdit(false)} participant={selectedParticipant} />
        </section>
    );
};

export default ManageRegistration;





