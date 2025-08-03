import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import AOS from 'aos'
import "aos/dist/aos.css";
import { useInView } from 'react-intersection-observer';

import classes from './Booking.module.css';

const Booking = () => {

    useEffect(() => {
            AOS.init({
                duration: 2000,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
            });
        }, []);
        
    const[prize , setPrize] = useState(0);
    const [prizeAnimated, setPrizeAnimated] = useState(false);

    const { ref: prizeRef, inView : prizeInView } = useInView({
        triggerOnce: true, 
        threshold: 0.5, 
    });

    useEffect(() => {
        if (prizeInView && !prizeAnimated) {
            let num = 199;
            const prizecounter = setInterval(() => {
                if (num >= 100) {
                    setPrize(num);
                    num--;
                }
            }, 10);
            setPrizeAnimated(true);
        }
    }, [prizeInView, prizeAnimated]);
    

    const [registered , setRegistered] = useState(0);
    const [registeredAnimated , setRegisteredAnimated] = useState(false);

    const { ref: registeredRef, inView: registerInView } = useInView({
        triggerOnce: true, 
        threshold: 0.5, 
    });

    useEffect(() => {
        if (registerInView && !registeredAnimated) {
            let num = 499;
            const registercounter = setInterval(() => {
                if (num >= 400) {
                    setRegistered(num);
                    num--;
                }
            }, 10);
            setRegisteredAnimated(true);
        }
    }, [registerInView, registeredAnimated]);

    return (
        <>
            <section className={classes.s7} >
                <Container fluid="sm" className={`${classes.booking}`}>
                    <div className={classes.bookingleft}>
                        <div className={classes.bookingcontent}>

                            <p>overcome new distances</p>
                            <h1><span>testing endurance is<span className='yellow'> a major motivation</span>.</span></h1>
                            <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                            {/* <button>BOOK NOW</button> */}

                        </div>
                    </div>
                    <div className={classes.bookingright}>
                        <div className={classes.bookimg}>
                            <img src="/images/HomePage/image-02-copyright.jpg" alt="runner" />
                        </div>
                        <div className={classes.prize} ref={prizeRef}>
                            <h4>prizes for runners</h4>
                            <h1>{prize}+</h1>
                            <p>Adipiscing elit, do eiusm.</p>
                        </div>
                        <div className={classes.registered} ref={registeredRef}>
                            <h4>runners registered</h4>
                            <h1>{registered}+</h1>
                            <p>Sed eiusmod tempor.</p>
                        </div>
                    </div>
                </Container>
                <div className={classes.contacthead}>
                    <div className={classes.headbg}>
                        <motion.h2
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            // animate={{ width: "100%" }}
                            whileInView={{ width: "fit-content" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            viewport={{ once: true }}
                        >Ready</motion.h2>
                        <motion.h2
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            // animate={{ width: "100%" }}
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
            </section>
        </>
    )
}

export default Booking;
