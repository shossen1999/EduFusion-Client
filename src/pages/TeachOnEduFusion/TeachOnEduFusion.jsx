// src/pages/TeachOnEduFusion.jsx
import React, { useContext, useState } from 'react';
import useAuth from '../../hooks/useAuth';
// import { AuthContext } from '../context/AuthProvider';

const TeachOnEduFusion = () => {
    const { user } = useAuth();
    const [experience, setExperience] = useState('beginner');
    const [category, setCategory] = useState('Web Development');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            experience,
            title,
            category
        };

        try {
            const response = await fetch('https://edu-fusion-server.vercel.app/teacher-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();
            if (data.success) {
                setMessage('Your request has been submitted for review.');
            } else {
                setMessage('Failed to submit request.');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            setMessage('Failed to submit request.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Apply to Teach</h2>
            {message && <p>{message}</p>}
            {!message && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Experience Level</label>
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-Level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Submit for Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default TeachOnEduFusion;
