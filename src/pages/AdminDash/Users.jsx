import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import { useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  // const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const searchInfo = data.search;
    // axiosSecure.get(`/search/${searchInfo}`)
    // .then(res => {
    //   console.log(res.data);
    // })
  };

  const { data: user = [], refetch } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/alluser");
      return res.data;
    },
  });

  const handleAdmin = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want make admin",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Admin!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/user/admin/${id}`)
          .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    title: "Admin",
                    text: "User Now Admin.",
                    icon: "success"
                  });
            }
          })
        }
      });
  };
  

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center">All User</h1>

      <div className="mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-5 justify-center text-center mx-auto"
        >
          <div className="flex flex-col ">
            <input
              className="border w-60 rounded-sm border-gray-600 px-4 py-2"
              placeholder="Search by username or email"
              type="text"
              {...register("search", { required: true })}
            />
            {errors.search && <span className="text-red-600">Please enter username or email</span>}
          </div>
          <button type="submit" className="btn btn-ghost bg-[#e67e22] text-white hover:text-black">
            Search
          </button>
        </form>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                user.map((item,index) => <tr key={item._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.photo}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.name}
                </td>
                <td>{item.email}</td>
                <th>
                  {
                    item.role === "admin" ? <button disabled className="btn btn-ghost bg-[#e67e22] text-white hover:text-black">Admin</button> : <button onClick={() => handleAdmin(item._id)} className="btn btn-ghost bg-[#e67e22] text-white hover:text-black">Make Admin</button>
                  }
                </th>
              </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
