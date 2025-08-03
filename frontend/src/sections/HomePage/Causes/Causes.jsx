import React from 'react';

import classes from './Causes.module.css';

const Causes = () => {
    return (
        <section className={classes.s3}>
            <div className={classes.causes}>
                <div className={classes.causeSlider}>
                    <h1>
                        <span>OUR</span>
                        <span>CAUSES</span>
                    </h1>
                </div>
                <div className={classes.causeSlider}>
                    <h1>
                        <span>OUR</span>
                        <span>CAUSES</span>
                    </h1>
                </div>
                <div className={classes.causeSlider}>
                    <h1>
                        <span>OUR</span>
                        <span>CAUSES</span>
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default Causes;