import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Btn from "../../Components/Btn";
import { Helmet } from "react-helmet";

const MyEnrollClass = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: classes = [] } = useQuery({
        queryKey: ['user-class', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-classes/${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })



    const ClassCard = ({ id, title, name, image }) => {
        return (
            <div className="max-w-sm rounded-lg overflow-hidden mx-auto shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white">
                <Helmet>
                    <title>Student |  MyEnrollClass</title>
                </Helmet>
             
                <div className="relative">
                    <img className="w-full h-[220px] object-cover p-4 object-center rounded-t-lg" src={image} alt={title} />
                
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-t-lg"></div>
                </div>

               
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
                    <p className="text-gray-600 text-lg mb-6">Instructor: {name}</p>

                 
                    <div className="text-center">
                        <Link to={`/dashboard/studentContinueDetails/${id}`}>
                            <button className="px-4 py-2 rounded-full bg-[#7b7b7b] btn-block text-white font-bold hover:bg-cyan-700">
                                Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    console.log(classes)
    if (classes.length == 0) {
        return (
            <div className="w-full">
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    You haven&apos;t buy any class yet!
                </h2>
                <div className="w-full flex py-6 items-center justify-center">
                    <Link to={'/allClasses'}>
                        <Btn text={'See All Classes'} />
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 lg:p-14">
             <Helmet>
                <title>Student | My Enroll Class</title>
            </Helmet>
            <div className="flex my-4 items-center justify-between">
                <h1 className="text-3xl font-bold mb-8">Enrolled Classes</h1>
               
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {
                    classes.map((classItem) => (
                        <ClassCard
                            key={classItem._id}
                            id={classItem._id}
                            title={classItem.title}
                            name={classItem.name}
                            image={classItem.image}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default MyEnrollClass;