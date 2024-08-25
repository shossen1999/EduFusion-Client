
import { FaUsersViewfinder } from "react-icons/fa6"
import { SiGoogleclassroom } from "react-icons/si";

import enroll from "../../assets/teacher/enroll.png"
import useWebDetail from "../../Hooks/useWebDetail";

const WebDetails = () => {
  const [webDetail, isPending] = useWebDetail()
  if (isPending) {
      return (
        <span className="loading loading-spinner loading-lg"></span>
      )
  }
  return (
    <div>
      <div className="p-4 rounded mt-5 flex-1">
    
        <div className="flex gap-5">
          <div className=" gap-10 mt-5 mx-auto justify-center items-center border border-gray-600 p-5 w-full">
            <p className="text-9xl flex justify-center">
              <FaUsersViewfinder />
            </p>
            <div>
              <p className="text-2xl font-medium"></p>
              <p className="text-xl font font-medium text-center">Total User : {webDetail.userCount}</p>
            </div>
          </div>

          <div className=" gap-10 mt-5 mx-auto justify-center items-center border border-gray-600 p-4 w-full">
            <p className="text-9xl flex justify-center">
              <SiGoogleclassroom />
            </p>
            <div>
              <p className="text-2xl font-medium"></p>
              <p className="text-xl font font-medium text-center">
                Total Classes : {webDetail.allClassCount}
              </p>
            </div>
          </div>

          <div className=" gap-10 mt-5 mx-auto justify-center items-center border border-gray-600 p-4 w-full">
            <p className="text-9xl flex justify-center ">
            <img src={enroll} className="w-[100px] h-[100px] m-3" />
            </p>
            <div>
              <p className="text-2xl font-medium"></p>
              <p className="text-xl font font-medium text-center">
                Total Enrollment : {webDetail.totalEnrollment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDetails;
