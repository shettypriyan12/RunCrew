import React, { useEffect, useRef, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import classes from './Header1.module.css';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiInstagramLogo } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { PiBeachBall } from "react-icons/pi";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header1 = () => {

    const isToken = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        setTimeout(() => {
            sessionStorage.removeItem('token');
            navigate("/")
        }, 3000)
    };

    const location = useLocation();
    const homePath = location.pathname === '/';

    const [showMenu, setShowMenu] = useState(false);

    const handleClose = () => setShowMenu(false);
    const handleShow = () => setShowMenu(true);

    const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
    const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
    const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [color, setColor] = useState(false);
    const lastScrollY = useRef(0);


    useEffect(() => {
        const handleScroll = () => {

            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY.current || currentScrollY < 70) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }

            if (currentScrollY > 400) {
                setColor(true);
            } else {
                setColor(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const [open, setOpen] = useState(false);
    const toggleProfile = () => {
        setOpen((prev) => !prev);
    }

    // for profile to be hidden when clicked outside the profile box
    const profileRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const role = useSelector((state) => state.auth.user?.role);
    
    
    return (
        <div className={`${classes.headmain} 
                ${homePath ? classes.home : classes.other}  
                ${showHeader ? classes.show : classes.hide}
                ${color ? classes.bg : classes.og}
        `} >
            <Navbar expand="md" className={`mt-0 ${classes.navbar}`}>
                <div className={`${classes.header}`}>
                    {/* <a href="/" className={classes.headericon}>
                        <img src="/images/HomePage/logo.png" alt="logo" />
                    </a> */}
                    <Navbar.Brand href="/">
                        <img src="/images/HomePage/logo.png" alt="logo"
                            width="auto"
                            height="auto"
                        />
                    </Navbar.Brand>
                    <div className={`${classes.navinfo}`}>
                        <div className={`${classes.menu}`}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav">
                                {/* Menu button */}
                                <div>
                                    <FiMenu className={classes.menubutton} onClick={handleShow} />
                                </div>
                            </Navbar.Toggle>
                            <Navbar.Collapse >
                                <Nav className={`ms-auto ${classes.list}`}>
                                    {/* <NavDropdown title="Home" id="home-nav" show={homeDropdownOpen}
                                        onMouseEnter={() => setHomeDropdownOpen(true)}
                                        onMouseLeave={() => setHomeDropdownOpen(false)} >
                                        <NavDropdown.Item href="/">Marathon</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Sports & Jogging Shop</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Running Club & Coach</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Fundraising Marathon</NavDropdown.Item>
                                    </NavDropdown> */}
                                    {/* <NavDropdown title="Page" id="page-nav" show={pagesDropdownOpen}
                                        onMouseEnter={() => setPagesDropdownOpen(true)}
                                        onMouseLeave={() => setPagesDropdownOpen(false)} >
                                        <NavDropdown.Item href="/about-us">About Us</NavDropdown.Item>
                                        <NavDropdown.Item href="/events">Events</NavDropdown.Item>
                                        <NavDropdown.Item href="/our-team">Our Team</NavDropdown.Item>
                                        <NavDropdown.Item href="/events">Online Booking</NavDropdown.Item>
                                    </NavDropdown> */}
                                    {/* <NavDropdown title="Shop" id="shop-nav" show={shopDropdownOpen}
                                        onMouseEnter={() => setShopDropdownOpen(true)}
                                        onMouseLeave={() => setShopDropdownOpen(false)}>
                                        <NavDropdown.Item href="#action/3.1">Cart</NavDropdown.Item>
                                        <NavDropdown.Item href="/cart">Checkout</NavDropdown.Item>
                                    </NavDropdown> */}
                                    <div>
                                        <NavLink className={({ isActive }) => isActive ? classes.active : ""} to="/">Home</NavLink>
                                    </div>
                                    <div>
                                        <NavLink className={({ isActive }) => isActive ? classes.active : ""} to="/about-us">About Us</NavLink>
                                    </div>
                                    <div>
                                        <NavLink className={({ isActive }) => isActive ? classes.active : ""} to="/events">Events</NavLink>
                                    </div>
                                    <div>
                                        <NavLink className={({ isActive }) => isActive ? classes.active : ""} to="/our-team">Our Team</NavLink>
                                    </div>
                                    <div>
                                        <NavLink className={({ isActive }) => isActive ? classes.active : ""} to="/contacts">Contacts</NavLink>
                                    </div>

                                </Nav>
                            </Navbar.Collapse>
                        </div>
                        {/* CART ICON */}
                        {/* {!homePath && (
                            <div className={classes.cart}
                            // onClick={}
                            >
                                <HiOutlineShoppingBag className={classes.carticon} />
                            </div>
                        )} */}
                        {/* SEARCH ICON */}
                        {/* <div className={`${classes.search}`}>
                            <FiSearch className={classes.searchicon} />
                        </div> */}
                        {/* USER ICON */}
                        <div className={`${classes.profile}`} ref={profileRef}>
                            <FaUserCircle className={classes.usericon}
                                onClick={toggleProfile}
                                onMouseEnter={toggleProfile}
                            />
                            {
                                isToken ?
                                    (
                                        open && (
                                            <div className={classes.abtpf}>
                                                { role === "user" && (
                                                    <Link to={`/profile`} >Profile</Link>
                                                )}
                                                { role === 'admin' && (
                                                    <Link to={`/admin`}>Admin Panel</Link>
                                                )}
                                                <Link onClick={handleLogout} >Logout</Link>
                                            </div>
                                        )
                                    ) : (
                                        open && (
                                            <div className={classes.abtpf}>
                                                <Link to={`/login`} >Login</Link>
                                                <Link to={`/sign-up`} >Signup</Link>
                                            </div>
                                        )
                                    )
                            }
                        </div>

                    </div>
                </div>
            </Navbar>

            <Modal show={showMenu} onHide={handleClose} fullscreen className={classes.navModal}>
                <Modal.Body className={classes.navModalBody} >
                    <div className={classes.modalContent}>
                        <button onClick={handleClose} className={classes.closeBtn}><IoCloseOutline /></button>
                        <a href="/" className={classes.headericon}>
                            <img src="/images/HomePage/logo.png" alt="logo" />
                        </a>


                        <Accordion bsPrefix={classes.menuall} flush>
                            {/* <Accordion.Item bsPrefix={classes.menuitem} eventKey="0">
                                <Accordion.Header bsPrefix={classes.menuheading}>HOME <IoIosArrowRoundForward /></Accordion.Header>
                                <Link onClick={handleClose} to={"/"}><Accordion.Body bsPrefix={classes.menubody}>Marathon</Accordion.Body></Link>
                                
                            </Accordion.Item> */}
                            {/* <Accordion.Item bsPrefix={classes.menuitem} eventKey="1">
                                <Accordion.Header bsPrefix={classes.menuheading} >PAGE <IoIosArrowRoundForward /></Accordion.Header>
                                <Link onClick={handleClose} to={"/about-us"}><Accordion.Body bsPrefix={classes.menubody}>About Us</Accordion.Body></Link>
                                <Link onClick={handleClose} to={"/events"}><Accordion.Body bsPrefix={classes.menubody}>Events</Accordion.Body></Link>
                                <Link onClick={handleClose} to={"/our-team"}><Accordion.Body bsPrefix={classes.menubody}>Our Team</Accordion.Body></Link>
                                <Link onClick={handleClose} to={"/events"}><Accordion.Body bsPrefix={classes.menubody}>Online Booking</Accordion.Body></Link>
                            </Accordion.Item> */}
                            {/* <Accordion.Item bsPrefix={classes.menuitem} eventKey="2">
                                <Accordion.Header bsPrefix={classes.menuheading}>SHOP <IoIosArrowRoundForward /></Accordion.Header>
                                <Link to={"/"}><Accordion.Body bsPrefix={classes.menubody}>Cart</Accordion.Body></Link>
                                <Link to={"/"}><Accordion.Body bsPrefix={classes.menubody}>Checkout</Accordion.Body></Link>
                            </Accordion.Item> */}
                            <NavLink to="/" onClick={handleClose} >
                                Home
                            </NavLink>
                            <NavLink to="/about-us" onClick={handleClose} >
                                About Us
                            </NavLink>
                            <NavLink to="/events" onClick={handleClose} >
                                Events
                            </NavLink>
                            <NavLink to="/our-team" onClick={handleClose} >
                                Our Team
                            </NavLink>
                            <NavLink to="/contacts" onClick={handleClose} >
                                Contacts
                            </NavLink>
                        </Accordion>

                        <div className={classes.socialsection}>
                            <div className={classes.socials}>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <RiTwitterXLine />
                                </a>
                                <a href="https://www.dribbble.com/" target="_blank" rel="noopener noreferrer">
                                    <PiBeachBall />
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <PiInstagramLogo />
                                </a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* <MenuModal1 showMenu={showMenu} setShowMenu={setShowMenu} /> */}

        </div>
    );
}

export default Header1;
