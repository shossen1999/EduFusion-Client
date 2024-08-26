import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useWebDetail from "../../Hooks/useWebDetail";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [webDetail] = useWebDetail();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const totalPages = Math.ceil(webDetail.requestCount / pageSize);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const { data: requests = [], isFetching, refetch } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get("/teacherRequest");
            return res.data;
        }
    });

    if (isFetching) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    const reject = { status: 'rejected' };
    const approve = { status: 'accepted', role: 'teacher' };

    const handleMakeApprove = async (id, email) => {
        const res = await axiosSecure.patch(`/teacherRequest/${id}`, approve);
        const roleRes = await axiosSecure.patch(`/user/${email}`, approve);
        if (roleRes.data.modifiedCount > 0 && res.data.modifiedCount > 0) {
            toast.success('Approved successfully!');
            refetch();
        }
    };

    const handleMakeReject = async (id) => {
        const res = await axiosSecure.patch(`/teacherRequest/${id}`, reject);
        if (res.data.modifiedCount > 0) {
            toast.success('Rejected successfully!');
            refetch();
        }
    };

    return (
        <div className="p-4 md:p-8">
             <Helmet>
                    <title>Teacher Request Page</title>
                </Helmet>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-300">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs md:text-sm">
                        <tr>
                            <th className="py-3 px-2">#</th>
                            <th className="py-3 px-2">Image</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Experience</th>
                            <th className="py-3 px-2">Title</th>
                            <th className="py-3 px-2">Category</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm md:text-base divide-y divide-gray-200">
                        {requests.map((req, idx) => (
                            <tr key={req._id} className="text-center">
                                <td className="py-4">{idx + 1}</td>
                                <td className="py-4">
                                    <div className="flex justify-center items-center">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                                            <img src={req.photoURL} alt="Avatar" className="object-cover w-full h-full" />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">{req.userName}</td>
                                <td className="py-4">{req.experience}</td>
                                <td className="py-4">{req.title}</td>
                                <td className="py-4">{req.category}</td>
                                <td className="py-4">{req.status}</td>
                                <td className="py-4 flex flex-col sm:flex-row justify-center gap-2">
                                    <button
                                        disabled={req.status !== 'pending'}
                                        onClick={() => handleMakeApprove(req._id, req.email)}
                                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold ${req.status !== 'pending' ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        disabled={req.status !== 'pending'}
                                        onClick={() => handleMakeReject(req._id)}
                                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold ${req.status !== 'pending' ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-center justify-center mt-8 space-y-4">
                <p className="text-xs md:text-sm text-gray-600">
                    Showing {currentPage * pageSize - pageSize + 1} to {Math.min(currentPage * pageSize, webDetail.requestCount)} of {webDetail.requestCount} requests
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

export default TeacherRequest;
