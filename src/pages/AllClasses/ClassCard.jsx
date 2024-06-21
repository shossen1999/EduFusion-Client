// src/components/ClassCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = ({ classInfo }) => {
    const {_id, title, name, image, price, description, enrollment } = classInfo;

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-cover" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">By: {name}</p>
                <p className="text-gray-700 text-base mb-2">{description}</p>
                <p className="text-gray-700 text-base">Price: ${price}</p>
                <p className="text-gray-700 text-base">Total Enrollment: {enrollment}</p>
                <Link to={`/classes/${_id}`} className="btn" style={{ backgroundColor: "#18555b", color: "white" }}>Enroll</Link>
                {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"></button> */}
            </div>
        </div>
    );
};

export default ClassCard;
