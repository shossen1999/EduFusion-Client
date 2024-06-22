import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <span className="loading loading-dots loading-lg"></span>
    }

    if(user){
        return children;
    }

    return <Navigate to="/sign-in" state={{from: location}} replace></Navigate>
};

PrivateRoutes.propTypes = {
    children: PropTypes.node
  };

export default PrivateRoutes;