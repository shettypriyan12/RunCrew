import React, { useState, useEffect, useRef } from 'react';
import classes from './Section2.module.css';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

import { LuNotebookPen } from "react-icons/lu";
import { FaMapLocationDot, FaSuitcaseMedical, FaBottleWater } from "react-icons/fa6";
import { CgArrowLongRight } from "react-icons/cg";
import { GiShorts } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Section2 = () => {
    const [activeTab, setActiveTab] = useState(1);
    const intervalRef = useRef(null);

    const tab = [
        { id: 1, name: "Quick registration" },
        { id: 2, name: "Magnificent locations" },
        { id: 3, name: "Medical attendance" },
        { id: 4, name: "Drink stations" },
        { id: 5, name: "Comfortable apparel" }
    ];

    const data = [
        {
            id: 1,
            img: "/images/HomePage/image-18-copyright.jpg",
            icon: <LuNotebookPen />,
            text: "Quia voluptas sit aspernatur aut odit aut fugit. Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."
        },
        {
            id: 2,
            img: "/images/HomePage/image-19-copyright.jpg",
            icon: <FaMapLocationDot />,
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia. Quia voluptas sit aspernatur aut odit aut fugit. Dicta sunt explicabo."
        },
        {
            id: 3,
            img: "/images/HomePage/image-21-copyright.jpg",
            icon: <FaSuitcaseMedical />,
            text: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia. Quia voluptas sit aspernatur aut odit aut fugit."
        },
        {
            id: 4,
            img: "/images/HomePage/image-20-copyright.jpg",
            icon: <FaBottleWater />,
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia. Quia voluptas sit aspernatur aut odit aut fugit. Dicta sunt explicabo."
        },
        {
            id: 5,
            img: "/images/HomePage/image-17-copyright.jpg",
            icon: <GiShorts />,
            text: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia. Quia voluptas sit aspernatur aut odit aut fugit."
        }
    ];

    const activeData = data.find(d => d.id === activeTab);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, []);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setActiveTab(prev => (prev === tab.length ? 1 : prev + 1));
        }, 6000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleTabClick = (id) => {
        setActiveTab(id);
        startAutoSlide();
    };

    return (
        <section className={classes.section2}>
            <Container className={classes.services}>
                <div className={classes.sleft}>
                    <div className={classes.bgimg}>
                        <AnimatePresence mode="wait" >
                            <motion.img
                                key={activeData.img}
                                src={activeData.img}
                                alt={`servicesimg-${activeData.id}`}
                                className={classes.img}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: .2 }}
                                loading='lazy'
                            />
                        </AnimatePresence>
                    </div>

                    <Link to={``} className={classes.info}>
                        <div className={classes.icon}>{activeData.icon}</div>
                        <div className={classes.txt}>
                            <p>{activeData.text}</p>
                        </div>
                        <div className={classes.arrow}>
                            <h1>→</h1>
                        </div>
                    </Link>
                </div>

                <div className={classes.sright}>
                    <div className={classes.srtop}>
                        <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Wuismod tempor incidunt.</p>
                    </div>
                    <div className={classes.srbtm}>
                        {tab.map((t) => (
                            <div
                                key={t.id}
                                className={`${classes.tab} ${activeTab === t.id ? classes.active : ''}`}
                                onClick={() => handleTabClick(t.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') handleTabClick(t.id);
                                }}
                            >
                                <h2>{t.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Section2;


