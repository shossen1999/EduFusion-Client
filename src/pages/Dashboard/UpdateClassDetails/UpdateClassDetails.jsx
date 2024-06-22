// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import Swal from 'sweetalert2';
// // import useAuth from '../../hooks/useAuth';
// import { useParams } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';

// const UpdateClassDetails = () => {

//     const { user } = useAuth();
//     const { id } = useParams();
//     console.log(id);

//     const [classDetails, setClassDetails] = useState({});

//     useEffect(() => {
//         fetch(`https://edu-fusion-server.vercel.app/singleClass/${id}`)
//             .then(res => res.json())
//             .then(data => {
//                 setClassDetails(data);
//                 console.log(data);
//             });
//     }, [id]);

//     const handleUpdateClass = event => {
//         event.preventDefault();

//         const form = event.target;
//         const title = form.title.value;
//         const price = form.price.value;
//         const description = form.description.value;
//         const image = form.image.value;
//         const name = user?.displayName;
//         const email = user?.email;
//         const photo = user?.photoURL;
//         // const currentDate = new Date();

//         const updatedClass = {
//             title, price, description, photo, email, name,image
//         };

//         fetch(`https://edu-fusion-server.vercel.app/updateClass/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(updatedClass)
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (data.modifiedCount > 0) {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'Class Updated Successfully',
//                     icon: 'success',
//                     confirmButtonText: 'Cool'
//                 });
//                 // form.reset();
//             }
//         })
//     }

//     return (
//         <div className="bg-[#F4F3F0] p-24">
//             <Helmet>
//                 <title>Update Class</title>
//             </Helmet>
//             <h2 className="text-3xl font-extrabold">Update Class</h2>

//             <form onSubmit={handleUpdateClass} className="card-body">
//                 {/* Form Row 1 */}
//                 <div className="md:flex gap-5">
//                     <div className="form-control md:w-1/2">
//                         <label className="label">
//                             <span className="label-text">Title</span>
//                         </label>
//                         <input type="text" name="title" defaultValue={classDetails.title} placeholder="Class Title" className="input input-bordered w-full" required />
//                     </div>
//                     <div className="form-control md:w-1/2">
//                         <label className="label">
//                             <span className="label-text">Price</span>
//                         </label>
//                         <input type="number" name="price" defaultValue={classDetails.price} placeholder="Class Price" className="input input-bordered w-full" required />
//                     </div>
//                 </div>

//                 {/* Form Row 2 */}
//                 <div className="md:flex gap-5">
//                     <div className="form-control md:w-1/2">
//                         <label className="label">
//                             <span className="label-text">Description</span>
//                         </label>
//                         <input type="text" name="description" defaultValue={classDetails.description} placeholder="Class Description" className="w-full input input-bordered" required />
//                     </div>
//                     <div className="form-control md:w-1/2">
//                         <label className="label">
//                             <span className="label-text">Image URL</span>
//                         </label>
//                         <input type="text" name="image" defaultValue={classDetails.image} placeholder="Image URL" className="input input-bordered w-full" required />
//                     </div>
//                 </div>

//                 {/* Form Row 3 */}
//                 <div className="md:flex gap-5">
//                     <div className="form-control md:w-1/2">
//                         <label className="label">
//                             <span className="label-text">Name</span>
//                         </label>
//                         <input type="text" name="name" value={user?.displayName} className="input input-bordered w-full" readOnly />
//                     </div>
//                     <div className="form-control md:w-1/2">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input type="email" name="email" value={user?.email} className="input input-bordered w-full" readOnly />
//                     </div>
//                 </div>

//                 <input className="btn btn-block bg-black text-white mt-8" type="submit" value="Update Class" />
//             </form>
//         </div>
//     );
// };

// export default UpdateClassDetails;
