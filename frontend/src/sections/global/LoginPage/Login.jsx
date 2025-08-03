import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/auth/auth-actions';

import c from './Login.module.css';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = () => {

    const { loginStatus, loginErr } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const [showGeneralError, setShowGeneralError] = useState(false);
    // const [messageSent, setMessageSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        emailOrPhone: Yup.string()
            .required("Email or phone is required")
            .test(
                "is-valid-email-or-phone",
                "Enter a valid email or 10-digit phone number",
                function (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^[0-9]{10}$/;
                    return emailRegex.test(value) || phoneRegex.test(value);
                }
            ),
        password: Yup.string()
            .required("This field is required.")
    });

    return (
        <>
            <section className={c.login}>
                <Container className={`${c.containerLogin}`}>
                    <div className={c.loginForm}>
                        <h1 data-aos="fade-down" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="1000">Welcome Back</h1>
                        <Formik
                            initialValues={{ emailOrPhone: '', password: '' }}

                            validationSchema={validationSchema}

                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                dispatch(login(values))
                                    .then(resAction => {
                                        if (resAction.meta.requestStatus === 'fulfilled') {
                                            // setMessageSent(true);
                                            resetForm();
                                            setTimeout(() => navigate("/"), 3000);

                                        }
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            {({ isSubmitting, validateForm, setTouched, values, handleSubmit, }) => (
                                <Form className={c.form}
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setShowGeneralError(false);

                                        const errors = await validateForm();
                                        if (Object.keys(errors).length > 0) {
                                            setTouched({ emailOrPhone: true, password: true }, false);
                                            setShowGeneralError(true);
                                            return;
                                        }

                                        handleSubmit(e);
                                    }}
                                >
                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <Field type="text" name="emailOrPhone" placeholder="Email / phone" className={c.inp} />
                                        </div>
                                        <ErrorMessage name="emailOrPhone" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <Field type={showPassword ? "text" : "password"}
                                                name="password" placeholder="Password" className={c.inp} autoComplete="password" />
                                            <span className={c.togglePassword}
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                                            </span>
                                        </div>
                                        <ErrorMessage name="password" component="div" className={c.error} />
                                    </div>

                                    <div className={c.forgotPass}>
                                        <Link to={`/forgot-password`} >Forgot password</Link>
                                    </div>

                                    {/* {messageSent && (
                                            <div className={c.sent}>
                                                Logged in successfully
                                            </div>
                                        )} */}

                                    {loginStatus === 'failed' && loginErr && (
                                        <div className={c.generalError}>{loginErr}</div>
                                    )}

                                    <button type="submit" className={c.submit} disabled={isSubmitting || loginStatus === 'pending'} >
                                        Log in
                                    </button>

                                    {showGeneralError && (
                                        <div className={c.generalError}>
                                            One or more fields are empty . Fill out the details .
                                        </div>
                                    )}

                                    <div className={c.directLogin}>
                                        <Link to={`/sign-up`}>Don't have an account? Sign up</Link>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Login;