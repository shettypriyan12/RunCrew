import React from 'react';
import classes from './Footer.module.css';
import { Container } from 'react-bootstrap';

import { PiInstagramLogo } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { PiBeachBall } from "react-icons/pi";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className={classes.footer}>
                <Container fluid="xl" className={`${classes.footerbox}`}>
                    <div className={classes.ftop}>

                        <div className={classes.f1}>
                            <h6>the best running club</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        </div>

                        <div className={classes.f2}>
                            <h6>office</h6>
                            <div className={classes.addf2}>
                                <p>Germany —<br />785 15h Street, Office 478<br />Berlin, De 81566</p>
                            </div>
                            <a href="mailto:info@email.com" className={classes.mail}>
                                <p>info@email.com</p>
                            </a>
                            <div className={classes.phone}>
                                <a href="tel:+49123456789">
                                    <h5>+1 800 555 25 69</h5>
                                </a>
                            </div>
                        </div>

                        <div className={classes.f3}>
                            <h6>links</h6>
                            <Link to={`/`} >
                                <p>Home</p>
                            </Link>
                            {/* <Link to={`/`}>
                                <p>Services</p>
                            </Link> */}
                            <Link to={`/about-us`}>
                                <p>About Us</p>
                            </Link>
                            <Link to={`/events`}>
                                <p>Events</p>
                            </Link>
                            <Link to={`/contacts`}>
                                <p>Contacts</p>
                            </Link>
                        </div>

                        <div className={classes.f4}>
                            <h6>get in touch</h6>
                            <div className={classes.socials}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF /> <span>Facebook</span>
                                </a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <RiTwitterXLine /> <span>Twitter</span>
                                </a>
                                <a href="https://www.dribbble.com/" target="_blank" rel="noopener noreferrer">
                                    <PiBeachBall /> <span>Dribbble</span>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <PiInstagramLogo /> <span>Instagram</span>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className={classes.rights}>
                        <a href="https://ancorathemes.com/" target="_blank" rel="noopener"> AncoraThemes</a> © 2025. All rights reserved.
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer;