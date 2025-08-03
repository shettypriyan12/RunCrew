
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './ContactForm2.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { FaRegUser } from "react-icons/fa";
import { TfiEmail, TfiPencil } from "react-icons/tfi";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Container } from 'react-bootstrap';
import { PiTelegramLogoLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";
import AOS from 'aos'
import "aos/dist/aos.css";


const ContactForm2 = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const [showCheckboxToast, setShowCheckboxToast] = useState(false);
    const [showGeneralError, setShowGeneralError] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email").required("This field is required."),
        phone: Yup.string().required("This field is required"),
        subject: Yup.string().required("This field is required"),
        message: Yup.string().required("This field is required."),
        agree: Yup.boolean().oneOf([true], "Please accept the terms of our Privacy Policy."),
    });

    return (
        <section className={classes.contactform}>
            <Container fluid="md" className={classes.container}>
                <div className={classes.contactformleft}
                // data-aos="fade-right" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="1700" 
                >
                    <div className={classes.title1}>
                        <p>contact us</p>
                        <h1>have questions? <br /> get in touch!</h1>
                    </div>
                    <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                    <div className={classes.location}>
                        <IoLocationOutline />
                        <p>785 15h Street, Office 478 Berlin</p>
                    </div>
                    <div className={classes.phone}>
                        <CiMobile3 />
                        <a href="tel:+49123456789">
                            <h5>+1 800 555 25 69</h5>
                        </a>
                    </div>
                    <div className={classes.omail}>
                        <TfiEmail />
                        <a href="mailto:info@email.com" className={classes.mail}>
                            <p>info@email.com</p>
                        </a>
                    </div>

                </div>
                <div className={classes.contactformrght} >
                    <Formik
                        initialValues={{ name: '', email: '', phone: '', subject: '', message: '', agree: false }}

                        validationSchema={validationSchema}

                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));

                                axios.post('http://localhost:5000/v1/runcrew/contact', values)
                                    .then(res => {
                                        // console.log(res);
                                        resetForm();
                                    })
                                    .catch(err => console.error(err));

                                setSubmitting(false);
                            }, 400);
                            setTimeout(() => setMessageSent(true), 5000)
                        }}
                    >
                        {({ isSubmitting, validateForm, setTouched, values, handleSubmit, }) => (
                            <Form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setShowCheckboxToast(false);
                                    setShowGeneralError(false);

                                    if (!values.agree) {
                                        setShowCheckboxToast(true);
                                        setTimeout(() => setShowCheckboxToast(false), 4000);
                                        return;
                                    }

                                    const errors = await validateForm();
                                    if (Object.keys(errors).length > 0) {
                                        setTouched({ name: true, email: true, phone: true, subject: true, message: true, agree: true }, false);
                                        setShowGeneralError(true);
                                        return;
                                    }

                                    handleSubmit(e);
                                }}
                            >
                                <div className={classes.outerfield}>
                                    <div className={classes.field}>
                                        <div className={`${classes.input} `}>
                                            <FaRegUser />
                                            <Field type="text" name="name" placeholder="Name" className={classes.inp} autoComplete="name" />
                                        </div>
                                        <ErrorMessage name="name" component="div" className={classes.error} />
                                    </div>

                                    <div className={classes.field}>
                                        <div className={`${classes.input} `}>
                                            <TfiEmail />
                                            <Field type="email" name="email" placeholder="Email Address" className={classes.inp} autoComplete="email" />
                                        </div>
                                        <ErrorMessage name="email" component="div" className={classes.error} />
                                    </div>
                                </div>

                                <div className={classes.outerfield}>
                                    <div className={classes.field}>
                                        <div className={`${classes.input} `}>
                                            <LiaPhoneVolumeSolid />
                                            <Field type="text" name="phone" placeholder="Phone" className={classes.inp} autoComplete="phone" />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className={classes.error} />
                                    </div>

                                    <div className={classes.field}>
                                        <div className={`${classes.input} `}>
                                            <IoInformationCircleOutline />
                                            <Field type="text" name="subject" placeholder="Subject" className={classes.inp} autoComplete="subject" />
                                        </div>
                                        <ErrorMessage name="subject" component="div" className={classes.error} />
                                    </div>
                                </div>

                                <div className={classes.field}>
                                    <div className={`${classes.text} `}>
                                        <TfiPencil />
                                        <Field as="textarea" name="message" rows={3} cols={50}
                                            placeholder="How can we help you? Feel free to get in touch!"
                                            className={classes.inp} autoComplete="off" />
                                    </div>
                                    <ErrorMessage name="message" component="div" className={classes.error} />
                                </div>

                                <button type="submit" className={classes.submit} disabled={isSubmitting} >
                                    <PiTelegramLogoLight /> Get in touch
                                </button>
                                <div className={classes.field}>
                                    <div className={classes.check}>
                                        <Field type="checkbox" name="agree" id="agree" autoComplete="off" />
                                        <label htmlFor="agree">
                                            I agree that my data is <u>collected and stored</u>
                                        </label>
                                    </div>
                                    {/* <ErrorMessage name="agree" component="div" className={classes.toast} /> */}
                                </div>

                                {showGeneralError && (
                                    <div className={classes.generalError}>
                                        One or more fields have an error. Please check and try again.
                                    </div>
                                )}

                                {showCheckboxToast && (
                                    <div className={classes.toast}>
                                        Please accept the terms of our Privacy Policy.
                                    </div>
                                )}

                                {messageSent && (
                                    <div className={classes.sent}>
                                        Thank you for your message. It has been sent.
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>


            </Container>
        </section>
    );
};

export default ContactForm2;
