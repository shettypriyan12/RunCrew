import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axiosHttp from '../../../utils/axiosHttp';
import c from './ResetPassword.module.css';
import { Container } from 'react-bootstrap';

const ResetPassword = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const { token } = useParams();
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const initialValues = {
        password: '',
        confirm: ''
    };

    const validationSchema = Yup.object({
        password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
        confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm your password')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await axiosHttp.post("/reset-password", {
                token,
                password: values.password
            });

            setMsg(res.data.message);
            resetForm();

            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={c.resetPass}>
            <Container className={c.resetForm}>
                <h1 data-aos="fade-down" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="1000">Reset Password</h1>

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
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="New Password"
                                        className={c.inp}
                                        autoComplete="new-password"
                                    />
                                    <span className={c.togglePassword} onClick={() => setShowPassword(p => !p)}>
                                        {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                                    </span>
                                </div>
                                <ErrorMessage name="password" component="div" className={c.error} />
                            </div>

                            <div className={c.field}>
                                <div className={c.input}>
                                    <Field
                                        type={showConfirm ? "text" : "password"}
                                        name="confirm"
                                        placeholder="Confirm Password"
                                        className={c.inp}
                                        autoComplete="new-password"
                                    />
                                    <span className={c.togglePassword} onClick={() => setShowConfirm(p => !p)}>
                                        {showConfirm ? <BsEyeFill /> : <BsEyeSlashFill />}
                                    </span>
                                </div>
                                <ErrorMessage name="confirm" component="div" className={c.error} />
                            </div>

                            <button type="submit" className={c.submit} disabled={isSubmitting}>
                                {isSubmitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </Form>
                    )}
                </Formik>

                {msg && <p className={c.done}>{msg}</p>}
            </Container>
        </section>
    );
};

export default ResetPassword;
