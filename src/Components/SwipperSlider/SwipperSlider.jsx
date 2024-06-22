
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
// import Aos from 'aos'
// import 'aos/dist/aos.css'


const SwipperSlider = () => {
  // useEffect(()=>{
  //   Aos.init({duration:2000,disable: 'mobile'})
  // },[])
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
      <SwiperSlide >
        <div className='relative'>
          <img src={img9} alt="" style={{ width: "100%", height: "100vh" }} />
        </div>
       
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative'>
          <img src={img10} alt="" style={{ width: "100%", height: "100vh" }} />
        </div>
      
      </SwiperSlide>
     
      <SwiperSlide>
        <div className='relative'>
          <img src={img11} alt="" style={{ width: "100%", height: "100vh" }} />
        </div>
       
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative'>
          <img src={img12} alt="" style={{ width: "100%", height: "100vh" }} />
        </div>
       
      </SwiperSlide>

    </Swiper>
    
    </>
    
  );
};

export default SwipperSlider;