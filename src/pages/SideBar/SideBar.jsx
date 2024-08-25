import { FaBars,FaHouse,FaUserGroup,FaGripVertical } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import './sidebar.css'
import { FaChalkboardTeacher } from "react-icons/fa";

import logo from '../../assets/All/eduFusionLogo.png'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../Hooks/useAdmin";
import useTeacher from "../../Hooks/useTeacher";
import { FaUser } from "react-icons/fa";

import { CgExtensionAdd } from "react-icons/cg";
import { LiaBookSolid } from "react-icons/lia";
import { GiBookAura } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";


const SideBar = () => {
    const [isAdmin] = useAdmin()
    const [isTeacher] = useTeacher()


    const sideLinks = <>

        <li className="text-white"><NavLink end to={'profile'}><FaUser className="text-2xl" /> Profile</NavLink></li>
        {
            isAdmin &&
            <>
                <li className="text-white"><NavLink end to={'teacherRequest'}><FaChalkboardTeacher className="text-2xl" /> Teacher Request</NavLink></li>
                <li className="text-white"><NavLink end to={'dashAllClass'}><LiaBookSolid className="text-2xl" /> All classes</NavLink></li>
                <li className="text-white"><NavLink end to={'allUsers'}><FaUserGroup className="text-2xl" /> All Users</NavLink></li>

            </>
        }
        {
            isTeacher &&
            <>
                <li className="text-white"><NavLink end to={'addClass'}><CgExtensionAdd className="text-2xl" /> Add Class</NavLink></li>
                <li className="text-white"><NavLink end to={'myClass'}><GiBookCover className="text-2xl" /> My Class</NavLink></li>
            </>
        }
        {
            !isAdmin && !isTeacher && <>
                <li className="text-white"><NavLink end to={'myEnrolledClass'}><FaGripVertical className="text-2xl" /> My Enrolled Class</NavLink></li>
            </>
        }
        <div className="divider "></div>
        <li className="text-white"><NavLink to={'/'}><FaHouse className="text-2xl" /> Home</NavLink></li>
        <li className="text-white"><NavLink to={'/allClasses'}><LiaBookSolid className="text-2xl" /> All Classes</NavLink></li>
        <li className="text-white"><NavLink to={'/teachOnEduFusion'}><GiBookAura className="text-2xl" /> Teach on EduFusion</NavLink></li>

    </>

    return (
        <div className="drawer xl:drawer-open z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col xl:hidden ">
                <label htmlFor="my-drawer-2" className="btn bg-[#7b7b7b] text-white w-fit drawer-button xl:hidden"><FaBars /></label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#7b7b7b] space-y-2">
                    <div className="flex flex-col items-start p-4 text-start">
                        <img className="mix-blend-multiply h-10 " src={logo} alt="" />
                    </div>

                    {sideLinks}
                </ul>

            </div>
        </div>
    );
};



export default SideBar;