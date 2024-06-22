// src/pages/AllClasses/AllClasses.jsx
import React, { useEffect, useState } from 'react';
import ClassCard from './ClassCard';
// import ClassCard from '../../components/ClassCard';

const AllClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('https://edu-fusion-server.vercel.app/classes');
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Classes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {classes.map(classInfo => (
                    <ClassCard key={classInfo._id} classInfo={classInfo} />
                ))}
            </div>
        </div>
    );
};

export default AllClasses;
