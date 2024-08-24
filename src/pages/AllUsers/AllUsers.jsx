import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useUsers from '../../Hooks/useUsers';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: webDetail_user, isPending: isUserCountPending } = useQuery({
        queryKey: ['webDetail-user'],
        queryFn: async () => {
            const res = await axiosPublic.get('/webDetails');
            return res.data.userCount;
        }
    });

    const totalPages = Math.ceil(webDetail_user / pageSize);
    const [users, refetch, userPending] = useUsers(currentPage, pageSize);

    const DefaultPagination = ({ totalPages }) => {
        const getItemProps = (index) => ({
            variant: currentPage === index ? "filled" : "text",
            color: currentPage === index ? "blue" : "gray",
            onClick: () => {
                setCurrentPage(index);
                refetch();
            },
            className: `transition-all duration-300 ease-in-out transform ${
                currentPage === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            } font-semibold rounded-full px-4 py-2 mx-1`,
        });

        const next = () => {
            if (currentPage === totalPages) return;
            setCurrentPage(currentPage + 1);
            refetch();
        };

        const prev = () => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
            refetch();
        };

        const renderPaginationButtons = () => {
            const buttons = [];
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button key={i} {...getItemProps(i)}>
                        {i}
                    </button>
                );
            }
            return buttons;
        };

        return (
            <div className="flex flex-wrap items-center justify-center mx-auto w-full gap-4 py-6">
                <Button
                    variant="text"
                    className="flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-500 transition-all duration-300 ease-in-out transform"
                    onClick={prev}
                    disabled={currentPage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">{renderPaginationButtons()}</div>
                <Button
                    variant="text"
                    className="flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-500 transition-all duration-300 ease-in-out transform"
                    onClick={next}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    if (userPending || isUserCountPending) {
        return <div>Loading.....</div>;
    }

    const handleMakeAdmin = async (email, name) => {
        Swal.fire({
            title: `Are you sure you want to make ${name} an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, make admin!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/user/${email}`, { role: 'admin' });
                if (res.data.modifiedCount > 0) {
                    Swal.fire(`${name} is now an admin!`, '', 'success');
                    refetch();
                } else {
                    Swal.fire('Failed to make admin.', '', 'error');
                }
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Total Users: {users.length}</h2>
            {users.length === 0 ? (
                <h1 className="text-2xl font-bold text-red-500 text-center">No users found</h1>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                                <th className="px-3 py-2 text-left">#</th>
                                <th className="px-3 py-2 text-left">Image</th>
                                <th className="px-3 py-2 text-left">Name</th>
                                <th className="px-3 py-2 text-left">Email</th>
                                <th className="px-3 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user, idx) => (
                                <tr key={idx}>
                                    <td className="px-3 py-2">{(currentPage - 1) * pageSize + idx + 1}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-8 h-8 md:w-12 md:h-12">
                                                    <img src={user.image} alt="User Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">{user.name}</td>
                                    <td className="px-3 py-2">{user.email}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => handleMakeAdmin(user.email, user.name)}
                                            className={`text-nowrap ${user.role === 'admin' ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 hover:bg-blue-700 text-white'} font-bold px-2 py-1 md:px-4 md:py-2 rounded-full`}
                                        >
                                            {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-6">
                <DefaultPagination totalPages={totalPages} />
            </div>
        </div>
    );
};

export default AllUsers;
