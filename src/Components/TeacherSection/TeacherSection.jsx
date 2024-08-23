import { Link } from "react-router-dom";
import Btn from "../Btn";
// import Btn from "../../../components/Btn";
import instructor from "../../assets/teacher/instructor.jpg"

const TeacherSection = () => {
    
    return (
        <div className="flex flex-col-reverse md:flex-row-reverse gap-6 items-center justify-center w-11/12 md:w-4/5 mx-auto mt-10 md:mt-20">
            <div className="md:w-1/2 space-y-4 ">
                <h2 className="text-3xl font-bold text-white">Become an Instructor</h2>
                <p>Interested in sharing your knowledge?Click the below button and fill out the form inside it to apply as a teacher on our platform and start inspiring students worldwide!</p>
                <div>
                    <Link to={'/teachOnEduFusion'}>
                        <Btn text={'Start Teaching Today'} />
                    </Link>
                </div>
            </div >
            <div className="bg-white md:w-1/2">
                <img className=" mix-blend-multiply" src={instructor} alt="" />
            </div>
        </div>

    );
};

export default TeacherSection;