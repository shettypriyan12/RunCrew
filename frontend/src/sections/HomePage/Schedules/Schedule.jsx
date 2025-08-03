import React, { useEffect, useState } from 'react'
import classes from './Schedule.module.css';

import SinfoCard from './SinfoCard/SinfoCard';
import AOS from 'aos'
import "aos/dist/aos.css";

import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../store/eventsAll/events-actions';
import CircleLoader from '../../../Components/Loader/CircleLoader';
import { startOfToday } from 'date-fns';

const tabsData = [
    {
        id: 1,
        label: 'Day #1 - Mar 06.2026',

    },
    {
        id: 2,
        label: 'Day #2 - May 08.2026',
    },
    {
        id: 3,
        label: 'Day #3 - Sep 04.2026',
    }
];

const Schedule = () => {

    const today = startOfToday();

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const [activeTab, setActiveTab] = useState(1);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.allStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(getAllEvents()), 1000)
    }, [])

    // console.log(events);    


    if (status == "pending") {
        return (
            <>
                <div className={classes.schedule}>
                    <div className={classes.shead}>
                        <div style={{ transform: "skewX(-21deg)" }}>
                            <h1 data-aos="fade-right" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="2000">
                                <span>miles marked by events</span><span>, triumph defined</span>
                            </h1>
                        </div>
                    </div>
                    <div className={`${classes.container}`}>
                        {
                            isMobile ?
                                (
                                    <div className={classes.sinfo}>
                                        {tabsData.map((tab) => (
                                            <div key={tab.id} className={classes.tabBlock}>
                                                <div
                                                    className={`${classes.tab} ${activeTab === tab.id ? classes.active : ''}`}
                                                    onClick={() => setActiveTab(tab.id)}
                                                >
                                                    {tab.label}
                                                </div>
                                                {activeTab === tab.id && (
                                                    <div className={classes.content}>
                                                        <CircleLoader />
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className={classes.sinfo}>
                                        <div className={classes.tabs}>
                                            {tabsData.map((tab) => (
                                                <div
                                                    key={tab.id}
                                                    className={`${classes.tab} ${activeTab === tab.id ? classes.active : ''}`}
                                                    onClick={() => setActiveTab(tab.id)}
                                                >
                                                    {tab.label}
                                                </div>
                                            ))}
                                        </div>

                                        <div className={classes.content}>
                                            <CircleLoader />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div >
            </>
        )
    }

    if (status == "rejected") {
        return (
            <>
                <div className={classes.schedule}>
                    <div className={classes.shead}>
                        <div style={{ transform: "skewX(-21deg)" }}>
                            <h1 data-aos="fade-right" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="2000">
                                <span>miles marked by events</span><span>, triumph defined</span>
                            </h1>
                        </div>
                    </div>
                    <div className={`${classes.container}`}>
                        {
                            isMobile ?
                                (
                                    <div className={classes.sinfo}>
                                        {tabsData.map((tab) => (
                                            <div key={tab.id} className={classes.tabBlock}>
                                                <div
                                                    className={`${classes.tab} ${activeTab === tab.id ? classes.active : ''}`}
                                                    onClick={() => setActiveTab(tab.id)}
                                                >
                                                    {tab.label}
                                                </div>
                                                {activeTab === tab.id && (
                                                    <div className={classes.content}>
                                                        <p>Something Went Wrong ! ! !</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className={classes.sinfo}>
                                        <div className={classes.tabs}>
                                            {tabsData.map((tab) => (
                                                <div
                                                    key={tab.id}
                                                    className={`${classes.tab} ${activeTab === tab.id ? classes.active : ''}`}
                                                    onClick={() => setActiveTab(tab.id)}
                                                >
                                                    {tab.label}
                                                </div>
                                            ))}
                                        </div>

                                        <div className={classes.content}>
                                            <p>Something Went Wrong ! ! !</p>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div >
            </>
        )
    }


    if (status == "fulfilled") {
        return (
            <>
                <div className={classes.schedule}>
                    <div className={classes.shead}>
                        <div style={{ transform: "skewX(-21deg)" }}>
                            <h1 data-aos="fade-right" data-aos-offset="200" data-aos-delay="1000" data-aos-duration="2000">
                                <span>miles marked by events</span><span>, triumph defined</span>
                            </h1>
                        </div>
                    </div>
                    <div className={`${classes.container}`}>
                        {
                            isMobile ?
                                (
                                    <div className={classes.sinfo}>
                                        {tabsData.map((tab) => (
                                            <div key={tab.id} className={classes.tabBlock}>
                                                <div
                                                    className={`${classes.tab} ${activeTab === tab.id ? classes.active : ''}`}
                                                    onClick={() => setActiveTab(tab.id)}
                                                >
                                                    {tab.label}
                                                </div>
                                                {activeTab === tab.id && (
                                                    <div className={classes.content}>
                                                        {events
                                                            .filter(d => d.cat_id === tab.id && new Date(d.start) >= today)
                                                            .map(d => (
                                                                <SinfoCard key={d.id} data={d} />
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className={classes.sinfo}>
                                        <div className={classes.tabs}>
                                            {tabsData.map((tab) => (
                                                <div
                                                    key={tab.id}
                                                    className={`${classes.tab} ${activeTab === tab.id ? classes.active : ''}`}
                                                    onClick={() => setActiveTab(tab.id)}
                                                >
                                                    {tab.label}
                                                </div>
                                            ))}
                                        </div>

                                        <div className={classes.content}>
                                            {events
                                                .filter((d) => d.cat_id === activeTab && new Date(d.start) >= today)
                                                .map((d) => (
                                                    <SinfoCard key={d.id} data={d} />
                                                ))}
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div >
            </>
        )
    }
}

export default Schedule;