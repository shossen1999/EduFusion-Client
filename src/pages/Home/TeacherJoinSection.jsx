import React from 'react';
import teacherImage from '../../assets/boy2 (2).jpg';
import { useNavigate } from 'react-router-dom';

const TeacherJoinSection = () => {
    const navigate = useNavigate();

    const handleStartTeachingClick = () => {
        navigate('/teach');
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl flex justify-center items-center py-12">
            <figure className="w-1/2 p-4">
                <img
                    src={teacherImage}
                    alt="Join as a Teacher"
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
            </figure>
            <div className="card-body w-1/2 p-4">
                <h2 className="card-title text-3xl font-bold mb-4">Become an Instructor</h2>
                <p className="mb-6">
                    Instructors from around the world teach millions of learners on [Your Website Name].
                    We provide the tools and skills to teach what you love.
                </p>
                <div className="card-actions justify-start">
                    <button onClick={handleStartTeachingClick} className="btn btn-accent">
                        Start teaching today
                    </button>
                </div>
            </div>
        </div>


    );
};

export default TeacherJoinSection;
