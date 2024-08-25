import swal from "sweetalert";
import { Link } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useClasses from "../../Hooks/useClasses";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useWebDetail from "../../Hooks/useWebDetail";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const DashboardAllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const [webDetail] = useWebDetail();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [classes, refetch, classPending] = useClasses(currentPage, pageSize);

    useEffect(() => {
        refetch(); 
    }, [currentPage, pageSize, refetch]);

    const totalPages = Math.ceil(webDetail.allClassCount / pageSize);

    const approve = { status: 'accepted' };
    const reject = { status: 'rejected' };

    const handleApprove = async (id) => {
        swal({
            title: "Are you sure you want to approve the class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const res = await axiosSecure.patch(`/class/${id}`, approve);
                if (res.data.modifiedCount > 0) {
                    swal("Class Approved!", { icon: "success" });
                    refetch();
                }
            }
        });
    };

    const handleReject = async (id) => {
        swal({
            title: "Are you sure you want to reject the class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const res = await axiosSecure.patch(`/class/${id}`, reject);
                if (res.data.modifiedCount > 0) {
                    swal("Class Rejected!", { icon: "success" });
                    refetch();
                }
            }
        });
    };

    if (classPending) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="overflow-x-auto p-4 md:p-10">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs md:text-sm">
                        <th className="py-3 px-2">#</th>
                        <th className="py-3 px-2">Image</th>
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Email</th>
                        <th className="py-3 px-2 hidden md:table-cell">Short Description</th>
                        <th className="py-3 px-2">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs md:text-sm">
                    {classes.map((aClass, idx) => (
                        <tr key={aClass._id} className="text-center">
                            <td className="py-4">{(currentPage - 1) * pageSize + idx + 1}</td>
                            <td className="py-4">
                                <div className="flex justify-center items-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                                        <img src={aClass.image} alt="Class" className="object-cover w-full h-full" />
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">{aClass.title}</td>
                            <td className="py-4">{aClass.email}</td>
                            <td className="py-4 hidden md:table-cell">
                                {aClass.description.slice(0, 30)}...
                            </td>
                            <td className="py-4 flex flex-col md:flex-row justify-center gap-2">
                                <button
                                    onClick={() => handleApprove(aClass._id)}
                                    disabled={aClass.status !== 'pending'}
                                    className={`px-3 py-2 rounded-full font-bold text-xs md:text-sm ${aClass.status !== 'pending' ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(aClass._id)}
                                    disabled={aClass.status !== 'pending'}
                                    className={`px-3 py-2 rounded-full font-bold text-xs md:text-sm ${aClass.status !== 'pending' ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                >
                                    Reject
                                </button>
                                <Link to={`/dashboard/adminSeeProgress/${aClass._id}`}>
                                    <button
                                        disabled={aClass.status === 'pending'}
                                        className={`px-3 py-2 rounded-full font-bold text-xs md:text-sm ${aClass.status === 'pending' ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                    >
                                        See Progress
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center mt-8 space-y-4">
                <p className="text-xs md:text-sm text-gray-600">
                    Showing {currentPage * pageSize - pageSize + 1} to {Math.min(currentPage * pageSize, webDetail.allClassCount)} of {webDetail.allClassCount} classes
                </p>
                <div className="flex items-center gap-4">
                    <IconButton
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300 flex items-center justify-center"
                        size="lg"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </IconButton>
                    <p className="text-xs md:text-sm">Page {currentPage} of {totalPages}</p>
                    <IconButton
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300 flex items-center justify-center"
                        size="lg"
                    >
                        <ArrowRightIcon className="h-5 w-5" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default DashboardAllClasses;
