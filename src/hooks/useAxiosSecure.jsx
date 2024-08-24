import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://edu-fusion-server.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            function (config) {
                const token = localStorage.getItem('access-token');
                config.headers.authorization = `Bearer ${token}`;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error) => {
                const status = error?.response?.status;
                if (status === 401 || status === 403) {
                    await logOut().then(() => {
                        toast.success('Signed out successfully');
                        navigate('/login');
                    });
                }
                return Promise.reject(error);
            }
        );

        // Cleanup function to eject interceptors when the component unmounts
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
