import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5173'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useAuth();

    // request interceptor to add authrization header for every secure call to the api
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        // console.log('request stopped by axios interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error){
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 signout the user and move the user to the sign in page
        if( status === 401 || status === 403){
            await signOutUser();
            navigate('/sign-in')
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;