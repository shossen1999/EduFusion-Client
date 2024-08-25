import { useContext, useEffect, useState } from "react";

import { FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { FaUserTie } from "react-icons/fa";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/users?email=${user?.email}`)
            .then(res => setDbUser(res.data));
    }, [user?.email, axiosSecure]);

    console.log(dbUser)


    return (
        <div className="container mx-auto">
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h1 className="text-xl font-medium text-cyan-500 text-center">
                        <FaUserCircle className="inline-block mb-1" /> {user.displayName}, Welcome to EduFusion!
                    </h1>

                </div>

                <div className="flex flex-col items-center px-6 py-4">
                    <img
                        className="h-24 w-24 rounded-full border-2 border-gray-300"
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt="User"
                    />
                    <div className="mt-4 text-center">
                        <p className="text-xl font-bold text-cyan-600">Name :{user.displayName}</p>
                        <p className="text-sm text-gray-700"><FaUserTie className="inline-block mb-1 mr-1" /> Role : {dbUser[0]?.role}</p>
                        <p className="mt-2 text-sm text-gray-600">
                            <FaEnvelope className="inline-block mb-1 mr-1" />Email : {user.email}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            <FaPhone className="inline-block mb-1 mr-1" />Contact No : {dbUser[0]?.contactNumber || 'hidden'}
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Profile;