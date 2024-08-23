import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider.jsx";
import useAxiosSecure from "../../Hooks/useAxiosSecure.jsx";

const MyClass = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], isPending, refetch } = useQuery({
        queryKey: ['user-class', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return <div className="text-center">Loading...</div>;
    }

    const handleDelete = (id) => {
        swal({
            title: "Are you sure you want to delete this class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await axiosSecure.delete(`/class/${id}`);
                    if (res.data.deletedCount > 0) {
                        swal("Deleted Successfully!", {
                            icon: "success",
                        });
                        refetch();
                    }
                }
            });
    };

    if (classes.length === 0) {
        return (
            <div className="text-center mt-8">
                <h2 className="text-2xl font-bold text-blue-600">You haven't added any class yet!</h2>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {classes.map((aClass, idx) => (
                <div key={idx} className="card bg-base-100 shadow-xl border border-gray-200 overflow-hidden max-w-[380px] mx-auto">
                    {/* <div className="flex items-center gap-2 p-4">
                        <div>
                            <img src={aClass.image} alt={aClass.title} className="w-[40px] h-[40px] rounded-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{aClass.title}</h3>
                            <p className="text-gray-600">{aClass.name}</p>
                        </div>
                    </div> */}
                    <figure className="px-10 pt-10">
                        <img src={aClass.image} alt={aClass.title} className="rounded-2xl w-full h-[180px] object-cover" />
                    </figure>
                    <div className="card-body p-6">
                        <h2 className="text-xl font-bold mb-2">
                            <span className="font-bold">Name:</span> {aClass.name}
                        </h2>
                        <p className="text-[14px]"><span className="font-bold">Email:</span> {aClass.email}</p>
                        <p className="text-[14px]"><span className="font-bold">Price:</span> ${aClass.price}</p>
                        <p className="text-[14px] mb-2">
                            <span className="font-bold">Description:</span> {aClass.description.length > 100
                                ? aClass.description.substring(0, 100) + '...'
                                : aClass.description}
                        </p>
                        <p className="text-[14px] mb-4"><span className="font-bold">Status:</span> {aClass.status}</p>
                        <div className=" flex justify-between space-x-2">
                            <Link to={`/dashboard/updateClass/${aClass._id}`} className="flex-1">
                                <button className="btn" style={{ backgroundColor: "#18555b", color: "white" }}>Update</button>
                            </Link>
                            <button
                                onClick={() => handleDelete(aClass._id)}
                                className="btn"
                                style={{ backgroundColor: "#d33", color: "white" }}
                            >
                                Delete
                            </button>
                            <Link to={`/dashboard/teacherSeeDetails/${aClass._id}`} className="flex-1">
                                <button
                                    disabled={aClass.status !== 'accepted'}
                                    className={`btn ${aClass.status !== 'accepted'
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gray-400 hover:bg-cyan-800'
                                        } text-white`}
                                >
                                    See Details
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyClass;
