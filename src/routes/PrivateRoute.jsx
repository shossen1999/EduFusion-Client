import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth();
    const location = useLocation();
    // console.log(location);
   
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (!user) {
        return <Navigate to='/login' state={location?.pathname || '/'} />
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;