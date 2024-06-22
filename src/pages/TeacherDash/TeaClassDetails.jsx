import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import student from "../../assets/teacherDash/student.jpg";
import assignment from "../../assets/teacherDash/assignment.jpg";
import submitted from "../../assets/teacherDash/assignmentSubmit.jpeg";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TeaClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: item = [], refetch } = useQuery({
    queryKey: ["teaClassDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teaclassdetails/${id}`);
      return res.data;
    },
  });
  console.log(item);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const title = data.title;
    const date = data.date;
    const description = data.description;
    const classId = item._id;
    const totalAssignment = item.totalAssignment;
    const assignmentCount = totalAssignment + 1;
    const assignmentSubmitted = 0;
    const assignment = { title, date, description, classId, assignmentCount, assignmentSubmitted };

    axiosSecure.post("/assignment", assignment).then((res) => {
      console.log(res.data);
      if (res.data.assignResult.insertedId && res.data.totalAssignResult.modifiedCount > 0) {
        refetch();
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Class Details</h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="border border-gray-600 p-4 rounded mt-5 flex-1">
          <h1 className="text-2xl font-semibold text-center">Total Enroll</h1>
          <div className="flex flex-col md:flex-row gap-10 mt-5 mx-auto justify-center items-center">
            <img className="max-w-60" src={student} alt="" />
            <div>
              <p className="text-2xl font-medium">{item.title}</p>
              <p className="text-xl font font-medium">Total Enrollment : {item.totalEnroll}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-600 p-4 rounded mt-5 flex-1">
          <h1 className="text-2xl font-semibold text-center">Create Assignment</h1>
          <div className="flex flex-col md:flex-row gap-10 mt-5 mx-auto justify-center items-center">

            <div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn bg-green-600 px-4 py-2 rounded-xl text-white items-center"
                onClick={() => document.getElementById("my_modal_1").showModal()}
              >
                <FaPlus />
                Create
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Create Assignment</h3>
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="title" className="font-medium">
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
                        {errors.title && <span className="text-red-600">Title is required</span>}
                      </div>

                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="date" className="font-medium">
                          Assignment Deadline
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          {...register("date", { required: true })}
                          placeholder="Class Title Here"
                          className="w-full rounded-md py-2 px-4 border border-gray-400"
                        />
                        {errors.date && <span className="text-red-600">Date is required</span>}
                      </div>

                      <div className="col-span-full sm:col-span-3">
                        <label htmlFor="description" className="font-medium">
                          Assignment Description
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
                      <button className="btn btn-ghost bg-[#e67e22] text-white hover:text-black">
                        Add Assignment
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
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="border border-gray-600 p-4 rounded mt-5">
          <h1 className="text-2xl font-semibold text-center">Total Assignment</h1>
          <div className="flex flex-col md:flex-row gap-10 mt-5 mx-auto justify-center items-center">
            <img className="max-w-60" src={assignment} alt="" />
            <div>
              <p className="text-2xl font-medium">{item.title}</p>
              <p className="text-xl font font-medium">Total Assignment : {item.totalAssignment}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-600 p-4 rounded mt-5">
          <h1 className="text-2xl font-semibold text-center">Submitted Assignment</h1>
          <div className="flex flex-col md:flex-row gap-10 mt-5 mx-auto justify-center items-center">
            <img className="max-w-60" src={submitted} alt="" />
            <div>
              <p className="text-2xl font-medium">{item.title}</p>
              <p className="text-xl font font-medium">Per Day Submitted : {item.totalSumbit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaClassDetails;
