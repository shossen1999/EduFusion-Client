import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherRequ = () => {
  const axiosSecure = useAxiosSecure();

  const { data: teacherRequ = [], refetch } = useQuery({
    queryKey: ["teacher request"],
    queryFn: async () => {
      const res = await axiosSecure("/request");
      return res.data;
    },
  });

  const handleApproved = (email) => {
    const status = "approved";
    const role = "teacher";
    const info = { status, role };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want accept teacher request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approved!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/teacherrequ/${email}`, info).then((res) => {
          if (res.data.roleResult.modifiedCount && res.data.statusResult
            .modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Approved",
              text: "Teacher request accepted",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleReject = (email) => {
    const status = "rejected";
    const role = "student";
    const info = { status, role };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want reject teacher request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/teacherrequ/${email}`, info)
        .then((res) => {
            console.log(res.data)
          if (res.data.roleResult.modifiedCount && res.data.statusResult
            .modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Rejected",
              text: "Teacher request rejected",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-10">Teacher Request</h1>
      <div className="mt-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Experience</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {teacherRequ.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="image" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.experience}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <th>
                    {item.status === "approved" ? (
                      <button
                        disabled
                        className="btn btn-ghost bg-green-600 text-white hover:text-black"
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApproved(item.email)}
                        className="btn btn-ghost bg-green-600 text-white hover:text-black"
                      >
                        Approve
                      </button>
                    )}
                  </th>
                  <th>
                    {item.status === "rejected" ? (
                      <button
                        disabled
                        className="btn btn-ghost bg-red-600 text-white hover:text-black"
                      >
                        Rejected
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReject(item.email)}
                        className="btn btn-ghost bg-red-600 text-white hover:text-black"
                      >
                        Reject
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherRequ;
