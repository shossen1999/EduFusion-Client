// import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { GiEngagementRing } from "react-icons/gi";

const WebDetails = () => {
  const axiosPublic = useAxiosPublic();

  const [data, setData] = useState();

  // const {data, isLoading} = useQuery({
  //   queryKey: ["publicDetails"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/publicuser");
  //     return res.data;
  //   }
  // });

  useEffect(() => {
    axiosPublic.get("/publicuser").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [axiosPublic]);

  // console.log(data)
  //  if(isLoading){
  //   return <p>Loading....</p>
  //  }
  return (
    <div>
      <div className="p-4 rounded mt-5 flex-1">
        <h1 className="text-2xl md:text-5xl font-semibold text-center">Total User And Resource</h1>
        <div className="flex gap-5">
          <div className=" gap-10 mt-5 mx-auto justify-center items-center border border-gray-600 p-5 w-full">
            <p className="text-9xl flex justify-center">
              <FaUsers />
            </p>
            <div>
              <p className="text-2xl font-medium"></p>
              <p className="text-xl font font-medium text-center">Total User : {data?.userResult?.length}</p>
            </div>
          </div>

          <div className=" gap-10 mt-5 mx-auto justify-center items-center border border-gray-600 p-4 w-full">
            <p className="text-9xl flex justify-center">
              <SiGoogleclassroom />
            </p>
            <div>
              <p className="text-2xl font-medium"></p>
              <p className="text-xl font font-medium text-center">
                Total Classes : {data?.classResult?.length}
              </p>
            </div>
          </div>

          <div className=" gap-10 mt-5 mx-auto justify-center items-center border border-gray-600 p-4 w-full">
            <p className="text-9xl flex justify-center">
            <GiEngagementRing />
            </p>
            <div>
              <p className="text-2xl font-medium"></p>
              <p className="text-xl font font-medium text-center">
                Total Enrollment : {data?.enrollResult?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDetails;
