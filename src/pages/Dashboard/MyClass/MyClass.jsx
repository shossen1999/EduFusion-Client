import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MyClassCards from './MyClassCards';
import useAuth from '../../../hooks/useAuth';

const MyClasses = () => {
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (user?.email) {
            const fetchClasses = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/classes/user/${user.email}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setClasses(data);
                } catch (error) {
                    console.error('Error fetching classes:', error);
                }
            };

            fetchClasses();
        }
    }, [user]);

    const sortedClasses = classes.sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate));

    return (
        <div>
            <Helmet>
                <title>My Classes</title>
            </Helmet>

            <header>
                <div
                    className="w-full bg-center bg-cover h-[28rem]"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')`,
                    }}
                >
                    <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                        <div className="text-center">
                            <Link to="/addClass">
                                <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                    Add Class
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <h1 className='text-center text-3xl font-bold m-4'>My Classes</h1>

            {sortedClasses.length === 0 ? (
                <div className="flex flex-col items-center mt-10">
                    <p className="text-xl font-semibold">No classes available at the moment</p>
                    <Link to="/addClass">
                        <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Add Class
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedClasses.map(myClass => (
                            <MyClassCards
                                key={myClass._id}
                                classes={classes}
                                setClasses={setClasses}
                                myClass={myClass}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center my-5 md:my-8 lg:my-8">
                <Link to="/">
                    <button className="btn" style={{ backgroundColor: "#18555b", color: "white" }}>Go Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default MyClasses;
