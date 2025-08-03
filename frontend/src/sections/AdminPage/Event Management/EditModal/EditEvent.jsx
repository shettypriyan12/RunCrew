import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../store/categories/categories-action';

const EditEvent = ({ show, onHide, event, onSave }) => {

    const { event: categories, status, error } = useSelector((state) => state.categories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, []);
    const [initialValues, setInitialValues] = useState({
        event_id: '',
        cat_id: '',
        event_name: '',
        start: '',
        end: '',
        cost: '',
        location: '',
        tags: '',
        img: null
    });

    useEffect(() => {
        if (event) {
            setInitialValues({
                event_id: event.event_id || '',
                cat_id: event.cat_id || '',
                event_name: event.event_name || '',
                start: event.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : '',
                end: event.end ? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm") : '',
                cost: event.cost || '',
                location: event.location || '',
                tags: event.tags || '',
                img: null
            });
        }
    }, [event]);

    const validationSchema = Yup.object({
        event_name: Yup.string().required('Event name is required.'),
        start: Yup.string().required('Start date/time is required.'),
        end: Yup.string().required('End date/time is required.'),
        cost: Yup.string().required('Cost is required.'),
        location: Yup.string().required('Location is required.'),
        tags: Yup.string(),
        cat_id: Yup.string().required('Category is required.'),
    });

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();

                    formData.append('event_id', values.event_id);
                    formData.append('cat_id', values.cat_id);
                    formData.append('name', values.event_name);
                    formData.append('start', values.start ? format(new Date(values.start), 'yyyy-MM-dd HH:mm:ss') : '');
                    formData.append('end', values.end ? format(new Date(values.end), 'yyyy-MM-dd HH:mm:ss') : '');
                    formData.append('cost', values.cost);
                    formData.append('location', values.location);
                    formData.append('tags', values.tags);

                    if (values.img instanceof File) {
                        formData.append('img', values.img);
                    }

                    onSave(formData);
                    onHide();
                    setSubmitting(false);
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="p-3">
                        <Modal.Body>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="cat_id">Category</label>
                                <Field as="select" name="cat_id" className="form-select">
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.category}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="cat_id" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="event_name">Event Name</label>
                                <Field type="text" name="event_name" className="form-control" />
                                <ErrorMessage name="event_name" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="start">Start Date & Time</label>
                                <Field type="datetime-local" name="start" className="form-control" />
                                <ErrorMessage name="start" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="end">End Date & Time</label>
                                <Field type="datetime-local" name="end" className="form-control" />
                                <ErrorMessage name="end" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="cost">Cost</label>
                                <Field type="text" name="cost" className="form-control" />
                                <ErrorMessage name="cost" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="location">Location</label>
                                <Field type="text" name="location" className="form-control" />
                                <ErrorMessage name="location" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="tags">Tags (comma separated)</label>
                                <Field type="text" name="tags" className="form-control" />
                                <ErrorMessage name="tags" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="img">Thumbnail</label>
                                <input
                                    type="file"
                                    name="img"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={(e) => setFieldValue('img', e.currentTarget.files[0])}
                                />
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>Cancel</Button>
                            <Button type="submit" variant="primary" disabled={isSubmitting}>Save</Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default EditEvent;
