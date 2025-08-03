import React from 'react';
import c from './AboutSection6.module.css';

const AboutSection6 = () => {
    return (
        <>
            <section className={c.abtsection6}>
                <div className={c.s6body}>
                    <div className={c.s6left}>
                        <img src="/images/AboutPage/image-45.jpg" alt="img-45" />
                    </div>
                    <div className={c.s6rght}>
                        <div className={c.rbox}>
                            <p>testimonials</p>
                            <h1>what our clients say</h1>
                            <span>
                                Ignissimos ducimus quin blandiitis praesentium voluptatem deleniti atque corrupti quos dolores et quas molestias excepturi, scint occaecatti gnissimus ducimus.
                            </span>

                            <div className={c.user}>
                                <div className={c.userimg}>
                                    <img src="/images/AboutPage/image-53-120x120.jpg" alt="" />
                                </div>
                                <div className={c.userinfo}>
                                    <h5>jenna sanders</h5>
                                    <p>joplin, MO</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default AboutSection6;