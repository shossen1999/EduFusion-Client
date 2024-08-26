import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: (aClass) => {
            const setClass = {
                ...aClass,
                total_enrollment: 0
            };
            return axiosSecure.post('/classes', setClass);
        },
        onSuccess: () => {
            swal({
                title: "Class Added Successfully!",
                icon: "success",
                timer: 1500,
            });
            setLoading(false);
            navigate('/dashboard/myClass');
        },
        onError: (error) => {
            console.error("Error adding class:", error);
        }
    });

    const onSubmit = (data) => {
        setLoading(true);
        const aClass = {
            ...data,
            status: 'pending'
        };
        mutation.mutate(aClass);
    };

    return (
        <>
        <Helmet>
            <title>Teacher | Add Class</title>
        </Helmet>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-32 flex items-center justify-center">
                <h3 className="text-3xl text-white">Add Class</h3>
            </div>
            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        {...register("title", { required: true })}
                        required
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm py-2 caret-w-2 pl-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register("name", { required: true })}
                        defaultValue={user?.displayName}
                        readOnly
                        required
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm py-2 caret-w-2 pl-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email", { required: true })}
                        defaultValue={user?.email}
                        readOnly
                        required
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm py-2 caret-w-2 pl-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        {...register("price", { required: true })}
                        required
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm py-2 caret-w-2 pl-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        required
                        rows="5"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm py-2 caret-w-2 pl-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        {...register("image", { required: true })}
                        required
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm py-2 caret-w-2 pl-2"
                    />
                </div>
            </div>
            <div className="px-6 pb-6">
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-full shadow-sm hover:from-blue-700 hover:to-indigo-600 focus:outline-none"
                >
                    {loading ? <span className="loading loading-spinner loading-sm p-0 m-0 text-white"></span> : 'Add Class'}
                </button>
            </div>
        </form>
        
        </>
        
    );
};

export default AddClass;
