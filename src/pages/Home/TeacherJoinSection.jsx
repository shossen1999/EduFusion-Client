
import teacherImage from '../../assets/teacher.jpg';
import {  useNavigate } from 'react-router-dom';

const TeacherJoinSection = () => {
    const navigate = useNavigate();

    const handleStartTeachingClick = () => {
        navigate('/teach');
    };

    return (
        <div className='flex flex-col md:flex-row gap-20 items-center max-w-5xl mx-auto mt-10'>
<div className='bg-orange-700 bg-opacity-50 w-96'>
    <img src={teacherImage} alt="" />
</div>
<div className='text-center'>
    <h2 className='text-3xl font-semibold'>Become an Instructor</h2>
    <p className='mt-3 md:mt-5 text-xl'> Instructors from around the world teach millions of learners on EduFusion.
                    We provide the tools and skills to teach what you love.</p>
    <button 
    onClick={handleStartTeachingClick}
    className='btn bg-[#225ae6] text-white text-lg mt-3 md:mt-5'>Start teaching today</button>
</div>
</div>


    );
};

export default TeacherJoinSection;
{/* <div className='flex flex-col md:flex-row gap-20 items-center max-w-5xl mx-auto mt-10'>
<div className='bg-orange-700 bg-opacity-50 w-96'>
    <img src={teacher} alt="" />
</div>
<div className='text-center'>
    <h2 className='text-5xl font-semibold'>Become a Teacher</h2>
    <p className='mt-3 md:mt-5 text-xl'> Instructors from around the world teach millions of learners on EduFusion.
                    We provide the tools and skills to teach what you love.</p>
    <Link to='/teach-on-lear-ease'><button className='btn bg-[#e67e22] text-white text-lg mt-3 md:mt-5'>Start teaching today</button></Link>
</div>
</div> */}