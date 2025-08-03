import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Modal, TextField ,
        MenuItem, Select, InputLabel, FormControl} from '@mui/material';

const EditUser = ({ open, onClose, user, onSave }) => {

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

    const [editedUser, setEditedUser] = useState(user || {});

    useEffect(() => {
        setEditedUser(user || {});
    }, [user]);

    const handleChange = (e) => {
        setEditedUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = () => {
        onSave(editedUser);
        onClose();
    };


    return (
        <>
            <div>
                {/* Edit Modal  */}
                <Modal open={open} onClose={onClose}>
                    <Box sx={style}>
                        <Typography variant="h6" gutterBottom>Edit User</Typography>

                        <TextField label="Name" name="name" fullWidth margin="normal"
                            value={editedUser.name || ''} onChange={handleChange}
                        />

                        <TextField label="Email" name="email" fullWidth margin="normal"
                            value={editedUser.email || ''} onChange={handleChange}
                        />

                        <TextField label="Phone" name="phone" fullWidth margin="normal"
                            value={editedUser.phone || ''} onChange={handleChange}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                value={editedUser.role || ''}
                                label="Role"
                                onChange={handleChange}
                            >
                                <MenuItem value="user">user</MenuItem>
                                <MenuItem value="admin">admin</MenuItem>
                            </Select>
                        </FormControl>


                        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button variant="contained" onClick={handleSubmit}>Save</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default EditUser;
