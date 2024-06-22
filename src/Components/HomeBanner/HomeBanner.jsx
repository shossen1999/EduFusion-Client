import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../assets/banner/banner-1.jpg";
import banner2 from "../../assets/banner/banner-2.jpg";
import banner3 from "../../assets/banner/banner-3.jpg";
import banner4 from "../../assets/banner/banner-4.jpg";
import banner5 from "../../assets/banner/banner-5.jpg";

const HomeBanner = () => {
  return (
    <div>
      <Carousel className="text-center">
        <div className="relative">
          <img className="max-h-[550px] object-fill w-full" src={banner1} />
          <div className="absolute top-1/4 left-10 md:left-20 z-10 text-left">
            <h1 className="text-white uppercase text-3xl md:text-7xl font-semibold">improve<br/> your<span className="text-[#e67e22]"> skill</span></h1>
            <p className="text-white text-xs md:text-xl max-w-80 md:max-w-2xl mt-1 md:mt-5">Join our classes to enhance your skills and knowledge, advancing your career or pursuing new interests efficiently.</p>
            <button className="btn bg-[#e67e22] border-none shadow-xl text-white md:text-lg mt-3">Join Now</button>
          </div>
        </div>

        <div className="relative">
          <img className="max-h-[550px] object-fill w-full" src={banner3} />
          <div className="absolute top-1/4 left-10 md:left-20 z-10 text-left">
            <h1 className="text-white uppercase text-3xl md:text-7xl font-semibold">learn without <br /><span className="text-[#e67e22]">limits</span></h1>
            <p className="text-white text-xs md:text-xl max-w-80 md:max-w-2xl mt-1 md:mt-5">Discover endless opportunities for growth with our diverse classes. Learn new skills and expand your knowledge without boundaries.</p>
            <button className="btn bg-[#e67e22] border-none shadow-xl text-white md:text-lg mt-3 md:mt-5">More Details</button>
          </div>
        </div>

        <div className="relative">
          <img className="max-h-[550px] object-fill w-full" src={banner4} />
          <div className="absolute top-1/4 left-10 md:left-20 z-10 text-left">
            <h1 className="text-white uppercase text-3xl md:text-7xl font-semibold">Learn your desired skill <br /> from the<span className="text-orange-700">Experts</span></h1>
            <p className="text-white text-xs md:text-xl max-w-80 md:max-w-2xl mt-1 md:mt-5">Unlock your potential with expert guidance. Master your desired skills efficiently and confidently.</p>
            <div className="flex gap-3 md:gap-5">
            <button className="btn bg-[#e67e22] border-none shadow-xl text-white md:text-lg mt-3 md:mt-5">SignUp</button>
            <button className="btn bg-[#e67e22] border-none shadow-xl text-white md:text-lg mt-3 md:mt-5">View Classes</button>
            </div>
          </div>
        </div>

        <div className="relative">
          <img className="max-h-[550px] object-fill w-full" src={banner5} />
          <div className="absolute top-1/4 left-10 md:left-20 z-10 text-left">
            <h1 className="text-white uppercase text-3xl md:text-7xl font-semibold">Expertise <br /><span className="text-orange-700">Unleashed</span></h1>
            <p className="text-white text-xs md:text-xl max-w-80 md:max-w-2xl mt-1 md:mt-5">Discover your potential with expert-led learning. Master your desired skills and unleash your full capabilities.</p>
            <button className="btn bg-[#e67e22] border-none shadow-xl text-white md:text-lg mt-3 md:mt-5">View Details</button>
          </div>
        </div>

        <div className="relative">
          <img className="max-h-[550px] object-fill w-full" src={banner2} />
          <div className="absolute top-1/4 left-10 md:left-20 z-10 text-left">
            <h1 className="text-white uppercase text-3xl md:text-7xl font-semibold">Forge <br /><span className="text-orange-700">Your Future</span></h1>
            <p className="text-white text-xs md:text-xl max-w-80 md:max-w-2xl mt-1 md:mt-5">Empower your ambitions with our expert mentors. Forge skills that shape your destiny and inspire greatness.</p>
            <button className="btn bg-[#e67e22] border-none shadow-xl text-white md:text-lg mt-3 md:mt-5">Join Class</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeBanner;
