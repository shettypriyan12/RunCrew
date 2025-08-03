import React from 'react'
import classes from './Service.module.css';
import ServiceCard from '../../../Components/ServiceCard/ServiceCard';

import { PiSneakerMoveThin } from "react-icons/pi";
import { GiJourney } from "react-icons/gi";
import { LiaMedalSolid } from "react-icons/lia";
import { GiBullseye } from "react-icons/gi";

const Service = () => {
    return (
        <>
            <section className={classes.s4}>
                <div className={classes.serviceSection}>
                    <ServiceCard icon={<PiSneakerMoveThin />} head={"Personal Growth"}
                        text={"Sed do eisum tempor"} delay={"50"} />
                    <ServiceCard icon={<GiJourney />} head={"Supporting a charity"}
                        text={"Sed do eisum tempor"} delay={"100"} />
                    <ServiceCard icon={<LiaMedalSolid />} head={"Honoring a loved one"}
                        text={"Sed do eisum tempor"} delay={"150"} />
                    <ServiceCard icon={<GiBullseye />} head={"Promoting health"}
                        text={"Sed do eisum tempor"} delay={"200"} />
                </div>
            </section>
        </>
    )
}

export default Service;