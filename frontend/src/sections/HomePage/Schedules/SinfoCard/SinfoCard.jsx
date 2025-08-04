import React from 'react';
import classes from './SinfoCard.module.css';

import { format } from 'date-fns';
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SinfoCard = ({ data }) => {

    const slugify = (name) => name.trim().replace(/\s+/gi, '-');

    return (
        <>
            <Link to={`/event/${slugify(data.event_name)}`} className={classes.singleCard}>
                <div className={classes.sinfoCard}>
                    {/* date */}
                    <div className={classes.cardleft}>
                        <h3>{' '}{format(new Date(data.start), 'dd')}</h3>
                        <p>{' '}{format(new Date(data.start), 'MMM, yyyy')}</p>
                    </div>

                    {/* center */}
                    <div className={classes.cardcenter}>
                        <div className={classes.img}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}${data.img}`} alt={data.event_name} />
                        </div>
                        <div className={classes.i1}>
                            <h4>{data.event_name}</h4>
                            <div className={classes.i2}>
                                <p>New York</p>
                                <div className={classes.i3}>
                                    <p>
                                        <HiCalendarDateRange />
                                        {' '}
                                        {format(new Date(data.start), 'MMM dd, yyyy h:mm a')} -{' '}
                                        {format(new Date(data.end), 'MMM dd, yyyy h:mm a')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* cost */}
                <div className={classes.cardright}>
                    {data.cost === "free" ?
                        (<h4 className='yellow'>
                            {data.cost}
                        </h4>)
                        :
                        (<h4 className='black'>
                            <IoTicketOutline />
                            {data.cost}
                        </h4>)
                    }
                </div>
            </Link>
        </>
    )
}

export default SinfoCard;