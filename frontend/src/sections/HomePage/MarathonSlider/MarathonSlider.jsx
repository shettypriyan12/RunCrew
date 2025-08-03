
import React, { useEffect } from 'react'
import Slider from "react-slick"
import classes from './MarathonSlider.module.css'
import { motion } from 'framer-motion';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MarathonSlider = () => {


    var settings = {
        // dots: true, 
        fade: true,
        infinite: true,
        speed: 1000,
        waitForAnimate: false,
        focusOnSelect: false,
        // className: "center",
        // centerMode: true,
        // centerPadding: "60px",
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: false,
        
    };
    return (
        <div className={classes.marathonSlider}>
            <Slider  {...settings}>
                <div className={classes.sliderImage}>
                    <img src="/images/HomePage/image-27-copyright.jpg" alt="introimg1" loading='lazy' />
                    <div className={classes.info1}>
                        <motion.h4
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5.2  }}
                        >
                            PARTICIPATE IN THE ULTIMATE MARATHON
                        </motion.h4>
                        <motion.h1
                            style={{ overflow: "hidden", whiteSpace: "nowrap"}}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5.2  }}
                        >
                            FUNDRAISING MARATHON
                        </motion.h1>
                    </div>
                </div>
                <div className={classes.sliderImage}>
                    <img src="/images/HomePage/image-28-copyright.jpg" alt="introimg2" loading='lazy' />
                    <div className={classes.info2}>
                        
                        <motion.h4
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5.2 }}
                        >
                            JOIN THE ULTIMATE MARATHON
                        </motion.h4>
                        <motion.h1
                            style={{ overflow: "hidden", whiteSpace: "nowrap"}}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5.2  }}
                        >
                            RACING FOR A CAUSE
                        </motion.h1>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default MarathonSlider;