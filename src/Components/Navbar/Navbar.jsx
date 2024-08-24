import { Link, NavLink } from "react-router-dom";
import './navbar.css'
// import Btn from "../../components/Btn";
import { useContext, useState } from "react";
// import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import logo from '../../assets/All/eduFusionLogo.png'
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Sign out successfully')
            })
            .catch()
    }

    const links = <>
        <li><NavLink className={'text-[18px] font-bold'} to={'/'}>Home</NavLink></li>
        <li><NavLink className={'text-[18px] font-bold'} to={'/allClasses'}>All Classes</NavLink></li>
        <li><NavLink className={'text-[18px] font-bold'} to={'/teachOnEduFusion'}>Teach on EduFusion</NavLink></li>
    </>
    return (
        <div className="w-full  bg-[#7b7b7b] sticky z-10 top-0 text-white">
            <div className="navbar md:w-4/5 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown m-0">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#002244] rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link className="text-2xl font-black text-white" to={'/'}>
                        <img className="mix-blend-multiply h-10 " src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-bottom dropdown-end hover:cursor-pointer">
                                    <div tabIndex={0}>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full border-2 border-gray-400 bg-gray-200">
                                                <img src={user.photoURL} alt="User Avatar" className="object-cover w-full h-full rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-lg rounded-lg w-64 bg-cyan-900 text-white border border-gray-200">
                                        <div className="flex flex-col gap-2">
                                            <div
                                                role="menuitem"
                                                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="font-semibold text-lg">{user.displayName}</span>
                                            </div>
                                            <Link className="w-full" to={'/dashboard/profile'}>
                                                <button
                                                    role="menuitem"
                                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                                                >
                                                    Dashboard
                                                </button>
                                            </Link>
                                            <hr className="border-gray-300" role="menuitem" />
                                            <div
                                                role="menuitem"
                                                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <button onClick={handleLogOut} className="w-full text-left text-red-600 font-bold">
                                                    Log Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </>
                            :
                            <>
                                <Link to={'/login'}> Sign In</Link>
                                <Link to={'/register'}>Sign Up</Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
