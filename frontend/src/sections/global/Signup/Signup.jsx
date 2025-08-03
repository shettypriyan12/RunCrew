import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../../store/auth/auth-actions';

import c from './Signup.module.css';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Signup = () => {

    const { signUpStatus, signUpErr } = useSelector(state => state.auth);
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
    const [messageSent, setMessageSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email").required("This field is required."),
        phone: Yup.string().required("This field is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, "Password must include uppercase, lowercase, number, and special character.")
            .required("This field is required.")
    });

    return (
        <>
            <section className={c.signup}>
                <Container className={`${c.containerSignUp}`}>
                    <div className={c.signUpForm}>
                        <h1 data-aos="zoom-in" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="1000">Create your account</h1>
                        <Formik
                            initialValues={{ name: '', email: '', phone: '', password: '' }}

                            validationSchema={validationSchema}

                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                dispatch(signUp(values))
                                    .then(resAction => {
                                        if (resAction.meta.requestStatus === 'fulfilled') {
                                            setMessageSent(true);
                                            resetForm();
                                            setTimeout(() => navigate("/login"), 3000);
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
                                            setTouched({ name: true, email: true, phone: true, password: true }, false);
                                            setShowGeneralError(true);
                                            return;
                                        }

                                        handleSubmit(e);
                                    }}
                                >
                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <p>Name</p>
                                            <Field type="text" name="name" placeholder="Enter your name" className={c.inp} autoComplete="name" />
                                        </div>
                                        <ErrorMessage name="name" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <p>Email</p>
                                            <Field type="email" name="email" placeholder="Enter your email" className={c.inp} autoComplete="email" />
                                        </div>
                                        <ErrorMessage name="email" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <p>Phone</p>
                                            <Field type="text" name="phone" placeholder="Enter your phone" className={c.inp} autoComplete="phone" />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <p>Password</p>
                                            <Field type={showPassword ? "text" : "password"}
                                                name="password" placeholder="Enter your password" className={c.inp} autoComplete="password" />
                                            <span className={c.togglePassword}
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                                            </span>
                                        </div>
                                        <ErrorMessage name="password" component="div" className={c.error} />
                                    </div>

                                    {messageSent && (
                                        <div className={c.sent}>
                                            Account created successfully
                                        </div>
                                    )}

                                    {signUpStatus === 'failed' && signUpErr && (
                                        <div className={c.generalError}>{signUpErr}</div>
                                    )}

                                    <button type="submit" className={c.submit} disabled={isSubmitting || signUpStatus === 'pending'} >
                                        Sign up
                                    </button>

                                    {showGeneralError && (
                                        <div className={c.generalError}>
                                            One or more fields are empty . Fill out the details .
                                        </div>
                                    )}

                                    <div className={c.directLogin}>
                                        <Link to={`/login`}>Already have an account? Log in</Link>
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

export default Signup;