import React from 'react'
import classes from './Title1.module.css'
import { Link } from 'react-router-dom';


const Title1 = (props) => {
    return (
        <>
            <div className={classes.title1}>
                <h1>{props.page}</h1>
                <div className={classes.info}>
                    <Link to="/">HOME</Link>
                    <span>/   {props.page}</span>
                </div>
            </div>
        </>
    )
}

export default Title1;