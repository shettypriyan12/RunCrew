import React, { useEffect } from 'react';
import classes from './AboutSection1.module.css';
import AOS from 'aos';
import "aos/dist/aos.css";

import { Container } from 'react-bootstrap';

const AboutSection1 = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <section className={classes.abtsection1}>
                <Container className={`${classes.s1box}`} >
                    <div className={classes.s1left}>
                        <p data-aos="fade-right" data-aos-offset="100" data-aos-delay="1000" data-aos-duration="1000">overcome new distances</p>
                        <h1 data-aos="fade-right" data-aos-offset="100" data-aos-delay="1300" data-aos-duration="1000">elevate your run, triumph <span className='blue'>awaits you</span></h1>
                        <p data-aos="fade-right" data-aos-offset="100" data-aos-delay="1600" data-aos-duration="1000">Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>

                    </div>
                    <div className={classes.s1rght}>
                        <div className={classes.s1imges}
                            data-aos="fade-left" data-aos-offset="100" data-aos-delay="1000" data-aos-duration="1000">
                            <div className={classes.bgimg}>
                                <img src="/images/AboutPage/image-15-copyright.jpg" alt="runner-img15" />
                            </div>
                            <img src="/images/AboutPage/image-11-copyright.jpg" alt="runner-img11" />
                        </div>

                    </div>
                </Container>
            </section>
        </>
    )
}

export default AboutSection1;