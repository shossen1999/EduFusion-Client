import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaPlus,  FaUserGraduate } from "react-icons/fa";
import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdAssignment } from "react-icons/md";
import swal from "sweetalert";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TeacherSeeDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = useState(false);

    const { data: aClass = [], isLoading, refetch } = useQuery({
        queryKey: ['teacher-class', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`);
            return res.data;
        }
    });

    const { data: assignmentStat = [], isPending: statPending } = useQuery({
        queryKey: ['assignment-stat', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submission-data/${id}`);
            return res.data;
        }
    });

    const { data: totalAssignment = [], isPending: dayPending, refetch: totalRefetch } = useQuery({
        queryKey: ['total-assignment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments-count/${id}`);
            return res.data;
        },
        refetchOnMount: true
    });

    const { register, handleSubmit, reset } = useForm();
    const mutation = useMutation({
        mutationFn: (data) => axiosSecure.post(`/classes/${id}/assignments`, data),
        onSuccess: () => {
            refetch();
            reset();
            totalRefetch();
            setOpen(false);
            swal({
                title: "Assignment added Successfully!",
                icon: "success",
                timer: 1500,
            });
        },
        onError: (error) => {
            console.error("Error adding assignment:", error);
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const today = new Date().toISOString().split('T')[0];

    if (isLoading || statPending || dayPending) {
        return <div>Loading....</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-white mb-8">{aClass[0]?.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Enrollment Card */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                    <FaUserGraduate className="text-6xl text-blue-500" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Enrollment</h2>
                        <p className="text-4xl font-bold text-gray-800">{aClass[0]?.total_enrollment || 0}</p>
                    </div>
                </div>

                {/* Assignments Card */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                    <MdAssignment className="text-6xl text-green-500" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Assignments</h2>
                        <p className="text-4xl font-bold text-gray-800">{totalAssignment.totalAssignments || 0}</p>
                    </div>
                </div>

                {/* Submissions Card */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                    <FaCalendarAlt className="text-6xl text-yellow-500" />
                    <div>
                        <h2 className="text-lg font-semibold">Per Day Submissions</h2>
                        <p className="text-4xl font-bold text-gray-800">{parseFloat(assignmentStat.submissionsPerDate).toFixed(2) || 0}</p>
                    </div>
                </div>
            </div>

            {/* Create Assignment Button */}
            <div className="text-center mb-8">
                <Button color="green" onClick={() => setOpen(true)} className="flex items-center mx-auto rounded-full">
                    <FaPlus className="mr-1 text-2xl" /> <span className="text-sm">Create Assignment</span>
                </Button>
            </div>

            {/* Create Assignment Dialog */}
            <Dialog open={open} handler={setOpen} className="rounded-xl shadow-2xl bg-white">
                <DialogHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-center py-4 rounded-t-xl">
                    <h2 className="text-2xl font-bold">Create New Assignment</h2>
                </DialogHeader>
                <DialogBody className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Assignment Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                {...register('title', { required: true })}
                                placeholder="Enter assignment title"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Assignment Deadline</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                {...register('deadline', { required: true })}
                                min={today}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Assignment Description</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                {...register('description', { required: true })}
                              placeholder="Enter assignment description"
                                rows={4}
                                required
                            />
                        </div>
                        <div className="flex justify-start yyyy">
                            <Button
                                type="submit"
                                color="green"
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
                            >
                                 Add Assignment
                            </Button>
                           

                        </div>
                    </form>
                </DialogBody>
            </Dialog>

        </div>
    );
};

export default TeacherSeeDetails;
