
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './ContactForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { FaRegUser } from "react-icons/fa";
import { TfiEmail, TfiPencil } from "react-icons/tfi";
import { Container } from 'react-bootstrap';
import { PiTelegramLogoLight, PiInstagramLogo } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { PiBeachBall } from "react-icons/pi";
import AOS from 'aos';
import "aos/dist/aos.css";


const ContactForm = (props) => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const [showCheckboxToast, setShowCheckboxToast] = useState(false);
    const [showGeneralError, setShowGeneralError] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email").required("This field is required."),
        message: Yup.string().required("This field is required."),
        agree: Yup.boolean().oneOf([true], "Please accept the terms of our Privacy Policy."),
    });

    return (
        <section className={classes.contactform} style={{backgroundColor: `${props.bg}` }}>
            <Container fluid="md" className={classes.container}>
                <div className={classes.contactformleft} style={{backgroundColor: `${props.left}` }}>
                    <h1 data-aos="fade-right" data-aos-offset="100" data-aos-delay="1000" data-aos-duration="1700">Contact form</h1>
                    <Formik
                        initialValues={{ name: '', email: '', message: '', agree: false }}

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
                                        setTouched({ name: true, email: true, message: true, agree: true }, false);
                                        setShowGeneralError(true);
                                        return;
                                    }

                                    handleSubmit(e);
                                }}
                            >
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

                                <div className={classes.field}>
                                    <div className={`${classes.text} `}>
                                        <TfiPencil />
                                        <Field as="textarea" name="message" rows={3} cols={50}
                                            placeholder="How can we help you? Feel free to get in touch!"
                                            className={classes.inp} autoComplete="off" />
                                    </div>
                                    <ErrorMessage name="message" component="div" className={classes.error} />
                                </div>

                                <div className={classes.field}>
                                    <div className={classes.check}>
                                        <Field type="checkbox" name="agree" id="agree" autoComplete="off" />
                                        <label htmlFor="agree">
                                            I agree that my submitted data is being <u>collected and stored</u>
                                        </label>
                                    </div>
                                    {/* <ErrorMessage name="agree" component="div" className={classes.toast} /> */}
                                </div>

                                <button type="submit" className={classes.submit} disabled={isSubmitting} >
                                    <PiTelegramLogoLight /> Get in touch
                                </button>

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
                <div className={classes.contactformright}
                    data-aos="fade-left" data-aos-offset="100" data-aos-delay="1000" data-aos-duration="1700" >
                    <div className={classes.title1}>
                        <p>contact us</p>
                        <h1>have questions? <br /> get in touch!</h1>
                    </div>
                    <div className={classes.title2}>
                        <p>785 15h Street, Office 478 <br /> Berlin, De 81566</p>

                        <a href="mailto:info@email.com" className={classes.mail}>
                            <p>info@mail.com</p>
                        </a>
                    </div>
                    <div className={classes.phone}>
                        <a href="tel:+49123456789">
                            <h5>+1 840 841 25 69</h5>
                        </a>
                    </div>
                    <div className={classes.socials}>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <RiTwitterXLine />
                        </a>
                        <a href="https://www.dribbble.com/" target="_blank" rel="noopener noreferrer">
                            <PiBeachBall />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <PiInstagramLogo />
                        </a>
                    </div>
                </div>

            </Container>
        </section>
    );
};

export default ContactForm;


{/*
    1 . when the submit button is clicked a div on bottom right of screen is visible showing "Please accept the terms and conditions"
    2 . when i accept the checkbox then all the input fields that are empty show their error message
    3 . when i accept the checkbox and click the submit button another error message pops saying 1 or multiple field are empty
    */}