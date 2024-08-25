import Marquee from "react-fast-marquee";
import tenmin from "../../assets/partners/10min_schoolw.png"
import codeacademy from "../../assets/partners/codeacademyw.png"
import udemy from "../../assets/partners/udemy-logo (2).png"
import khanacademy from "../../assets/partners/images-removebg-preview (1).png"
import coursera from "../../assets/partners/khan-academy.png"

const OurPartners = () => {
    return (
        <div className="app">
            <h1 className="text-center text-5xl font-bold">Our Partners</h1>
            <Marquee direction='right' speed={150} delay={5}>
                <div className="flex">
                    <div className="flex flex-col items-center m-4 ">
                        <img src={tenmin} alt="" className="w-[150px] h-[100px]" />
                        
                        <p className="text-sm text-gray-600 w-48 text-center">10 Minute School can help EduFusion by providing localized Bengali content, skill development and engaging videos.</p>
                    </div>
                   
                    <div className="flex flex-col items-center m-4 ">
                        <img src={codeacademy} alt="" className="w-[150px] h-[100px]" />
                        
                        <p className="text-sm text-gray-600 w-48 text-center">CodeAcademy specializes in coding and tech skills by partnering with EduFusion provide coding courses and certification paths to students .</p>
                    </div>

                    <div className="flex flex-col items-center m-4 ">
                        <img src={udemy} alt="" className="w-[150px] h-[100px]" />
                        
                        <p className="text-sm text-gray-600 w-48 text-center">Udemy can offer EduFusion access to its extensive catalog of courses across various subjects </p>
                    </div>
                    <div className="flex flex-col items-center m-4 ">
                        <img src={khanacademy} alt="" className="w-[150px] h-[100px]" />
                        
                        <p className="text-sm text-gray-600 w-48 text-center">Coursera provides high-quality, free education content in subjects like math, science, and humanities
                        </p>
                    </div>
                    <div className="flex flex-col items-center m-4 ">
                        <img src={coursera} alt="" className="w-[150px] h-[100px]" />
                        
                        <p className="text-sm text-gray-600 w-48 text-center">Khan Academy provides high-quality, free education content in subjects like math, science, and humanities.
                        </p>
                    </div>

                    
                    
                 
                </div>
            </Marquee>

        </div>
    );
};

export default OurPartners;