// import React from 'react';
// import { Helmet } from 'react-helmet';
// import { Link, useLoaderData } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// // import useAuth from '../../hooks/useAuth';

// const ClassDetails = () => {
//     const classDetails = useLoaderData();
//     const { user } = useAuth();
//     const { _id, title, price, description, image, email, name } = classDetails;

//     return (
//         <div>
//             <Helmet>
//                 <title>Class Details</title>
//             </Helmet>
//             <div className="flex flex-col md:flex-row lg:flex-row gap-10 bg-gray-200">
//                 <div className="md:w-[40%] lg:w-[40%] w-full">
//                     <img className="p-5 rounded-[20px] w-full h-auto object-cover" src={image} alt="" />
//                 </div>

//                 <div className="p-10 md:p-5 lg:p-5 flex flex-col space-y-2">
//                     <div className='flex justify-start items-center gap-2 p-4'>
//                         <div>
//                             <h3>{name}</h3>
//                         </div>
//                     </div>
//                     <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
//                     <p className="text-[18px]">
//                         <span className="font-bold text-[16px]">Price: </span>{price}
//                     </p>
//                     <p><span className="font-bold text-[16px]">Description: </span> {description}</p>
//                     <div className="flex gap-2">
//                         <div className="flex items-center gap-2">
//                             <p className="font-bold">Username: </p>
//                         </div>
//                         <p>{name}</p>
//                     </div>
//                     <div className="flex gap-2">
//                         <div className="flex items-center gap-2">
//                             <p className="font-bold">Useremail: </p>
//                         </div>
//                         <p>{email}</p>
//                     </div>
//                     <Link to="/"> <button className="btn" style={{ backgroundColor: "#18555b", color: "white" }} >Go Back To Home</button></Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClassDetails;
