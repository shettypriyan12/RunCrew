import React from 'react'
import classes from "./CircleLoader.module.css"

const CircleLoader = () => {
    return (
        <div className={`${classes.loading}`}>
            <div className={classes.loader}></div>
        </div>
    )
}

export default CircleLoader;