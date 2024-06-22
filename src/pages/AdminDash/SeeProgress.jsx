import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const SeeProgress = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: feed = [] } = useQuery({
    queryKey: ["adminFeed"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rate/${id}`);
      return res.data;
    },
  });

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {
        feed.map(item => <div className="border border-gray-600 p-4 text-center" key={item._id}>
            <div className="w-28 rounded-full mx-auto">
              <img src={item.photo} alt="" />
            </div>
            <p>
              <span className="text-lg font-medium">Name : </span>
              {item.userName}
            </p>
            <p>
              <span className="text-lg font-medium">Title : </span>
              {item.title}
            </p>
            <p className="flex justify-center">
              <ReactStars count={5} value={item.rate} size={50} activeColor="#ffd700" />
            </p>
            <p>
              <span className="text-lg font-medium">Feedback : </span>
              {item.description}
            </p>
          </div>)
    }
  </div>;
};

export default SeeProgress;
