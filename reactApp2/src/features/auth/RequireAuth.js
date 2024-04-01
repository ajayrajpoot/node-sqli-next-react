import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import {   toast } from "react-toastify";
import NotPermmisionPage from "../../NotPermmisionPage/page";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth();
    

    let isAllowed = roles.some(role => allowedRoles?.includes(role));

    if(!isAllowed){  
        toast.error("You do not have permission to access this page")
    }
    const content = (
        isAllowed
            ? <Outlet />
            : <NotPermmisionPage  />
            // : <Navigate to="/login" state={{ from: location }} replace />
    );
    

    return content
}
export default RequireAuth