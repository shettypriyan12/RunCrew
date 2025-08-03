import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addEventAll, getAllEvents } from '../../../../store/eventsAll/events-actions';
import { getCategories } from '../../../../store/categories/categories-action';
import * as Yup from 'yup';
import { format } from 'date-fns';
import c from './AddEvent.module.css';

const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    customCategory: Yup.string().when("category", (category, schema) => {
        return category === "new"
            ? schema.required("Custom category name is required")
            : schema.notRequired();
    }),
    event_name: Yup.string().required("Event name is required"),
    start: Yup.string().required("Start date is required"),
    end: Yup.string().required("End date is required"),
    cost: Yup.string().required("Cost is required"),
    location: Yup.string().required("Location is required"),
});

const AddEvent = ({ onClose }) => {
    const dispatch = useDispatch();
    const { event: categories } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <section className={`${c.addEventTable} card p-4`}>
            <h5 className="mb-3">Add New Event</h5>

            <Formik
                initialValues={{
                    category: '',
                    customCategory: '',
                    event_name: '',
                    start: '',
                    end: '',
                    cost: '',
                    location: '',
                    tags: '',
                    img: null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formattedStart = format(new Date(values.start), 'yyyy-MM-dd HH:mm:ss');
                    const formattedEnd = format(new Date(values.end), 'yyyy-MM-dd HH:mm:ss');

                    const formData = new FormData();
                    formData.append('name', values.event_name);
                    formData.append('start', formattedStart);
                    formData.append('end', formattedEnd);
                    formData.append('cost', values.cost);
                    formData.append('location', values.location);
                    formData.append('tags', values.tags);
                    const categoryToSend = values.category === 'new' ? values.customCategory : values.category;
                    formData.append('category', categoryToSend);
                    if (values.img instanceof File) {
                        formData.append('img', values.img);
                    }

                    dispatch(addEventAll(formData)).then(() => {
                        dispatch(getAllEvents());
                        onClose();
                    });
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, setFieldValue }) => (
                    <Form>

                        {/* Category select */}
                        <div className="mb-3">
                            <label className="form-label">Type of event</label>
                            <Field as="select" className="form-select" name="category" onChange={handleChange}>
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.category}>{cat.category}</option>
                                ))}
                                <option value="new">+ Add new category</option>
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>

                        {/* Custom category */}
                        {values.category === "new" && (
                            <div className="mb-3">
                                <label className="form-label">New Category Name</label>
                                <Field type="text" name="customCategory" className="form-control" />
                                <ErrorMessage name="customCategory" component="div" className="text-danger" />
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Event Name</label>
                            <Field type="text" name="event_name" className="form-control" />
                            <ErrorMessage name="event_name" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Start Date & Time</label>
                            <Field type="datetime-local" name="start" className="form-control" />
                            <ErrorMessage name="start" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">End Date & Time</label>
                            <Field type="datetime-local" name="end" className="form-control" />
                            <ErrorMessage name="end" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Cost</label>
                            <Field type="text" name="cost" className="form-control" />
                            <ErrorMessage name="cost" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <Field type="text" name="location" className="form-control" />
                            <ErrorMessage name="location" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Tags (comma separated)</label>
                            <Field type="text" name="tags" className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Thumbnail</label>
                            <input
                                type="file"
                                className="form-control"
                                name="img"
                                accept="image/*"
                                onChange={(event) => setFieldValue("img", event.currentTarget.files[0])}
                            />
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Add Event</button>
                        </div>

                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default AddEvent;

