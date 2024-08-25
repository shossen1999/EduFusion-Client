import React, { useState } from "react";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUsers from "../../Hooks/useUsers";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [currentPage, setCurrentPage] = useState(1);
  const [search] = useState('');
  const pageSize = 10;

  const { data: webDetail_user, isPending: isUserCountPending } = useQuery({
    queryKey: ['webDetail-user'],
    queryFn: async () => {
      const res = await axiosPublic.get('/webDetails');
      return res.data.userCount;
    }
  });

  const totalPages = Math.ceil(webDetail_user / pageSize);
  const [users, refetch, userPending] = useUsers(currentPage, pageSize, search);
  const DefaultPagination = ({ totalPages }) => {
    const getItemProps = (index) => ({
      variant: currentPage === index ? "filled" : "text",
      className: `rounded-full px-4 py-2 ${
        currentPage === index ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
      } transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-white`,
      onClick: () => {
        setCurrentPage(index);
        refetch();
      },
    });
  
    const next = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        refetch();
      }
    };
  
    const prev = () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        refetch();
      }
    };
  
    const renderPaginationButtons = () => {
      const buttons = [];
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <IconButton
            key={i}
            {...getItemProps(i)}
            className="rounded-full text-xs md:text-sm"
          >
            {i}
          </IconButton>
        );
      }
      return buttons;
    };
  
    return (
      <div className="flex flex-col items-center w-full gap-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="text"
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            } bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300`}
            onClick={prev}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          {renderPaginationButtons()}
          <Button
            variant="text"
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            } bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300`}
            onClick={next}
            disabled={currentPage === totalPages}
          >
            Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  

  if (userPending || isUserCountPending) {
    return <div>Loading...</div>;
  }

  const handleMakeAdmin = async (email, name) => {
    swal({
      title: `Are you sure you want to make ${name} an admin?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        const res = await axiosSecure.patch(`/user/${email}`, { role: 'admin' });
        if (res.data.modifiedCount > 0) {
          swal(`${name} is now an admin!`, { icon: "success" });
          refetch();
        }
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr className="text-xs md:text-sm">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-2xl font-bold text-red-500 text-center p-4">
                  No users found
                </td>
              </tr>
            )}
            {users.map((user, idx) => (
              <tr key={idx} className="text-sm md:text-base text-gray-700 border-b">
                <th className="px-6 py-4">{(currentPage - 1) * pageSize + idx + 1}</th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt="User Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    disabled={user.role === 'admin'}
                    onClick={() => handleMakeAdmin(user.email, user.name)}
                    className={`${
                      user.role === 'admin' ? 'bg-gray-400' : 'bg-cyan-600 hover:bg-cyan-700'
                    } text-white font-bold px-4 py-2 rounded-full`}
                  >
                    {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DefaultPagination totalPages={totalPages} />
    </div>
  );
};

export default AllUsers;
