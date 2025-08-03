import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addResult, getAllResults } from '../../../../store/eventResults/results-action';

const statusOptions = ['Completed', 'DNF', 'DNS'];

const AddResultForm = () => {
    const dispatch = useDispatch();

    const [participantId, setParticipantId] = useState('');
    const [finishTime, setFinishTime] = useState('');
    const [status, setStatus] = useState('Completed');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!participantId || (status === 'Completed' && !finishTime)) {
            setError('Participant ID and finish time are required.');
            return;
        }

        setError(null);

        const data = {
            participant_id: participantId,
            finish_time: (status === 'Completed') ? finishTime : null,
            status
        };

        try {
            await dispatch(addResult(data)).unwrap();

            dispatch(getAllResults());
            setParticipantId('');
            setFinishTime('');
            setStatus('Completed');
        } catch (err) {
            setError(err || 'Failed to add result');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ my: 3, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Add Event Result</Typography>

            <TextField
                label="Participant ID"
                type="number"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Finish Time (HH:mm:ss)"
                type="text"
                value={finishTime}
                onChange={(e) => setFinishTime(e.target.value)}
                placeholder="e.g. 01:23:45"
                fullWidth
                margin="normal"
                required={status === 'Completed'}
                disabled={status !== 'Completed'}
            />

            <TextField
                select
                label="Status"
                value={status}
                onChange={(e) => {
                    const value = e.target.value;
                    setStatus(value);
                    if (value !== 'Completed') {
                        setFinishTime(''); 
                    }
                }}
                fullWidth
                margin="normal"
            >
                {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </TextField>

            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Result
            </Button>
        </Box>
    );
};

export default AddResultForm;

