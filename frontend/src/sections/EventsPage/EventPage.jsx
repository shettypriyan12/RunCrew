import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, startOfToday } from 'date-fns';
import { Col, Container, Row } from 'react-bootstrap';
import { getAllEvents } from '../../store/eventsAll/events-actions';
import c from './EventPage.module.css';

import { HiCalendarDateRange } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import { Link } from 'react-router-dom';
import CircleLoader from '../../Components/Loader/CircleLoader';


const EventPage = () => {

    // const [top , setTop ] = useState(0);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const slugify = (name) => name.replace(/ /gi, '-');
    const events = useSelector((state) => state.events.events);
    const status1 = useSelector((state) => state.events.allStatus);

    //Search filter
    const dispatch = useDispatch();
    useEffect(() => {
        const delay = setTimeout(() => {
            dispatch(getAllEvents({ search: searchQuery }));
            setPage(1);
        }, 1000);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    //Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const today = startOfToday();

    const filteredEvents = [...events]
        .filter(event => new Date(event.start) >= today)
        .sort((a, b) => new Date(a.start) - new Date(b.start));

    const grouped = filteredEvents
        .reduce((acc, event) => {
            const key = format(new Date(event.start), 'MMMM yyyy');
            if (!acc[key]) acc[key] = [];
            acc[key].push(event);
            return acc;
        }, {});

    const groupedFlat = Object.entries(grouped)
        .flatMap(([month, items]) =>
            items.map(event => ({ month, event }))
        );

    const paginatedFlat = groupedFlat.slice(startIndex, endIndex);

    const paginatedGrouped = paginatedFlat
        .reduce((acc, { month, event }) => {
            if (!acc[month]) acc[month] = [];
            acc[month].push(event);
            return acc;
        }, {});

    return (
        <>
            <section className={c.allEvents}>
                <Container className={`${c.container}`}>
                    <div className={c.searchall}>
                        <div className={c.searchbar}>
                            <IoSearchOutline />
                            <input name='searchEvent' className={c.searchEvent} type="text" placeholder='Search for events'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={c.events}>
                        {status1 === 'fulfilled' && Object.entries(paginatedGrouped).map(([month, monthEvents]) => (
                            <div key={month} className={c.eventInfo}>
                                <div className={c.head}>
                                    <h5>{month}</h5>
                                    <p></p>
                                </div>
                                {
                                    monthEvents.map((d) =>
                                        <Row className={c.singleEvent} key={d.id}>
                                            <Col xs={1} sm={1} lg={1} className={c.eleft}>
                                                <h6>{format(new Date(d.start), 'EEE')}</h6>
                                                <h3>{format(new Date(d.start), 'd')}</h3>
                                            </Col>
                                            <Col xs={11} sm={11} lg={7} className={c.emid}>
                                                <p>
                                                    <HiCalendarDateRange />{' '}
                                                    <time dateTime={d.start}>{format(new Date(d.start), 'MMM d, yyyy @ h:mm aaa')}</time> - {' '}
                                                    <time dateTime={d.end}>{format(new Date(d.end), 'MMM d, yyyy @ h:mm aaa')}</time>
                                                </p>
                                                <h3><Link to={`/event/${slugify(d.event_name)}`} >
                                                    {d.event_name}
                                                </Link></h3>
                                                <address>{d.location}</address>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet, ligula condimentum tincidunt, arcu orci laoreet massa, nec sagittis elit urna in diam. Sed consectetur dolor non nulla porttitor, in repudiandae deserunt explicabo ex reiciendis praesentium aliquid in animi laborum.
                                                </p>
                                                {d.cost === "free" ?
                                                    (
                                                        <h5>{d.cost}</h5>
                                                    ) : (
                                                        <h5>${d.cost}</h5>
                                                    )
                                                }
                                            </Col>
                                            <Col xs={9} sm={9} lg={3} className={c.erght}>
                                                <Link to={`/event/${slugify(d.event_name)}`}>
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${d.img}`} alt={`${d.event_name} img`} />
                                                </Link>
                                            </Col>
                                        </Row>
                                    )}
                            </div>
                        ))}
                        {status1 === 'fulfilled' && Object.keys(paginatedGrouped).length === 0 && (
                            <div className={c.noResult}>
                                <p><HiCalendarDateRange /> There were no results found for <b> "{searchQuery}"</b>
                                </p>
                            </div>
                        )}
                        {status1 === 'pending' && (
                            <>
                                <CircleLoader />
                            </>
                        )}
                        {status1 === 'rejected' && (
                            <>
                                <div className="rejected">
                                    <p>something went wrong</p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={c.pagination}>
                        <button className={c.prev}
                            onClick={() => {
                                setPage(p => Math.max(1, p - 1));
                                window.scrollTo(0, 0);
                            }}
                            disabled={page === 1}
                        >
                            <IoIosArrowRoundBack /> Previous
                        </button>
                        <button className={c.next}
                            onClick={() => {
                                setPage(p => p + 1);
                                window.scrollTo(0, 0);
                            }}
                            disabled={endIndex >= groupedFlat.length}
                        >
                            Next <IoIosArrowRoundForward />
                        </button>
                    </div>
                </Container>
            </section>
        </>
    )
}


export default EventPage;