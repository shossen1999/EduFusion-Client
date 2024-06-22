import { useEffect } from "react";
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css';
import newsletter from "../../assets/All/newsletter.jpg";
const NewsLetter = () => {

    const handleSubscribe = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;

        if(email){
            return Swal.fire({
                title: 'Success!',
                text: 'Newsletter Subscribe Successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              })
        }
    };

    useEffect(() => {
      // Initialize AOS when the component mounts
      AOS.init({
        duration: 800, // Animation duration
        easing: 'ease-in-out', // Animation easing function
        once: false // Animation occurs only once
      });
    }, []);

  return (
    <div className="mt-10">
        <p className="text-4xl text-center font-bold sm:text-6xl">Newsletter</p>
      <section>
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div data-aos="zoom-in-down" className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={newsletter}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div data-aos="zoom-in-up" className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              <span className="text-[#e67e22]">Subscribe</span>
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              You can subscribe our newsletter,to get news and updates in email
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input className="rounded-lg border border-gray-700 px-3" required name="email" id="email" type="email" placeholder="Enter your email" />
                <button className="btn btn-ghost bg-[#e67e22] text-white" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
