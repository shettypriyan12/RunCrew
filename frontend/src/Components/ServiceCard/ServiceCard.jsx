import React, { useEffect } from 'react'
import classes from './ServiceCard.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { BsThreeDots } from "react-icons/bs";

const ServiceCard = (props) => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            mirror: true,
        });
    }, []);

    return (
        <>
            <div data-aos="fade-up" data-aos-offset="50" data-aos-delay={props.delay} data-aos-duration="1000"
            className={classes.serviceCard}>
                <div className={classes.icon}>
                    {props.icon}
                </div>
                <h4>{props.head}</h4>
                <p>{props.text}</p>
                <div className={classes.icon2}>
                    <BsThreeDots/>
                </div>
            </div>
        </>
    )
}

export default ServiceCard;
