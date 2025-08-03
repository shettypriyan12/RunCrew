import React, { useEffect } from 'react';
import classes from './RouteMap.module.css';
import { motion } from 'framer-motion';
import AOS from 'aos'
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';


const RouteMap = () => {

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
            <section className={classes.routemap}>
                <div className={classes.maphead}>
                    <div className={classes.headbg}>
                        <motion.h2
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            // animate={{ width: "100%" }}
                            whileInView={{ width: "fit-content" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            viewport={{ once: true }}
                        >Running</motion.h2>
                        <motion.h2
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            // animate={{ width: "100%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            viewport={{ once: true }}
                        ><i>route</i></motion.h2>
                    </div>

                    <div className={classes.headft}>
                        <div style={{ transform: "skewX(-21deg)" }}>
                            <h1 data-aos="fade-right" data-aos-offset="100" data-aos-delay="1000" data-aos-duration="2000">
                                <span>run the distance, embrace endurance</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <Link to={`/contacts`} className={classes.img}>
                    <img src="/images/HomePage/image-03-copyright-min.jpg" alt="Routemap"  />
                </Link>
            </section>
        </>
    )
}

export default RouteMap;

