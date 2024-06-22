import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const ClassDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: details = [], refetch } = useQuery({
    queryKey: ["detailsClass"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/classdetails/${id}`);
      return res.data;
    },
  });

  const handlePay = () => {
    const classId = details._id;
    const title = details.title;
    const name = details.name;
    const image = details.image;
    const totalEnroll = details.totalEnroll;
    const enroll = totalEnroll + 1;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const classInfo = { classId, title, name, image, userName, userEmail, enroll };
    console.log(classInfo);
    axiosPublic.post("/enroll", classInfo).then((res) => {
      console.log(res.data);
      if (res.data.enrollResult.insertedId && res.data.countResult.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/enroll-classes");
      }
    });
  };

  return (
    <div className="mt-10">
      <div className="max-w-xl mx-auto">
        <img src={details.image} alt="" />
      </div>
      <div className="max-w-2xl mx-auto mt-3">
        <div className="flex gap-10 justify-between">
          <p className="text-xl font-semibold">Title : {details.title}</p>
          <p className="text-xl font-semibold">Price : ${details.price}</p>
        </div>
        <p className="mt-1 text-lg font-medium">Teacher : {details.name}</p>
        <p className="mt-1">Short Description : {details.shortDes}</p>
        <p className="mt-1">Description : {details.description}</p>
        <Link>
          <button
            onClick={handlePay}
            className="btn btn-ghost bg-[#e67e22] text-white hover:text-black w-full mt-2"
          >
            Pay
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClassDetails;
