import React from 'react'
import classes from './AboutSection3.module.css';

const AboutSection3 = () => {
    return (
        <>
            <section className={classes.abtsection3}>
                <div className={classes.s3left}>
                    <div className={classes.ltop}>
                        <div className={classes.ltup}>
                            <p>Running workouts</p>
                            <h1>Our new running programs for marathon runners</h1>
                        </div>
                        <div className={classes.ltbtm}>
                            <p>Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernaturaut odit aut fugit, sed quia consequuntur. Dicta sunt explicabo nemo.</p>
                        </div>
                    </div>
                    <div className={classes.lbtm}>
                        <div className={classes.lblft}>
                            <img src="/images/AboutPage/image-14-copyright.jpg" alt="runnerimg-14" />
                        </div>
                        <div className={classes.lbrgt}>
                            <div className={classes.lbrt}>
                                <h5>What we do</h5>
                                <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad.</p>
                            </div>
                            <div className={classes.lbrb}>
                                <h5>the opportunities</h5>
                                <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.s3rght}>
                    <img src="/images/AboutPage/image-13-copyright.jpg" alt="runnerimg-13" />
                    
                </div>
            </section>
        </>
    )
}

export default AboutSection3;