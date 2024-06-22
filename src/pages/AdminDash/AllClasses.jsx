import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/class");
      return res.data;
    },
  });

  const handleApproved = (id) => {
    const status = "approved";
    const info = { status };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/classtatus/${id}`, info)
        .then((res) => {
          if (res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
              title: "Approved",
              text: "Class approved successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleRejected = (id) => {
    const status = "rejected";
    const info = { status };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/classtatus/${id}`, info)
        .then((res) => {
          if (res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
              title: "Rejected",
              text: "Class Rejected successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center">All Classes</h1>
      <h1>{classes.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Email</th>
              <th>Short Des</th>
              <th>Action</th>
              <th>Action</th>
              <th>See Progress</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>{item.title}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="image" />
                      </div>
                    </div>
                  </div>
                </td>

                <td>{item.email}</td>
                <td>{item.shortDes}</td>
                <td>
                  {
                    item.status === "approved" ? <button disabled
                    className="btn  btn-ghost bg-green-500 text-white hover:text-black"
                  >
                    Approve
                  </button> : <button
                    onClick={() => handleApproved(item._id)}
                    className="btn btn-ghost bg-green-500 text-white hover:text-black"
                  >
                    Approve
                  </button>
                  }
                </td>
                <td>
                  {
                    item.status === "rejected" ? <button disabled
                    className="btn btn-ghost bg-red-500 text-white hover:text-black"
                  >
                    Reject
                  </button> : <button
                  onClick={() => handleRejected(item._id)}
                  className="btn btn-ghost bg-red-500 text-white hover:text-black"
                >
                  Reject
                </button>
                  }
                </td>
                <th>
                  {
                    item.status === "approved" ? <Link to={`/dashboard/see-progress/${item._id}`}><button className="btn btn-ghost bg-orange-600 text-white hover:text-black">
                    Progress
                  </button></Link> : <button disabled className="btn btn-ghost bg-orange-600 text-white hover:text-black">
                    Progress
                  </button>
                  }
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
