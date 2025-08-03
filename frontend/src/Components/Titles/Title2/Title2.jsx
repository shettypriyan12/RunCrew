import React from 'react'
import classes from './Title2.module.css'
import { Link } from 'react-router-dom';


const Title2 = (props) => {
    return (
        <>
            <div className={classes.title2}>
                <h1>{props.page}</h1>
                <div className={classes.info}>
                    <Link to="/">HOME</Link>
                    <span>/   {props.page}</span>
                </div>
            </div>
        </>
    )
}

export default Title2;