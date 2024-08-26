import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data = [], isPending } = useQuery({
    queryKey: ['classDetails', { id }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?id=${id}`);
      return res.data;
    }
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const aClass = data.length > 0 ? data[0] : {};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
       <Helmet>
                <title>Home | Class Details</title>
            </Helmet>
      <div className="md:flex md:space-x-6">
        {/* Left Column - Image */}
        <div className="md:w-1/2">
          <img
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            src={aClass.image}
            alt={aClass.title}
          />
        </div>

        {/* Right Column - Content */}
        <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
          <h1 className="text-4xl font-extrabold text-gray-800">{aClass.title}</h1>
          <p className="text-lg font-semibold text-gray-600">Instructor: {aClass.name}</p>
          <p className="text-md text-gray-500">Email: {aClass.email}</p>
          <p className="text-lg text-gray-800 font-semibold">
            Price: <span className="text-2xl text-blue-600">${aClass.price}</span>
          </p>
          <p className="text-md text-gray-700 leading-relaxed">{aClass.description}</p>

          <div className="w-full ">
              <Link to={`/payment/${aClass._id}`} className="mx-auto">
                  <button className="font-bold text-white px-4 py-2 rounded-full bg-[#7b7b7b]  hover:bg-cyan-700">PAY</button>
              </Link>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
