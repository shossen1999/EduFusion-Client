import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClassDetailsAll = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`https://edu-fusion-server.vercel.app/classes/${id}`);
                const data = await response.json();
                setClassDetails(data);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, [id]);

    if (!classDetails) {
        return <div>Loading...</div>;
    }

    const handlePayButtonClick = () => {
        navigate(`/payment/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{classDetails.title}</h2>
            <p className="text-gray-700 mb-2">Teacher: {classDetails.name}</p>
            <p className="text-gray-700 mb-2">Price: ${classDetails.price}</p>
            <p className="text-gray-700 mb-2">Description: {classDetails.description}</p>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handlePayButtonClick}
            >
                Pay Button
            </button>
        </div>
    );
};

export default ClassDetailsAll;
