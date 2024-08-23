import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Rating } from '@material-tailwind/react';
import useFeedback from '../../Hooks/useFeedback';

export default function Feedback() {
    const { feedback } = useFeedback();

    return (
        <div className="container mx-auto my-10">
            <h1 className='text-center text-3xl font-bold mb-10'>REVIEWS</h1>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                breakpoints={{
                    300: { slidesPerView: 1, spaceBetween: 10 },
                    425: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    1280: { slidesPerView: 4, spaceBetween: 40 },
                }}
                className="my-swiper"
            >
                {
                    feedback.map((text, idx) => (
                        <SwiperSlide key={idx}>
                            <div className='bg-[#D3E5E2] shadow-lg mb-12 h-[400px] text-black rounded-xl flex flex-col justify-between p-5'>
                                {/* Quotation Mark */}
                                <div className="flex justify-end mb-4">
                                    <img src="https://i.ibb.co/N6pc4Wh/Quotation-Mark-PNG-Picture.png" alt="quote" className="w-[40px] h-[30px]" />
                                </div>

                                {/* Class Name */}
                                <h2 className='text-xl font-bold underline underline-offset-4 text-center'>{text.className}</h2>

                                {/* Description */}
                                <p className="text-[14px] text-center mt-3 mb-4">{text.description}</p>

                                {/* Class Image */}
                                <div className="w-[120px] h-[120px] rounded-full mx-auto mb-4 overflow-hidden">
                                    <img src={text.classImage} alt="Class" className="object-cover w-full h-full" />
                                </div>

                                {/* Rating */}
                                <div className="flex justify-center mb-4">
                                    <Rating value={parseInt(text.rating)} readonly />
                                </div>

                                {/* User Info */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full border border-black overflow-hidden">
                                        <img src={text.userImage} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className='text-[16px] font-medium'>{text.userName}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
