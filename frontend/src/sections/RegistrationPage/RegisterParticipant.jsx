import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import AOS from 'aos';
import "aos/dist/aos.css";
import * as Yup from 'yup';
import c from './RegisterParticipant.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerParticipant } from '../../store/registration/registration-actions.js';
import { Container } from 'react-bootstrap';
import { participantActions } from '../../store/registration/registration-slice.js';
import { createOrder, recordPayment, verifyPayment } from '../../store/payments/payment-actions.js';
import { loadRazorpay } from '../../utils/loadRazorpay.js';


const RegisterParticipant = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const event = location.state?.event;
    // console.log(event);


    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.participant);

    const [user_id, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const tokenUser = JSON.parse(sessionStorage.getItem('user'));
        if (tokenUser) {
            setUserId(tokenUser.id);
            setUserName(tokenUser.name || '');
            setUserNumber(tokenUser.phone || '');
            setUserEmail(tokenUser.email || '');
        }
    }, []);

    const initialValues = {
        full_name: userName || '',
        email: userEmail || '',
        phone: userNumber || '',
        dob: '',
        gender: '',
        category: event?.event_type || '',
        event_name: event?.event_name || '',
        amount: event?.cost,
        country: '',
        state: '',
        city: '',
        pincode: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        medical_condition: ''
    };

    const validationSchema = Yup.object({
        full_name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().required('Required'),
        dob: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        event_name: Yup.string().required('Required'),
        amount: Yup.string().required('Required'),
        emergency_contact_name: Yup.string().required('Required'),
        emergency_contact_phone: Yup.string().required('Required')
    });

    const dollarAmount = event?.cost;
    const inrAmount = Math.round((dollarAmount * import.meta.env.VITE_USD_TO_INR) / 5);
    // const razorpayAmount = inrAmount * 100;
    // console.log(inrAmount);
    const isFreeEvent = event?.cost === 0 || String(event?.cost).toLowerCase() === "free";

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!user_id) {
            alert("You must be logged in to register.");
            setSubmitting(false);
            return;
        }

        const participantData = {
            ...values,
            user_id,
            cat_id: event?.cat_id,
            event_id: event?.event_id,
            start: event?.start,
            is_paid: false
        };

        if (isFreeEvent) {
            try {
                await dispatch(registerParticipant({ ...participantData, is_paid: true })).unwrap();
                resetForm();
                navigate(`/event/${event?.event_name}`, { state: { paid: true } });
            } catch (err) {
                alert("Failed to register for free event.");
            } finally {
                setSubmitting(false);
            }
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setSubmitting(false);
            return;
        }

        try {
            const registerResult = await dispatch(registerParticipant(participantData)).unwrap();
            const participant_id = registerResult.participant_id;

            const orderResult = await dispatch(createOrder({ amount: inrAmount, participant_id })).unwrap();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderResult.amount,
                currency: orderResult.currency,
                order_id: orderResult.id,
                name: event?.event_name,
                description: `Registering for ${event?.event_name}`,
                handler: async function (response) {

                    const paymentPayload = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        participant_id,
                        amount: inrAmount,
                        currency: 'INR',
                    };

                    try {
                        const verifyRes = await dispatch(verifyPayment(paymentPayload)).unwrap();

                        if (verifyRes.valid) {
                            await dispatch(recordPayment(paymentPayload)).unwrap();

                            resetForm();
                            navigate(`/event/${event?.event_name}`, { state: { paid: true } });
                        } else {
                            alert("Payment verification failed. Please contact support.");
                            setSubmitting(false);
                        }
                    } catch (err) {
                        alert("Error during payment verification. Please try again.");
                        setSubmitting(false);
                    }
                },
                prefill: {
                    name: values.full_name,
                    email: values.email,
                    contact: values.phone,
                },
                notes: {
                    user_id,
                    event_id: event?.event_id,
                },
                theme: {
                    color: "#1E1E1E",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            alert("Payment initiation failed.");
            setSubmitting(false);
        }
    };

    const loading = status === "pending";

    useEffect(() => {
        if (status === "fulfilled" || status === "rejected") {
            const timer = setTimeout(() => {
                dispatch(participantActions.resetStatus());
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [status, dispatch]);

    return (
        <section className={c.registerParticipant}>
            <Container className={c.registerForm}>
                <h1 data-aos="fade-down" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="1000">Participant Registration</h1>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Full Name: </label>
                                    <Field type="text" name="full_name" className={c.inp} />
                                </div>
                                <ErrorMessage name="full_name" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Email: </label>
                                    <Field type="email" name="email" className={c.inp} />
                                </div>
                                <ErrorMessage name="email" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Phone: </label>
                                    <Field type="text" name="phone" className={c.inp} />
                                </div>
                                <ErrorMessage name="phone" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Date of Birth: </label>
                                    <Field type="date" name="dob" className={c.inp} />
                                </div>
                                <ErrorMessage name="dob" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Gender: </label>
                                    <Field as="select" name="gender" className={c.select}>
                                        <option className={c.opt} value="">Select Gender</option>
                                        <option className={c.opt} value="Male">Male</option>
                                        <option className={c.opt} value="Female">Female</option>
                                        <option className={c.opt} value="Other">Other</option>
                                    </Field>
                                </div>
                                <ErrorMessage name="gender" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Category: </label>
                                    <Field type="text" name="category" className={c.inp} disabled />
                                </div>
                                <ErrorMessage name="category" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Event Name: </label>
                                    <Field type="text" name="event_name" className={c.inp} disabled />
                                </div>
                                <ErrorMessage name="event_name" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Country: </label>
                                    <Field type="text" name="country" className={c.inp} />
                                </div>
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>State: </label>
                                    <Field type="text" name="state" className={c.inp} />
                                </div>
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>City: </label>
                                    <Field type="text" name="city" className={c.inp} />
                                </div>
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Pincode: </label>
                                    <Field type="text" name="pincode" className={c.inp} />
                                </div>
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Emergency Contact Name: </label>
                                    <Field type="text" name="emergency_contact_name" className={c.inp} />
                                </div>
                                <ErrorMessage name="emergency_contact_name" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <label>Emergency Contact Phone: </label>
                                    <Field type="text" name="emergency_contact_phone" className={c.inp} />
                                </div>
                                <ErrorMessage name="emergency_contact_phone" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.text}>
                                    <label>Medical Condition (if any): </label>
                                    <Field as="textarea" name="medical_condition" className={c.inp}
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <button type="submit" className={c.submit} disabled={isSubmitting || loading}>
                                {isSubmitting || loading
                                    ? (isFreeEvent ? "Processing..." : "Opening payment portal...")
                                    : (isFreeEvent ? "Register for Free" : "Pay with RazorPay")}
                            </button>
                        </Form>
                    )}
                </Formik>

                {status === "fulfilled" && (
                    <p className="text-success mt-3">Participant registered successfully!</p>
                )}

                {status === "rejected" && (
                    <p className="text-danger mt-3">{error}</p>
                )}

            </Container>
        </section>
    );
};

export default RegisterParticipant;
