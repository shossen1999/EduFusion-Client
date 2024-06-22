import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateClass = () => {
  const {id} = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: item = [] } = useQuery({
    queryKey: ["updateDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/updateclass/${id}`);
      return res.data;
    },
  });
  // console.log(item)


  const onSubmit = async (data) => {
    console.log(data);
    const title = data.title;
    const image = data.image;
    const price = data.price;
    const shortDes = data.shortDes;
    const description = data.description;
    const classInfo = {title, image, price, shortDes, description};
    console.log(classInfo);

    const res = await axiosSecure.patch(`/updateclass/${id}`, classInfo)
    if(res.data.modifiedCount > 0){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Class update successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Update Class</h1>

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
                    defaultValue={item.title}
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
                    defaultValue={item.image}
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
                    defaultValue={item.name}
                    disabled
                    placeholder="Enter you name"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  <input type="hidden" defaultValue={item.name} {...register("name")} />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={item.email}
                    disabled
                    placeholder="Enter your email"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  <input type="hidden" defaultValue={item.email} {...register("email")} />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="price" className="font-medium">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={item.price}
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
                    defaultValue={item.shortDes}
                    {...register("shortDes", { required: true })}
                    placeholder="Description write here"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  {errors.shortDes && (
                    <span className="text-red-600">Short Description is required</span>
                  )}
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    defaultValue={item.description}
                    {...register("description", { required: true })}
                    rows={4}
                    placeholder="Description write here"
                    className="w-full rounded-md py-2 px-4 border border-gray-400"
                  />
                  {errors.description && (
                    <span className="text-red-600">Description is required</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-ghost col-span-full text-white bg-[#e67e22]"
                >
                  Update
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

export default UpdateClass;
