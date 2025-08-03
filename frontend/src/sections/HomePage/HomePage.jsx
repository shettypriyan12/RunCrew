import React, { useEffect } from 'react';
import classes from './Homepage.module.css';
import MarathonSlider from './MarathonSlider/MarathonSlider';
import Section2 from './Section2/Section2';
import Causes from './Causes/Causes';
import Service from './ServiceSection/Service';
import Schedule from './Schedules/Schedule';
import RouteMap from './RouteMap/RouteMap';
import Booking from './Booking/Booking';
import Brand from './BrandIcons/Brand';
import ContactForm from '../../Components/ContactForm/ContactForm';

const HomePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={classes.homepage}>
            <MarathonSlider />
            <Section2 />
            <Causes />
            <Service />
            <Schedule />
            <RouteMap />
            <Booking />
            <ContactForm bg="white" left="#F7F8F9" />
            <Brand />
        </div>
    )
}

export default HomePage;