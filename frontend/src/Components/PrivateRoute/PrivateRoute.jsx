import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../../utils/isTokenExpired';


const PrivateRoute = () => {

    return !isTokenExpired() ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoute;   