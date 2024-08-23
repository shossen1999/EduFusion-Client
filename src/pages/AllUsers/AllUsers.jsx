import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useUsers from '../../Hooks/useUsers';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['allUsers'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/users");
    //         return res.data;
    //     },
    // });
    const [users, refetch] = useUsers();
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
            <h2>Total Users: {users.length}</h2>
            {users.length === 0 ? (
                <h1 className="text-2xl font-bold text-red-500 text-center">No users found</h1>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt="User Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <th>
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => handleMakeAdmin(user.email, user.name)}
                                            className={`text-nowrap ${user.role === 'admin' ? 'disabled-btn' : 'bg-[#7b7b7b] text-white'} font-bold px-4 py-2 rounded-full`}
                                        >
                                            Make Admin
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
