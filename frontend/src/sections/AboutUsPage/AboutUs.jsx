import React, { useEffect } from 'react'
import classes from './AboutUs.module.css';
import { motion } from 'framer-motion';
import AOS from 'aos'
import "aos/dist/aos.css";

import Title1 from '../../Components/Titles/Title1/Title1';
import AboutSection1 from './About1/AboutSection1';
import Service from '../HomePage/ServiceSection/Service';
import AboutSection3 from './About3/AboutSection3';
import AboutSection4 from './About4/AboutSection4';
import ContactForm from '../../Components/ContactForm/ContactForm';
import AboutSection6 from './About6/AboutSection6';


const AboutUs = () => {

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

    return (
        <>
            <section className={classes.aboutus}>
                <Title1 page="About us" />
                <AboutSection1 />
                <div className={classes.contacthead}>
                    <div className={classes.headbg}>
                        <motion.h2
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: "fit-content" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            viewport={{ once: true }}
                        >Ready</motion.h2>
                        <motion.h2
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            viewport={{ once: true }}
                        ><i>marathon</i></motion.h2>
                    </div>

                    <div className={classes.headft}>
                        <div style={{ transform: "skewX(-21deg)" }}>
                            <h1 data-aos="fade-right" data-aos-offset="100" data-aos-delay="1000" data-aos-duration="2000">
                                <span>triumph with determination</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <Service />
                <AboutSection3/>
                <AboutSection4/>
                <ContactForm bg="#F7F8F9" left="white" />
                <AboutSection6/>
            </section>
        </>
    )
}

export default AboutUs;