import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    return (
        <>
            {/* {token ? <Outlet/> : <Navigate to= "/login" replace/>} */
                isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />
            }
        </>
    )
};

export default AdminRoute;