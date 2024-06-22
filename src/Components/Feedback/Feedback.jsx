import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();

  const { data: feed = [], isLoading, isError, error } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/rate");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(feed)) {
    return <div>No feedback available.</div>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl md:text-5xl font-bold text-center mb-5">Feedback Section</h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {feed.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="border border-gray-600 p-4 text-center">
              <div className="w-28 rounded-full mx-auto">
                <img src={item.photo} alt="" />
              </div>
              <p>
                <span className="text-lg font-medium">Name: </span>
                {item.userName}
              </p>
              <p>
                <span className="text-lg font-medium">Title: </span>
                {item.title}
              </p>
              <p className="flex justify-center">
                <ReactStars count={5} value={item.rate} size={50} activeColor="#ffd700" />
              </p>
              <p>
                <span className="text-lg font-medium">Feedback: </span>
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
