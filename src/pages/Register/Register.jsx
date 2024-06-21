import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react"; // Corrected import
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser } = useAuth();
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        const { fullName, image, email, password } = data;
        console.log(password);
        // password validation start 
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 character or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one uppercase letter');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('Password should have at least one lowercase letter');
            return;
        }
        // reset error 
        setRegisterError('');
        setSuccess('');

        // create user 
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully');
                toast.success('User Created Successfully');
                // update profile
                updateProfile(result.user, {
                    displayName: fullName,
                    photoURL: image
                })
                    .then(() => {
                        const userInfo = {
                            name: fullName,
                            email: email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    // reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/");
                                }
                            })


                    })
                    .catch()
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            });
    };

    return (
        <div>


            <div>
                <ToastContainer />
                <h3 className="text-3xl text-center">Please Register</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            name="name"
                            placeholder="name"
                            className="input input-bordered"
                            {...register("fullName", { required: true })}
                        />
                        {errors.fullName && <span className="text-red-700">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text"
                            name="photo"
                            placeholder="Photo URL"
                            className="input input-bordered"
                            {...register("image")}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            name="email"
                            placeholder="email"
                            className="input input-bordered"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-700">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative ">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered w-full"
                                {...register("password", { required: true })}
                            />
                            <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }

                            </span>

                            {errors.password && <span className="text-red-700">This field is required</span>}
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                    {
                        registerError && <p className="text-red-700">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-700">{success}</p>
                    }
                </form>

                <p className="text-center mt-4 ">Already have an account? Please <Link className="text-blue-700 font-bold" to="/login">Login</Link></p>



            </div>

        </div>
    );
};

export default Register;