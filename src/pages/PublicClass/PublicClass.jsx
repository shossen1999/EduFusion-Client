import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const PublicClass = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classAll = [], isLoading, error } = useQuery({
    queryKey: ["publicClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allclasses");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(classAll); // Add this line to log the received data

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-10">All Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.isArray(classAll) && classAll.map((item) => (
          <div
            key={item._id}
            className="border border-gray-700 bg-orange-100 rounded-sm p-4 mt-5 items-center justify-center"
          >
            <div>
              <img className="w-full max-h-48 rounded" src={item.image} alt="" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-semibold">Title : {item.title}</h3>
              <div className="text-lg">
                <p>Name : {item.name}</p>
              </div>
              <div>
                <p>Price : ${item.price}</p>
              </div>
              <p>Short Description : {item.shortDes}</p>
            </div>

            <div className="flex gap-10 items-center">
              <p>Total Enrollment : {item.totalEnroll}</p>
              <Link to={`/public-class-details/${item._id}`}>
                <button className="btn btn-ghost btn-sm bg-[#e67e22] text-white hover:text-black">
                  Enroll
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicClass;
