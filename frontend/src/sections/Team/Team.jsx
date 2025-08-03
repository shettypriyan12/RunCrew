import React from 'react'

import c from './Team.module.css';
import Title1 from '../../Components/Titles/Title1/Title1';
import { PiInstagramLogo } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Container } from 'react-bootstrap';

const Team = () => {
    return (
        <>
            <section className={c.teamSection}>
                <Title1 page={'team'} />

                <Container fluid="sm" className={`${c.teams} `}>
                    <div className={c.teamCard}>
                        <div className={c.img}>
                            <img src="/images/TeamPage/image-58-570x696.jpg" alt="tc-1" />
                        </div>
                        <div className={c.rght}>
                            <div className={c.rtop}>
                                <h5>andrew walker</h5>
                                <p>running coach</p>
                                <span className={c.span}>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            </div>

                            <div className={c.socials}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <RiTwitterXLine />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <PiInstagramLogo />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className={c.teamCard}>
                        <div className={c.img}>
                            <img src="/images/TeamPage/image-59-570x696.jpg" alt="tc-2" />
                        </div>
                        <div className={c.rght}>
                            <div className={c.rtop}>
                                <h5>kate cramer</h5>
                                <p>personal coach</p>
                                <span className={c.span}>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            </div>

                            <div className={c.socials}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <RiTwitterXLine />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <PiInstagramLogo />
                                </a>
                            </div>
                        </div>
                    </div><div className={c.teamCard}>
                        <div className={c.img}>
                            <img src="/images/TeamPage/image-56-570x696.jpg" alt="tc-3" />
                        </div>
                        <div className={c.rght}>
                            <div className={c.rtop}>
                                <h5>imogen wilson</h5>
                                <p>group coach</p>
                                <span className={c.span}>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            </div>

                            <div className={c.socials}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <RiTwitterXLine />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <PiInstagramLogo />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={c.teamCard}>
                        <div className={c.img}>
                            <img src="/images/TeamPage/image-57-570x696.jpg" alt="tc-4" />
                        </div>
                        <div className={c.rght}>
                            <div className={c.rtop}>
                                <h5>miriam adrian</h5>
                                <p>instructor</p>
                                <span className={c.span}>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            </div>

                            <div className={c.socials}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <RiTwitterXLine />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <PiInstagramLogo />
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>

            </section>
        </>
    )
}

export default Team;