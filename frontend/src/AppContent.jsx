import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './sections/global/Header1/Header1';
import Footer from './sections/global/Footer/Footer';
import { isTokenExpired } from './utils/isTokenExpired';

import HomePage from './sections/HomePage/HomePage';
import EventPage from './sections/EventsPage/EventPage';
import SingleEvent from './sections/HomePage/Schedules/SingleEvent/SingleEvent';
import AboutUs from './sections/AboutUsPage/AboutUs';
import Contact from './sections/ContactUsPage/Contact';
import Login from './sections/global/LoginPage/Login';
import Signup from './sections/global/Signup/Signup';

import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Profile from './sections/ProfilePage/Profile';
import AdminRoute from './Components/AdminRoute/AdminRoute';
import Admin from './sections/AdminPage/Admin';
import Dashboard from './sections/AdminPage/Dashboard/Dashboard';
import ManageUser from './sections/AdminPage/User Management/ManageUser';
import ManageEvents from './sections/AdminPage/Event Management/ManageEvents';
import ManageRegistration from './sections/AdminPage/Registration Management/ManageRegistration';
import ManagePayments from './sections/AdminPage/Payment Management/ManagePayments';
import Result from './sections/AdminPage/Result/ManageResults';
import Error from './sections/global/ErrorPage/Error';
import ForgotPassword from './sections/global/ForgotPassword/ForgotPassword';
import ResetPassword from './sections/global/ResetPassword/ResetPassword';
import RegisterParticipant from './sections/RegistrationPage/RegisterParticipant';
import Team from './sections/Team/Team';
import ScrollToTopButton from './Components/ScrollToTop/ScrollToTop';

function AppContent() {
    const location = useLocation();
    const adminRoute = location.pathname.startsWith('/admin');

    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            const token = sessionStorage.getItem("token");

            if (token && isTokenExpired(token)) {
                sessionStorage.clear();
                navigate("/login");
            }
        }, 1 * 60 * 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {!adminRoute && <Header />}
            {/* <Header/> */}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contacts" element={<Contact />} />
                <Route path="/our-team" element={<Team />} />
                <Route path="/event/:ename" element={<SingleEvent />} />



                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<RegisterParticipant />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<Admin />} >
                        <Route index element={<Navigate to="dash" replace />} />
                        <Route path="/admin/dash" element={<Dashboard />} />
                        <Route path="/admin/user" element={<ManageUser />} />
                        <Route path="/admin/events" element={<ManageEvents />} />
                        <Route path="/admin/registration" element={<ManageRegistration />} />
                        <Route path="/admin/payments" element={<ManagePayments />} />
                        <Route path="/admin/results" element={<Result />} />
                    </Route>


                </Route>

                <Route path='*' element={<Error />} />
            </Routes>

            {!adminRoute && <Footer />}
            {/* <Footer /> */}

            <ScrollToTopButton />
        </>
    );
}

export default AppContent;
