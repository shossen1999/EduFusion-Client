import {
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
    const [show, setShow] = useState(false);
    const { createUser, updateUser, logOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        setError('');
        setLoading(true);
        createUser(data.email, data.password)
            .then(result => {
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        const user = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL,
                            contactNumber: data.number,
                            role: 'student'
                        };

                        axiosPublic.post('/users', user)
                            .then(res => console.log(res.data));

                        logOut()
                            .then()
                            .catch();
                        
                        setLoading(false);
                        toast.success('Account created successfully!');
                        navigate('/login');
                    });
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                setError(err.message);
            });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <Input {...register("name", { required: true })} name="name" type="text" size="lg" className="mt-1 block w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Input {...register("email", { required: true })} name="email" type="email" size="lg" className="mt-1 block w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <Input {...register("photoURL", { required: true })} name="photoURL" type="text" size="lg" className="mt-1 block w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <Input {...register("number", { required: true })} name="number" type="tel" size="lg" className="mt-1 block w-full" />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <Input {...register("password", { required: true })} name="password" type={show ? "text" : "password"} size="lg" className="mt-1 block w-full" />
                        {show ? 
                            <FaRegEyeSlash onClick={() => setShow(false)} className="absolute inset-y-0 right-3 flex items-center text-xl cursor-pointer" />
                            : 
                            <FaRegEye onClick={() => setShow(true)} className="absolute inset-y-0 right-3 flex items-center text-xl cursor-pointer" />
                        }
                    </div>
                    {error && <p className="text-red-500 text-sm flex items-center gap-1"><MdErrorOutline /> {error}</p>}
                    <Button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm text-white"></span> : 'Sign Up'}
                    </Button>
                    <Typography color="gray" className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link to={'/login'} className="text-blue-500 underline font-bold">
                            Log In
                        </Link>
                    </Typography>
                </form>
            </div>
        </div>
    );
};

export default Register;
