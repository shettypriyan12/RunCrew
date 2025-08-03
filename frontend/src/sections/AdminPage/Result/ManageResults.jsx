
import React, { useEffect, useState } from 'react';
import {
    Box, CircularProgress, Typography, IconButton, Tooltip,
    Modal, Button, TextField, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResults, deleteResult, updateResult } from '../../../store/eventResults/results-action';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import c from './ManageResults.module.css';
import AddResultForm from './AddResult/AddResultForm';
import AddIcon from '@mui/icons-material/Add';


const modalStyle = {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, bgcolor: 'background.paper',
    boxShadow: 24, borderRadius: 2, p: 4,
};

const ManageResults = () => {
    const dispatch = useDispatch();
    const allResults = useSelector(state => state.results.allResults);
    const allStatus = useSelector(state => state.results.allStatus);
    const allErr = useSelector(state => state.results.allErr);

    const [showAddResultForm, setShowAddResultForm] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [editData, setEditData] = useState({
        finish_time: '',
        status: '',
        ranking: ''
    });

    useEffect(() => {
        dispatch(getAllResults());
    }, [dispatch]);

    const handleView = (row) => {
        setSelectedResult(row);
        setViewModal(true);
    };

    const handleEditOpen = (row) => {
        setSelectedResult(row);
        setEditData({
            finish_time: row.status === 'Completed' ? row.finish_time : '',
            status: row.status,
            ranking: row.status === 'Completed' ? row.ranking : ''
        });
        setEditModal(true);
    };


    const handleEditSubmit = () => {
        dispatch(updateResult({
            result_id: selectedResult.result_id,
            data: editData
        })).then(() => {
            dispatch(getAllResults());
            setEditModal(false);
        });
    };

    const handleDelete = (row) => {
        if (window.confirm('Are you sure you want to delete this result?')) {
            dispatch(deleteResult(row.result_id)).then(() => {
                dispatch(getAllResults());
            });
        }
    };

    const columns = [
        { field: 'result_id', headerName: 'ID', width: 70 },
        { field: 'full_name', headerName: 'Name', width: 130 },
        { field: 'event_name', headerName: 'Event', width: 150 },
        {
            field: 'finish_time',
            headerName: 'Finish Time',
            width: 130,
            renderCell: (params) => (
                params.row.status === 'Completed' && params.row.finish_time
                    ? params.row.finish_time
                    : 'N/A'
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => params.row.status
        },
        {
            field: 'ranking',
            headerName: 'Rank',
            width: 80,
            renderCell: (params) => (
                params.row.status === 'Completed' && params.row.ranking
                    ? params.row.ranking
                    : 'N/A'
            )
        },
        {
            field: 'recorded_at', headerName: 'Recorded At', width: 190,
            renderCell: (params) =>
                params.value ? format(new Date(params.value), 'MMMM do yyyy, h:mm a') : 'N/A',
        },
        {
            field: 'actions', headerName: 'Actions', width: 150, sortable: false,
            renderCell: (params) => (
                <>
                    <Tooltip title="View">
                        <IconButton onClick={() => handleView(params.row)}>
                            <VisibilityIcon fontSize="small" sx={{ color: '#4169E1' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditOpen(params.row)}>
                            <EditIcon fontSize="small" sx={{ color: '#FFD700' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    ];


    if (allStatus === 'pending') return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
    if (allStatus === 'rejected') return <Typography color="error">Error: {allErr}</Typography>;

    return (
        <section className={c.manageResults}>
            <div className={c.dataTable} style={{ height: 400 }}>
                <div className={c.tpHead}>
                    <h1>Event Results</h1>
                    <div className={c.addButton}>
                        <Tooltip title="Add Result">
                            <IconButton color="primary" onClick={() => setShowAddResultForm((prev) => !prev)}
                            >
                                <AddIcon /> ADD RESULT
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <DataGrid
                    rows={allResults}
                    columns={columns}
                    getRowId={(row) => row.result_id}
                    pageSize={5}
                    disableRowSelectionOnClick
                    hideFooterSelectedRowCount
                />


                {showAddResultForm && <AddResultForm />}

                <Modal open={viewModal} onClose={() => setViewModal(false)}>
                    <Box
                        sx={{
                            ...modalStyle,
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
                            Result Details
                        </Typography>

                        <Box className={c.detailContainer}>
                            <div className={c.detailRow}><strong>Name:</strong> {selectedResult?.full_name}</div>
                            <div className={c.detailRow}><strong>Event:</strong> {selectedResult?.event_name}</div>
                            <div className={c.detailRow}><strong>Finish Time:</strong> {selectedResult?.finish_time}</div>
                            <div className={c.detailRow}><strong>Status:</strong> {selectedResult?.status}</div>
                            <div className={c.detailRow}><strong>Ranking:</strong> {selectedResult?.ranking}</div>
                            <div className={c.detailRow}>
                                <strong>Recorded At:</strong>{' '}
                                {selectedResult?.recorded_at
                                    ? format(new Date(selectedResult.recorded_at), 'dd MMM yyyy, hh:mm a')
                                    : 'N/A'}
                            </div>
                        </Box>

                        <Box mt={3} textAlign="right">
                            <Button variant="contained" onClick={() => setViewModal(false)}>Close</Button>
                        </Box>
                    </Box>
                </Modal>


                <Modal open={editModal} onClose={() => setEditModal(false)}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6">Edit Result</Typography>
                        <TextField
                            label="Finish Time (HH:MM:SS)"
                            value={editData.finish_time}
                            onChange={(e) => setEditData({ ...editData, finish_time: e.target.value })}
                            fullWidth sx={{ mb: 2 }}
                            disabled={editData.status !== 'Completed'}
                            required={editData.status === 'Completed'}
                        />
                        <TextField
                            select
                            label="Status"
                            value={editData.status}
                            onChange={(e) => {
                                const newStatus = e.target.value;
                                setEditData(prev => ({
                                    ...prev,
                                    status: newStatus,
                                    finish_time: newStatus === 'Completed' ? prev.finish_time : '',
                                    ranking: newStatus === 'Completed' ? prev.ranking : ''
                                }));
                            }}
                            fullWidth sx={{ mb: 2 }}
                        >
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="DNF">DNF</MenuItem>
                            <MenuItem value="DNS">DNS</MenuItem>
                        </TextField>

                        <TextField
                            label="Ranking"
                            type="number"
                            value={editData.ranking}
                            onChange={(e) => setEditData({ ...editData, ranking: e.target.value })}
                            fullWidth sx={{ mb: 2 }}
                            disabled={editData.status !== 'Completed'}
                            required={editData.status === 'Completed'}
                        />
                        <Button variant="contained" onClick={handleEditSubmit}>Update</Button>
                    </Box>
                </Modal>
            </div>

        </section >
    );
};

export default ManageResults;
