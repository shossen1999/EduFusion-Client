import {
    Typography, Input, Button,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";

const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const { logIn, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        setError('');
        setLoading(true);
        logIn(data.email, data.password)
            .then(result => {
                toast.success('Login successfully!');
                navigate(location?.state ? location.state : '/');
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setError(err.message);
                setLoading(false);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    role: 'student'
                };

                axiosPublic.post('/users', newUser)
                    .then(res => {
                        if (res.data.inserterId) {
                            toast.success('Login successfully!');
                        }
                        navigate(location?.state ? location.state : '/');
                    });
            })
            .catch(err => {
                console.error(err);
                toast.error('Error with Google login');
            });
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black"
        >
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Input {...register("email", { required: true })} name="email" type="email" size="lg" className="mt-1 block w-full" />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <Input
                                {...register("password", { required: true })}
                                name="password"
                                type={show ? "text" : "password"}
                                size="lg"
                                className="block w-full pr-10" // Add padding to the right for the icon
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                {show ? (
                                    <FaRegEyeSlash onClick={() => setShow(false)} className="text-xl text-gray-500" />
                                ) : (
                                    <FaRegEye onClick={() => setShow(true)} className="text-xl text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm flex items-center gap-1"><MdErrorOutline /> {error}</p>}
                    <Button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm text-white"></span> : 'Sign In'}
                    </Button>
                    <div className="text-center my-4 text-gray-600">OR</div>
                    <Button onClick={handleGoogleLogin} className="w-full py-2 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                        <FcGoogle /> Google
                    </Button>
                    <Typography color="gray" className="text-center text-sm mt-4">
                        Don&apos;t have an account?{" "}
                        <Link to={'/register'} className="text-blue-500 underline font-bold">
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </div>
        </div>
    );
};

export default Login;
