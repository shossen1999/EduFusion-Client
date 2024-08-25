import { Link } from "react-router-dom";
import useClasses from "../../Hooks/useClasses";
import Btn from "../Btn";
import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const HighlightClass = () => {
    const status = 'accepted';
    const [classes, refetch, classPending] = useClasses(status);
    const popularClasses = [...classes].sort((a, b) => b.total_enrollment - a.total_enrollment);

    if (classPending) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="h-[600px] container mx-auto my-10">
            <h1 className="text-center text-3xl font-bold mb-4">Popular Classes</h1>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                breakpoints={{
                    425: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                className="my-swiper"
            >
                {popularClasses.slice(0, 6).map((singleClass, idx) => (
                    <SwiperSlide key={idx}>
                        <div className='border border-grey mb-12'> 
                        <div >
                            <img src={singleClass.image} alt={singleClass.title} className="relative h-[290px] w-full bg-no-repeat " />
                          
                        </div>
                        <div className='p-4'>
                        <h1 className="text-xl font-bold text-white underline underline-offset-8">{singleClass.title}</h1>
                            <div className='flex flex-col '>
                            <p className="text-white">Enrolled: {singleClass.total_enrollment}</p>
                            <p className="text-white">Instructor: {singleClass.name}</p>
                            <p className="text-white">Price: ${singleClass.price}</p>
                            <div className="flex-1 h-full flex items-center justify-center">
                                    <Link className="w-full" to={`/classDetails/${singleClass._id}`}>
                                        <button className="px-4 py-2 rounded-full bg-[#7b7b7b] btn-block text-white font-bold hover:bg-cyan-700">
                                            Enroll
                                        </button>
                                    </Link>
                                </div>
                         
                            </div>
                          
                        </div>
                        </div>
                      
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex items-center justify-center py-4">
                <Link to="/allClasses">
                    <Btn text="See All Classes" />
                </Link>
            </div>
        </div>
    );
};

export default HighlightClass;
