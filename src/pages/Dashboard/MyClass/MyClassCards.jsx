import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyClassCards = ({ myClass, classes, setClasses }) => {
    const { _id, title, price, description, image, email, name } = myClass;

    const handleUpdate = (classId) => {
        console.log("Update class with ID:", classId);
    };

   const handleDelete = (_id) => {
    console.log("handleDelete called with id:", _id); // Logging the id
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("User confirmed deletion");
            fetch(`http://localhost:5000/delete/${_id}`, {
                method: 'DELETE'
            })
            .then(res => {
                console.log("Fetch response:", res);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log("Response data:", data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your class has been deleted.",
                        icon: "success"
                    });

                    // Update the state to remove the deleted class
                    const remaining = classes.filter(cl => cl._id !== _id);
                    setClasses(remaining);
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the class.",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error("Error deleting item:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error deleting the class.",
                    icon: "error"
                });
            });
        } else {
            console.log("User cancelled deletion");
        }
    });
};


    return (
        <div className="card bg-base-100 shadow-xl mx-10 md:mx-5 lg:mx-5 border border-gray-200">
            <div className='flex justify-start items-center gap-2 p-4'>
                <div>
                    <img src={image} className='w-[40px] h-[40px] rounded-full' alt={title} />
                </div>
                <div>
                    <h3>{name}</h3>
                    <h3>{email}</h3>
                </div>
            </div>
            <figure className="px-10 pt-10">
                <img src={image} className="rounded-2xl w-full h-[180px]" alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    <span className="font-bold">Title: </span> {title}
                </h2>
                <p className="text-[14px]">
                    <span className="font-bold">Price: </span> ${price}
                </p>
                <p className="text-[14px]">
                    <span className="font-bold">Description: </span> {description}
                </p>
                
                <div className="card-actions w-full">
                    <Link to={`/dashboard/classDetails/${_id}`} className="btn" style={{ backgroundColor: "#18555b", color: "white" }}>See Details</Link>
                    <Link to={`/dashboard/updateClass/${_id}`}>
                        <button
                            className="btn"
                            style={{ backgroundColor: "#18555b", color: "white" }}
                            onClick={() => handleUpdate(_id)}
                        >
                            Update
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn"
                        style={{ backgroundColor: "#18555b", color: "white" }}
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MyClassCards;
