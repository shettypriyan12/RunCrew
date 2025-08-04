import { useEffect, useState } from 'react'
import classes from './SingleEvent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getAllEvents, getEventByName } from '../../../../store/eventsAll/events-actions';
import { Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { HiCalendarDateRange } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import CircleLoader from '../../../../Components/Loader/CircleLoader';

const SingleEvent = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dslugify = (name) => name.trim().replace(/-/gi, ' ');
    const event1 = useSelector(state => state.events.searchedEvents);
    const status1 = useSelector(state => state.events.searchStatus);
    const event2 = useSelector(state => state.events.events);
    const status2 = useSelector(state => state.events.allStatus);

    // console.log(event1);
    const dispatch = useDispatch();

    const { ename } = useParams();
    const eventName = dslugify(ename);

    useEffect(() => {
        if (eventName && ename) {
            dispatch(getEventByName({ eventName }))
        }
    }, [ename, dispatch]);

    useEffect(() => {
        dispatch(getAllEvents())
    }, []);


    const eNames = [...event2].sort((a, b) => new Date(a.start) - new Date(b.start)).map(d => d.event_name);

    const currentIndex = eNames.findIndex(name => name === eventName);
    const prevEvent = currentIndex === 0 ? eNames[eNames.length - 1] : eNames[currentIndex - 1];
    const nextEvent = currentIndex === eNames.length - 1 ? eNames[0] : eNames[currentIndex + 1];

    const formatDateForCalendar = (iso) => {
        const date = new Date(iso);
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    function formatOutlookDate(date) {
        return encodeURIComponent(
            new Date(date).toISOString().replace(/\.\d{3}Z$/, "+00:00")
        );
    }

    const [active, setActive] = useState(false);

    const toggleCalendar = () => setActive(d => !d);


    if (status1 == "pending") {
        return (
            <>
                <CircleLoader />
            </>
        )
    }

    if (status1 == "rejected") {
        return (
            <>
                <div className="rejected">
                    <p>something went wrong</p>
                </div>
            </>
        )
    }

    if (status1 == "fulfilled") {
        return (
            <div>
                {event1
                    .map((d, i) => (
                        <div key={i}
                            className={classes.singleEvent}
                        >
                            <Container className={`${classes.innerBox}`}>
                                <div className={classes.boxTop}>
                                    <h1>{d.event_name}</h1>
                                    <p>
                                        <HiCalendarDateRange />{' '}
                                        <time dateTime={d.start}>{format(new Date(d.start), 'MMM dd, yyyy @ h:mm a')}</time> - {' '}
                                        <time dateTime={d.end}>{format(new Date(d.end), 'MMM dd, yyyy @ h:mm a')}</time>
                                    </p>

                                    {d.cost === "free" ?
                                        (
                                            <h2>{d.cost}</h2>
                                        ) : (
                                            <h2>${d.cost}</h2>
                                        )
                                    }
                                </div>
                                <div className={classes.midBox}>
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${d.img}`} alt={`${d.event_type}-img`} />
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet, ligula condimentum tincidunt, arcu orci laoreet massa, nec sagittis elit urna in diam. Sed consectetur dolor non nulla porttitor, in scelerisque quam ultricies. Phasellus et ipsum justo. Aenean fringilla a fermentum mauris non venenatis. Praesent at nulla aliquam, fermentum ligula a eget, fermentum metus. Morbi auctor sed dui et rhoncus. Maecenas varius suscipit ipsum, vitae et pretium est mollis nec.</p>
                                <p> Nullam arcu enim, dictum at pharetra pharetra, vulputate ut eros. In ante lacus, varius quis facilisis vitae, iaculis sit amet justo. Donec hendrerit diam. Pellentesque egestas risus a cursus nisl aliquam malesuada. Donec suscipit posuere fringilla. Vivamus tristique, odio non efficitur malesuada, purus quam dictum elit, vitae hendrerit ex magna et urna. Nulla sed blandit ante, eu auctor felis. Vivamus ornare quam dignissim odio tincidunt a eleifend. Maecenas gravida porta purus est vestibulum. Nam ut elit massa. Etiam metus sapien, placerat eget volutpat eu, ultrices id elit. Sed vel neque ac quam molestie scelerisque nec non neque. Duis sed mi augue imperdiet eleifend. Vivamus rutrum a turpis eu porta. Donec sagittis est eleifend tortor feugiat, molestie diam dapibus. Morbi tristique at erat at efficitur. Donec efficitur, neque quis luctus et aliquet, libero erat condimentum arcu, at varius augue justo condimentum tortor.</p>

                                <div className={classes.clickies}>
                                    <div className={classes.calendar}>
                                        <button
                                            onClick={toggleCalendar}
                                            className={`${active ? classes.active : ''}`}
                                        >add to calendar <FaAngleDown /></button>
                                        {active && (
                                            <div className={classes.scheduler}>
                                                {/* <a
                                                href={`https://www.google.com/calendar/event?action=TEMPLATE&dates=${formatDateForCalendar(d.start)}/${formatDateForCalendar(d.end)}&text=${encodeURIComponent(d.event_name)}&details=View+Full+event+Description+Here%3A+%28https%3A%2F%2Fruncrew.ancorathemes.com%2Fevent%2F${encodeURIComponent(ename)}%2F%29&location=${encodeURIComponent(d.location)}&trp=false&ctz=UTC&sprop=website:https://runcrew.ancorathemes.com`}
                                                className={classes.linker}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p>Google Calendar</p>
                                            </a> */}
                                                <a
                                                    href={`https://www.google.com/calendar/event?action=TEMPLATE&dates=${formatDateForCalendar(d.start)}/${formatDateForCalendar(d.end)}&text=${encodeURIComponent(d.event_name.toUpperCase())}&details=View+Full+Event+Description+Here%3A+%28${encodeURIComponent(window.location.href)}%29&location=${encodeURIComponent(d.location)}&trp=false&ctz=UTC+0&sprop=website:https://runcrew.ancorathemes.com`}
                                                    className={classes.linker}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <p>Google Calendar</p>
                                                </a>
                                                <a
                                                    href={`webcal://runcrew.ancorathemes.com/event/${ename}/?ical=1`}
                                                    className={classes.linker}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <p>iCalendar</p>
                                                </a>
                                                {/* <a 
                                            href={`https://outlook.office.com/owa/?path=/calendar/action/compose&rrv=addevent&startdt=${formatOutlookDate(d.start)}&enddt=${formatOutlookDate(d.end)}&location=${encodeURIComponent(d.location)}&subject=${encodeURIComponent(eventName.toUpperCase())}&body=View%20Full%20Event%20Description%20Here%3A%20%28${encodeURIComponent(window.location)}%29`}
                                                className={classes.linker}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p>Outlook 365</p>
                                            </a> */}
                                                {/* <a 
                                            href={`https://outlook.office.com/owa/?path=/calendar/action/compose&rrv=addevent&startdt=${formatOutlookDate(d.start)}&enddt=${formatOutlookDate(d.end)}&location=${encodeURIComponent(d.location)}&subject=${encodeURIComponent(eventName.toUpperCase())}&body=View%20Full%20Event%20Description%20Here%3A%20https%3A%2F%2Fruncrew.ancorathemes.com%2Fevent%2F${encodeURIComponent(ename)}%2F%29`}
                                                className={classes.linker}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p>Outlook 365</p>
                                            </a> */}
                                                <a
                                                    href={`https://outlook.live.com/owa/?path=/calendar/action/compose&rrv=addevent&startdt=${formatOutlookDate(d.start)}&enddt=${formatOutlookDate(d.end)}&location=${encodeURIComponent(d.location)}&subject=${encodeURIComponent(eventName.toUpperCase())}&body=View%20Full%20Event%20Description%20Here%3A%20%28${encodeURIComponent(window.location)}%29`}
                                                    className={classes.linker}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <p>Outlook Live</p>
                                                </a>
                                                {/* <a 
                                            href={`https://outlook.live.com/owa/?path=/calendar/action/compose&rrv=addevent&startdt=${formatOutlookDate(d.start)}&enddt=${formatOutlookDate(d.end)}&location=${encodeURIComponent(d.location)}&subject=${encodeURIComponent(eventName.toUpperCase())}&body=View%20Full%20Event%20Description%20Here%3A%20https%3A%2F%2Fruncrew.ancorathemes.com%2Fevent%2F${encodeURIComponent(ename)}%2F%29`}
                                                className={classes.linker}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p>Outlook Live</p>
                                            </a> */}
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        to={`/register`}
                                        state={{ event: d }}
                                        className={classes.register}
                                    > Register</Link>
                                </div>

                                <div className={classes.deets}>
                                    <div className={classes.left1}>
                                        <div className={classes.ltop}>
                                            <h3>Details</h3>
                                            <h5>START:</h5>
                                            <p>{' '}{format(new Date(d.start), 'MMM dd, yyyy @ h:mm a')}</p>
                                            <h5>END:</h5>
                                            <p>{' '}{format(new Date(d.end), 'MMM dd, yyyy @ h:mm a')}</p>
                                            <h5>COST:</h5>
                                            <p>{d.cost}</p>
                                            <h5>EVENT CATEGORY:</h5>
                                            <p>{d.event_type}</p>
                                            <h5>EVENT TAGS:</h5>
                                            <p>
                                                {d.tags.split(",")
                                                    .map(tag => tag.trim())
                                                    .sort((a, b) => a.localeCompare(b))
                                                    .map((tag, i, arr) => (
                                                        <span key={i}>
                                                            <Link className={classes.tags}
                                                            // to={`/tags/${tag}`}
                                                            >{tag}</Link>
                                                            {i < arr.length - 1 && ', '}
                                                        </span>
                                                    ))}
                                            </p>

                                        </div>
                                        <div className={classes.lbtm}>
                                            <h3>Organizer</h3>
                                            <p>Ashton Porter</p>
                                            <h5>PHONE:</h5>
                                            <p>88001234567</p>
                                            <h5>EMAIL:</h5>
                                            <p className={classes.mail} >info@example.com</p>
                                        </div>
                                    </div>
                                    <div className={classes.rght1}>
                                        <div className={classes.rtop}>
                                            <h3>Venue</h3>

                                            <span className={classes.address}>
                                                <p>Manhattan Club</p>
                                                <p>350 5th ave</p>
                                                <p>New York, NY 10118 United States</p>
                                                <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511.3188325582278!2d-73.98616885811896!3d40.74800048240846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9ac1f1b85%3A0x7e33d1c0e7af3be4!2s350%205th%20Ave%2C%20New%20York%2C%20NY%2010118%2C%20USA!5e0!3m2!1sen!2sin!4v1749184630051!5m2!1sen!2sin" referrerPolicy="no-referrer-when-downgrade"
                                                    className={classes.google} target="_blank" rel="noopener noreferrer">+ Google Map</a>
                                            </span>

                                        </div>
                                        <div className={classes.rbtm}>
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511.3188325582278!2d-73.98616885811896!3d40.74800048240846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9ac1f1b85%3A0x7e33d1c0e7af3be4!2s350%205th%20Ave%2C%20New%20York%2C%20NY%2010118%2C%20USA!5e0!3m2!1sen!2sin!4v1749184630051!5m2!1sen!2sin" width="320" height="210" style={{ border: "0" }} allowFullScreen="" loading="lazy" className={classes.map} referrerPolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.otherEvents}>
                                    {prevEvent && (
                                        <Link
                                            to={`/event/${prevEvent.replace(/ /gi, '-')}`}
                                            className={classes.prev}>
                                            <IoIosArrowRoundBack /> {prevEvent}
                                        </Link>
                                    )}
                                    {nextEvent && (
                                        <Link
                                            to={`/event/${nextEvent.replace(/ /gi, '-')}`}
                                            className={classes.next}>
                                            {nextEvent} <IoIosArrowRoundForward />
                                        </Link>
                                    )}
                                </div>

                            </Container>
                        </div>
                    ))}
            </div>
        )
    }


}

export default SingleEvent;
