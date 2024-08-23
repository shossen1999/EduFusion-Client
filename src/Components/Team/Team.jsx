import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Importing specific modules from 'swiper/modules'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import slide_image_1 from '../../assets/team/kabila.jpg';
import slide_image_2 from '../../assets/team/hamza.jpeg';
import slide_image_3 from '../../assets/team/kruishi2.jpeg';
import slide_image_4 from '../../assets/team/Reza.jpg';
import slide_image_5 from '../../assets/team/sabina.jpeg';
import slide_image_6 from '../../assets/team/sakline.jpg';
import slide_image_7 from '../../assets/team/bahar.jpg';

const Team = () => {
    return (
        <div className="container my-4">
           <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl mb-6"> Our Team</h1>
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={false}  // Disable centering
                loop={true}
                slidesPerView={3}  // Show 3 slides side by side
                spaceBetween={30}  // Optional: Add space between slides
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="swiper_container"
            >
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_1} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                            <p className="text-xl font-semibold leading-tight">Sakline Mustak</p>
                            <h3 className="text-lg font-bold">CEO</h3>
                        </div>

                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_2} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                        <p className="text-xl font-semibold leading-tight">Shariful Reza</p>
                        <p>Chief Technology Officer (CTO)</p>
                        </div>

                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_3} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                        <p className="text-xl font-semibold leading-tight">Saraban Nazim</p>
                        <p>Head of Content Development</p>
                        </div>

                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_4} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                        <p className="text-xl font-semibold leading-tight">Jabir Saleh</p>
                        <p>Marketing Director</p>
                        </div>

                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_5} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                        <p className="text-xl font-semibold leading-tight">Nasruddin Hamza</p>
                        <p>(UX) Designer</p>
                        </div>

                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_6} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                        <p className="text-xl font-semibold leading-tight">Rased Bin Setu</p>
                        <p>Educational Consultant</p>
                        </div>

                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-[280px]h-[360px] bg-center bg-cover">
                        <img src={slide_image_7} className="block w-full h-[90%]" />
                        <div className="text-center mt-2">
                        <p className="text-xl font-semibold leading-tight">Jafran koruishi</p>
                        <p>Educational Consultant</p>
                        </div>

                    </div>

                </SwiperSlide>

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default Team;
