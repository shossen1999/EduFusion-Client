import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const title = data.title;
    const name = data.name;
    const image = data.image;
    const email = data.email;
    const price = data.price;
    const shortDes = data.shortDes;
    const description = data.description;
    const status = "pending";
    const totalEnroll = 0;
    const totalAssignment = 0;
    const totalSumbit = 0;
    const classInfo = {title, name, email, image, price, shortDes, description, status , totalEnroll, totalAssignment, totalSumbit};
    console.log(classInfo);

    axiosSecure.post('/class', classInfo)
    .then(res => {
        console.log(res.data);
        if(res.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your class has been added waiting for approval",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/my-class")
        }
    })
  };

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Add Class</h1>

        {/* from start */}
        <section className="p-6 border border-gray-600 bg-gray-200 mt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md">
              <div className="grid grid-cols-6 gap-4 col-span-full">
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="title" className="font-medium">
                    Class Title
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
                  <label htmlFor="image" className="font-medium">
                    Image Url
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="text"
                    {...register("image", { required: true })}
                    placeholder="Image Url Here"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  {errors.image && <span className="text-red-600">ImageURL is required</span>}
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="name" className="font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user?.displayName}
                    disabled
                    placeholder="Enter you name"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  <input type="hidden" defaultValue={user.displayName} {...register("name")} />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    placeholder="Enter your email"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  <input type="hidden" defaultValue={user.email} {...register("email")} />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="price" className="font-medium">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Price"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  {errors.price && <span className="text-red-600">Price is required</span>}
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="shortDes" className="font-medium">
                    Short Description
                  </label>
                  <textarea
                    id="shortDes"
                    name="shortDes"
                    type="text"
                    {...register("shortDes", { required: true })}
                    placeholder="Description write here"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  {errors.shortDes && <span className="text-red-600">Short Description is required</span>}
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    {...register("description", { required: true })}
                    rows={4}
                    placeholder="Description write here"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  {errors.description && <span className="text-red-600">Description is required</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-ghost col-span-full text-white bg-[#e67e22]"
                >
                  Add Class
                </button>
              </div>
            </fieldset>
          </form>
        </section>
        {/* from end */}
      </div>
    </div>
  );
};

export default AddClass;
