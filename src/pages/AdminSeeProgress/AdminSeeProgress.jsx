import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Rating } from '@material-tailwind/react';

const AdminSeeProgress = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: feedback = [], isPending } = useQuery({
        queryKey: ['feedback', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedback?id=${id}`);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <span className="loading loading-spinner loading-lg"></span>
        );
    }

    if (!feedback.length) {
        return (
            <div className="h-full w-full flex items-center justify-center text-2xl text-blue-400 font-bold">
                No feedback found on this class!
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Feedback on {feedback[0]?.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedback.map((item) => (
                    <div key={item._id} className="bg-[#D3E5E2] shadow-lg h-auto text-black rounded-xl flex flex-col justify-between p-5">
                       
                        <div className="flex justify-end mb-4">
                            <img src="https://i.ibb.co/N6pc4Wh/Quotation-Mark-PNG-Picture.png" alt="quote" className="w-[40px] h-[30px]" />
                        </div>

                       
                        <h2 className="text-xl font-bold underline underline-offset-4 text-center mb-2">{item.className}</h2>

                       
                        <p className="text-[14px] text-center mb-4">{item.description}</p>

                       
                        <div className="w-[120px] h-[120px] rounded-full mx-auto mb-4 overflow-hidden">
                            <img src={item.classImage} alt="Class" className="object-cover w-full h-full" />
                        </div>

                        
                        <div className="flex justify-center mb-4">
                            <Rating value={parseInt(item.rating)} readonly />
                        </div>

                       
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full border border-black overflow-hidden">
                                <img src={item.userImage} alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className='text-[16px] font-medium'>{item.userName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSeeProgress;
