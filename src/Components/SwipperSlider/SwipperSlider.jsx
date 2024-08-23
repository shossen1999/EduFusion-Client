import img9 from '../../assets/two.jpg'
import img12 from '../../assets/seven.jpg'
import img11 from '../../assets/marvin-meyer-SYTO3xs06fU-unsplash.jpg'
import img10 from '../../assets/six.jpg'
import React, { useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { EffectFade } from 'swiper/modules';
import { Helmet } from 'react-helmet';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Link, NavLink } from 'react-router-dom';

const SwipperSlider = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Swipper Slider</title>
      </Helmet>

      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
            color: white; /* Change the color of the arrows */
          }

          .swiper-pagination-bullet {
            background-color: blue; /* Change the background color of the dots */
          }

          .slider-container {
            position: relative;
            width: 100%;
            height: 100vh;
          }

          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .slider-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5); /* Darker overlay */
            z-index: 1; /* Ensure overlay is on top */
          }

          .slider-content {
            position: relative;
            z-index: 2; /* Ensure content is above overlay */
            color: white;
            text-align: center;
            padding: 20px;
          }
        `}
      </style>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
        spaceBetween={50}
        effect="fade"
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <div className='slider-container'>
            <img src={img9} alt="" className='slider-image' />
            <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-70 right-0 bottom-0 ' >
            <div className="space-y-4 text-black text-start">
            <div className="text-start flex flex-wrap items-center gap-3 text-2xl lg:text-5xl md:text-3xl  text-white font-bold">
                Welcome to
                <h1 to={'/'} className="flex items-center text-cyan-500 gap-1">EduFusion</h1>

            </div>
            <p className="text-white  italic mt-1 max-w-[750px]">
           EduFusion is an online educational platform that connects passionate teachers with eager learners. Teachers can upload courses, deliver live classes, and assign homework, while students can explore diverse subjects, enroll in courses, and enhance their skills through guided learning paths.
            </p>
          <Link to='/allClasses'>
                <button  className="btn btn-outline mt-2 border-0 border-b-4 border-t-2 border-white text-white px-3 text-xl font-bold ">See All Classes</button>
               </Link>
        </div>
               
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-container'>
            <img src={img10} alt="" className='slider-image' />
            <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-70 right-0 bottom-0 ' >
            <div className="space-y-4 text-black text-start">
            <div className="text-start flex flex-wrap items-center gap-3 text-2xl lg:text-5xl md:text-3xl  text-white font-bold" data-aos = "fade-right">
                Welcome to
                <h1 to={'/'} className="flex items-center text-cyan-500 gap-1" data-aos = "fade-right">EduFusion</h1>

            </div>
            <p className="text-white  italic mt-1 max-w-[750px]">
           EduFusion is an online educational platform that connects passionate teachers with eager learners. Teachers can upload courses, deliver live classes, and assign homework, while students can explore diverse subjects, enroll in courses, and enhance their skills through guided learning paths.
            </p>
          <Link to='/allClasses'>
                <button  className="btn mt-2 btn-outline border-0 border-b-4 border-t-2 border-white text-white px-3 text-xl font-bold ">See All Classes</button>
               </Link>
        </div>
               
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-container'>
            <img src={img11} alt="" className='slider-image' />
            <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-70 right-0 bottom-0 ' >
            <div className="space-y-4 text-black text-start">
            <div className="text-start flex flex-wrap items-center gap-3 text-2xl lg:text-5xl md:text-3xl  text-white font-bold">
                Welcome to
                <h1 to={'/'} className="flex items-center text-cyan-500 gap-1">EduFusion</h1>

            </div>
            <p className="text-white  italic mt-1 max-w-[750px]">
           EduFusion is an online educational platform that connects passionate teachers with eager learners. Teachers can upload courses, deliver live classes, and assign homework, while students can explore diverse subjects, enroll in courses, and enhance their skills through guided learning paths.
            </p>
          <Link to='/allClasses'>
                <button  className="btn btn-outline mt-2 border-0 border-b-4 border-t-2 border-white text-white px-3 text-xl font-bold ">See All Classes</button>
               </Link>
        </div>
               
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-container'>
            <img src={img12} alt="" className='slider-image' />
            <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-70 right-0 bottom-0 ' >
            <div className="space-y-4 text-black text-start">
            <div className="text-start flex flex-wrap items-center gap-3 text-2xl lg:text-5xl md:text-3xl  text-white font-bold">
                Welcome to
                <h1 to={'/'} className="flex items-center text-cyan-500 gap-1">EduFusion</h1>

            </div>
            <p className="text-white  italic mt-1 max-w-[750px]">
           EduFusion is an online educational platform that connects passionate teachers with eager learners. Teachers can upload courses, deliver live classes, and assign homework, while students can explore diverse subjects, enroll in courses, and enhance their skills through guided learning paths.
            </p>
          <Link to='/allClasses'>
                <button  className="btn btn-outline mt-1 border-0 border-b-4 border-t-2 border-white text-white px-3 text-xl font-bold ">See All Classes</button>
               </Link>
        </div>
               
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwipperSlider;
