import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateParticipant } from '../../../../store/registration/registration-actions';

const EditRegister = ({ show, onHide, participant }) => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        full_name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().required('Required'),
        dob: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        emergency_contact_name: Yup.string().required('Required'),
        emergency_contact_phone: Yup.string().required('Required'),
        is_paid: Yup.number().oneOf([0, 1], 'Invalid status').nullable(),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const updatedData = {
            ...participant,
            ...values,
        };

        dispatch(updateParticipant({ id: participant.id, updatedData }))
            .unwrap()
            .then(() => onHide())
            .finally(() => setSubmitting(false));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Formik
                initialValues={{
                    full_name: participant?.full_name || '',
                    email: participant?.email || '',
                    phone: participant?.phone || '',
                    dob: participant?.dob ? participant.dob.split('T')[0] : '',
                    gender: participant?.gender || '',
                    category: participant?.category || '',
                    country: participant?.country || '',
                    state: participant?.state || '',
                    city: participant?.city || '',
                    pincode: participant?.pincode || '',
                    emergency_contact_name: participant?.emergency_contact_name || '',
                    emergency_contact_phone: participant?.emergency_contact_phone || '',
                    medical_condition: participant?.medical_condition || '',
                    is_paid: typeof participant?.is_paid === 'number' ? participant.is_paid : 0
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <FormikForm>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Participant</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Field name="full_name" as={Form.Control} />
                                <ErrorMessage name="full_name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Field name="email" as={Form.Control} type="email" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Field name="phone" as={Form.Control} />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Field name="dob" as={Form.Control} type="date" />
                                <ErrorMessage name="dob" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Field name="gender" as={Form.Select}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Field name="category" as={Form.Control} disabled />
                                <ErrorMessage name="category" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Field name="country" as={Form.Control} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Field name="state" as={Form.Control} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Field name="city" as={Form.Control} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Pincode</Form.Label>
                                <Field name="pincode" as={Form.Control} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Emergency Contact Name</Form.Label>
                                <Field name="emergency_contact_name" as={Form.Control} />
                                <ErrorMessage name="emergency_contact_name" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Emergency Contact Phone</Form.Label>
                                <Field name="emergency_contact_phone" as={Form.Control} />
                                <ErrorMessage name="emergency_contact_phone" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Payment Status</Form.Label>
                                <Field name="is_paid" as={Form.Select}>
                                    <option value="">Select Status</option>
                                    <option value={0}>Pending</option>
                                    <option value={1}>Paid</option>
                                </Field>
                                <ErrorMessage name="is_paid" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Medical Condition (if any)</Form.Label>
                                <Field name="medical_condition">
                                    {({ field }) => (
                                        <Form.Control as="textarea" rows={3} {...field} />
                                    )}
                                </Field>
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    );
};

export default EditRegister;

