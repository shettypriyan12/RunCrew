import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Box, CircularProgress, Typography, IconButton, Tooltip, Modal, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteUser, getUsers, updateUser } from '../../../store/users/users-action';

import c from './ManageUser.module.css';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const ManageUser = () => {

    const [view, setView] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleView = (user) => {
        setSelectedUser(user);
        setView(true);
    };


    const handleSave = (updatedUser) => {
        dispatch(updateUser(updatedUser)).then(() => {
            dispatch(getUsers());
        });
    }

    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    };

    const { users: userList, status, error } = useSelector((state) => state.users);

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Name', width: 140 },
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'phone', headerName: 'Contact', width: 100 },
        { field: 'role', headerName: 'Status', width: 80 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 140,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <Tooltip title="View" >
                        <IconButton onClick={() => handleView(params.row)}>
                            <VisibilityIcon fontSize="small" sx={{ color: '#4169E1' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ]

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);

    const rows = Array.isArray(userList)
        ? userList.map((user) => ({ ...user, id: user.id }))
        : [];

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
                Error: {error?.message || "Failed to fetch users"}
            </Typography>
        );
    }

    return (
        <>
            <section className={c.manageUser}>
                <div className={c.dataTable} style={{ height: 500 }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5}
                        disableRowSelectionOnClick
                        hideFooterSelectedRowCount
                    />
                </div>

                <div>
                    {/* View Modal */}
                    <Modal open={view} onClose={() => setView(false)}>
                        <Box
                            sx={{
                                width: 500,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                borderRadius: 2,
                                p: 4,
                                mx: 'auto',
                                mt: '10%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Typography variant="h5" className={c.viewHead} sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                {selectedUser?.role} Details
                            </Typography>

                            <Typography><strong className={c.bold}>👤 Name:</strong> {selectedUser?.name}</Typography>
                            <Typography><strong className={c.bold}>✉️ Email:</strong> {selectedUser?.email}</Typography>
                            <Typography><strong className={c.bold}>📞 Phone:</strong> {selectedUser?.phone}</Typography>
                            <Typography><strong className={c.bold}>🛠️ Role:</strong> {selectedUser?.role}</Typography>

                            <Box mt={3} display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={() => setView(false)}>
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                </div>




            </section>
        </>
    )
}

export default ManageUser;

