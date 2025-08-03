import React from 'react';
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';

import c from './Admin.module.css';
import { MdDashboard } from 'react-icons/md';
import {
    FaUsersCog,
    FaCalendarAlt,
    FaClipboardList,
    FaCreditCard,
} from 'react-icons/fa';
import { FaTrophy } from "react-icons/fa6";
import { Link, NavLink, Outlet } from 'react-router-dom';

const Admin = () => {
    return (
        <section className={c.admin}>
            <div className={c.left}>
                <Sidebar className="ps-sidebar">
                    <div className={c.home}>
                        <Link to="/">
                            <img src="/images/HomePage/logo.png" alt="Website Logo" loading="lazy" />
                        </Link>
                    </div>
                    <Menu className={c.menu}>
                        <MenuItem component={<NavLink to="/admin/dash" />} icon={<MdDashboard />}>Dashboard</MenuItem>
                        <MenuItem component={<NavLink to="/admin/user" />} icon={<FaUsersCog />}>User</MenuItem>
                        <MenuItem component={<NavLink to="/admin/events" />} icon={<FaCalendarAlt />}>Events</MenuItem>
                        {/* <SubMenu className={c.submenu} label="Registration" icon={<FaClipboardList />}> */}
                            <MenuItem component={<NavLink to="/admin/registration" />} icon={<FaClipboardList />}>Registration</MenuItem>
                        {/* </SubMenu> */}
                        {/* <SubMenu className={c.submenu} label="Payments" icon={<FaCreditCard />}> */}
                            <MenuItem component={<NavLink to="/admin/payments"/>} icon={<FaCreditCard />} >Payments</MenuItem>
                        {/* </SubMenu> */}
                        <MenuItem component={<NavLink to="/admin/results" />} icon={<FaTrophy />}>Results</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <div className={c.right}>
                <Outlet />
            </div>
        </section>
    );
};

export default Admin;


