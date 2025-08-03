import { useEffect, useState } from 'react';
import { Formik, Field, Form , ErrorMessage } from 'formik';
import AOS from 'aos';
import "aos/dist/aos.css";
import * as Yup from 'yup';
import axiosHttp from '../../../utils/axiosHttp';
import c from './ForgotPassword.module.css'; 
import { Container } from 'react-bootstrap';

const ForgotPassword = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const [msg, setMsg] = useState('');

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await axiosHttp.post("/forgot-password", { email: values.email });
            setMsg(res.data.message);
            resetForm();
        } catch (err) {
            setMsg(err.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={c.forgotPass}>
            <Container className={c.forgotForm}>
                <h1 data-aos="fade-down" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="1000">Forgot Password</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={c.form}>
                            <div className={c.field}>
                                <div className={c.input}>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className={c.inp}
                                        autoComplete="email"
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className={c.error} />
                            </div>

                            <button type="submit" className={c.submit} disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </Form>
                    )}
                </Formik>

                {msg && <p className={c.validationSchema}>{msg}</p>}
            </Container>
        </section>
    );
};

export default ForgotPassword;
