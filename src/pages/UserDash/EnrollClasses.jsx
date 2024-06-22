import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const EnrollClasses = () => {
  const { user } = useAuth();
  const email = user?.email; // Ensure user and email are defined
  const axiosSecure = useAxiosSecure();

  const { data: enroll = [], error, isLoading } = useQuery({
    queryKey: ["enrollClasses", email],
    queryFn: async () => {
      if (!email) {
        console.log("No email found, returning empty array");
        return []; // If email is not available, return an empty array
      }
      try {
        const res = await axiosSecure.get(`/enroll/${email}`);
        console.log("Response data:", res.data); // Log the response data
        return res.data || []; // Ensure the response is always an array
      } catch (err) {
        console.error("Error fetching enroll classes:", err); // Log any errors
        return []; // Return an empty array in case of an error
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Handle and show errors
  }

  if (!Array.isArray(enroll)) {
    return <div>Error: Expected enroll to be an array</div>; // Ensure enroll is an array
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {enroll.map((item) => (
        <div key={item._id}>
          <div className="border border-gray-700 p-4 rounded hover:bg-gray-600 hover:text-white">
            <img className="w-64" src={item.image} alt={item.title} />
            <p className="mt-2">
              <span className="font-medium">Title : </span>{item.title}
            </p>
            <p>
              <span className="font-medium">Post : </span>{item.name}
            </p>
            <Link to={`/dashboard/my-enroll-class-details/${item._id}`}>
              <button className="btn btn-ghost btn-sm mt-1 bg-[#e67e22] text-white hover:text-black">
                Continue
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrollClasses;
