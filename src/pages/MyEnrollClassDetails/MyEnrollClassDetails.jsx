import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { MdOutlineReport } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../Hooks/useAuth";

const MyEnrollClassDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const [details, setDetails] = useState([]);
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: assignment = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["classId"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollClass/${id}`);
      return res.data;
    },
  });

  // const {data: assign = []} = useQuery({
  //     queryKey: ["assignmentClassId"],
  //     queryFn: async () => {
  //         const res = await axiosSecure.get(`/assignment/${assignment?.classId}`)
  //         return res.data;
  //     }
  // });

  useEffect(() => {
    axiosSecure.get(`/assignment/${assignment?.classId}`).then((res) => setDetails(res.data));
  }, [axiosSecure, assignment?.classId]);

  //     useEffect(() => {
  //         axiosSecure.get(`/upclass/${assignment?.classId}`)
  //         .then(res => setClass(res.data))
  //     },[axiosSecure, assignment?.classId]);
  // console.log(classD)

  const handleSubmitBtn = (item) => {
    const id = item._id;
    const assign = item.assignmentSubmitted;
    const updated = assign + 1;
    const classId = item.classId;
    const info = { updated, classId };
    axiosSecure.patch(`/updateSubmit/${id}`, info).then((res) => {
      if (res.data.assignResult.modifiedCount && res.data.classResult.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Assignment Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  const onSubmit = (data) => {
    const description = data.description;
    const rate = rating;
    const title = assignment?.title;
    const userName = user?.displayName;
    const photo = user?.photoURL;
    const classId = assignment?.classId;
    const info = { description, rate, title, userName, photo, classId };

    axiosSecure.post("/rate", info).then((res) => {
      console.log(res.data);
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Send Feedback Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {details.map((item) => (
          <div
            className="border border-gray-600 p-4 hover:bg-gray-500 hover:text-white rounded"
            key={item._id}
          >
            <p>
              <span className="text-lg font-semibold">Title : </span>
              {item.title}
            </p>
            <p>
              <span className="text-lg font-semibold">Description : </span>
              {item.description}
            </p>
            <p>
              <span className="text-lg font-semibold">Deadline : </span>
              {item.date}
            </p>
            <button
              onClick={() => handleSubmitBtn(item)}
              className="btn bg-[#e67e22] text-white hover:text-black mt-2"
            >
              Submit
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h1 className="text-3xl font-semibold text-center">Teaching Evaluation Report</h1>
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn bg-red-600 px-4 py-2 rounded-xl text-white items-center justify-center text-center"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <MdOutlineReport />
            TER
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">Create Assignment</h3>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-span-full sm:col-span-3">
                    {/* <label htmlFor="title" className="font-medium">
                      Assignment Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      {...register("title", { required: true })}
                      placeholder="Class Title Here"
                      className="w-full rounded-md py-2 px-4 border border-gray-400"
                    />
                    {errors.title && <span className="text-red-600">Title is required</span>} */}
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={50}
                      activeColor="#ffd700"
                    />
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="description" className="font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      {...register("description", { required: true })}
                      placeholder="Class Title Here"
                      className="w-full rounded-md py-2 px-4 border border-gray-400"
                    />
                    {errors.description && (
                      <span className="text-red-600">Description is required</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-ghost bg-[#e67e22] text-white hover:text-black"
                  >
                    Send
                  </button>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn bg-red-600 text-white hover:text-black">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
