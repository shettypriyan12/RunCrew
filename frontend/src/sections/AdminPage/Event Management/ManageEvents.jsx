import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
// import { Box, CircularProgress, Typography, IconButton, Tooltip, Modal, Button } from '@mui/material';
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Modal, Button, Row, Col, Image, Container } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteEventAll, getAllEvents, updateEventAll } from '../../../store/eventsAll/events-actions';
import { format, parseISO } from 'date-fns';

import c from './ManageEvents.module.css';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditEvent from './EditModal/EditEvent';
import AddEvent from './AddModal/AddEvent';


const style = {
    position:  'absolute',
    top:  '50%',
    left:  '50%',
    transform:  'translate(-50%, -50%)',
    width:  700,
    bgcolor:  'background.paper',
    boxShadow:  24,
    borderRadius:  2,
    p:  4,
};

const ManageEvents = () => {

    const [view, setView] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleView = (event) => {
        setSelectedEvent(event);
        setView(true);
    };


    const handleEdit = (event) => {
        // console.log("Editing event: ", event);
        setSelectedEvent(event);
        setEdit(true);
    };

    const handleSave = (formData) => {
        dispatch(updateEventAll({ event_id:  selectedEvent.event_id, formData })).then(() => {
            dispatch(getAllEvents());
        });
    };


    const handleDelete = (event) => {
        // console.log("Deleting: ", event);
        if (confirm("Are you sure you want to delete this event?")) {
            dispatch(deleteEventAll({ cat_id:  event.cat_id, event_id:  event.event_id }));
        }
    };

    const { events:  allEvents, allStatus, allErr } = useSelector((state) => state.events);

    const columns = [
        { field:  'id', headerName:  'ID', width:  60 },
        { field:  'event_type', headerName:  'Category', width:  100 },
        { field:  'event_name', headerName:  'Event', width:  150 },
        { field:  'start', headerName:  'From', width:  80 },
        { field:  'end', headerName:  'To', width:  80 },
        { field:  'tags', headerName:  'Tags', width:  80 },
        {
            field:  'cost', headerName:  'Price', width:  80,
            renderCell:  (params) => (
                <span>
                    {params.value === "free" ? "Free" :  `$ ${params.value}`}
                </span>
            )
        },
        { field:  'location', headerName:  'Location', width:  120 },
        {
            field:  'img', headerName:  'Image', width:  100, sortable:  false, filterable:  false,
            renderCell:  (params) => (
                <img
                    // src={params.value}
                    // alt="event"
                    src={`${import.meta.env.VITE_BACKEND_URL}${params.value}`}
                    alt={`${params.row.event_name}-img`}
                    style={{
                        width:  80,
                        height:  50,
                        objectFit:  'cover',
                        borderRadius:  4,
                    }}
                />
            ),
        }, {
            field:  'actions', headerName:  'Actions', width:  140, sortable:  false, filterable:  false,
            renderCell:  (params) => (
                <>
                    <Tooltip title="View" >
                        <IconButton onClick={() => handleView(params.row)}>
                            <VisibilityIcon fontSize="small" sx={{ color:  '#4169E1' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditIcon fontSize="small" sx={{ color:  '#FFD700' }} />
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
    ]

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    const rows = Array.isArray(allEvents)
        ? allEvents.map((event) => ({
            ...event,
            id:  event.id,
            event_id:  event.event_id,
            cat_id:  event.cat_id,
            start:  event.start ? format(parseISO(event.start), 'MMM dd, yyyy h: mm a') :  '',
            end:  event.end ? format(parseISO(event.end), 'MMM dd, yyyy h: mm a') :  '',
        }))
        :  [];

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
                Error:  {allErr?.message || "Failed to fetch users"}
            </Typography>
        );
    }

    return (
        <>
            <section className={c.manageEvent}>
                <div className={c.dataTable} style={{ height:  500 }}>
                    <div className={c.tpHead}>
                        <h1>Manage Events</h1>
                        <div className={c.addButton}>
                            <Tooltip title="Add Event">
                                <IconButton onClick={() => setShowAddForm(prev => !prev)}>
                                    <AddIcon /> ADD EVENT
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <DataGrid rows={rows} columns={columns} pageSize={5}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        // disableColumnMenu
                        hideFooterSelectedRowCount
                    />
                </div>
                {showAddForm && (
                    <AddEvent onClose={() => setShowAddForm(false)} />

                )}

                <div>
                    {/* View Modal */}
                    <Modal show={view} onHide={() => setView(false)} centered size="lg">
                        <Modal.Body className="p-0">
                            <Row className={`${c.viewContent} g-0`}>

                                <Col md={5} className="position-relative">
                                    <Image
                                        src={`${import.meta.env.VITE_BACKEND_URL}${selectedEvent?.img}`}
                                        alt={`${selectedEvent?.event_name}-img`}
                                        fluid
                                        style={{
                                            height:  500,
                                            objectFit:  'cover',
                                            borderTopLeftRadius:  '0.3rem',
                                            borderBottomLeftRadius:  '0.3rem',
                                        }}
                                    />
                                    <div
                                        style={{
                                            position:  'absolute',
                                            bottom:  0,
                                            width:  '100%',
                                            background:  'rgba(0, 0, 0, 0.5)',
                                            color:  '#fff',
                                            padding:  '0.5rem 1rem',
                                            textAlign:  'center',
                                        }}
                                    >
                                        <h5 className={`${c.viewHead} mb-0`}>{selectedEvent?.event_name}</h5>
                                    </div>
                                </Col>

                                <Col md={7} className="p-4">
                                    <div className={c.rbody} >
                                        <h5 className={`${c.head} mb-3`}>{selectedEvent?.role} Event Details</h5>
                                        <p><strong>📌 Category : </strong> {selectedEvent?.event_type}</p>
                                        <p><strong>🕒 Start : </strong> {selectedEvent?.start}</p>
                                        <p><strong>⏱ End : </strong> {selectedEvent?.end}</p>
                                        <p><strong>🏷 Tags : </strong> {selectedEvent?.tags}</p>
                                        <p><strong>💰 : </strong> {selectedEvent?.cost === 'free' ? 'Free' :  `$${selectedEvent?.cost}`}</p>
                                        <p><strong>📍 : </strong> {selectedEvent?.location}</p>

                                        <div className="text-end">
                                            <Button className={c.close} onClick={() => setView(false)}>
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                </div>

                {/* Edit Events */}
                <EditEvent show={edit} onHide={() => setEdit(false)} event={selectedEvent} onSave={handleSave} />


            </section>
        </>
    )
}

export default ManageEvents;