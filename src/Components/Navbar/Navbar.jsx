import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../../assets/All/eduFusionLogo.png";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";


const Navbar = () => {
  
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  const handleToggle = (e) => {
      if (e.target.checked) {
          setTheme("dark");
      }
      else {
          setTheme("light");
      }
  };
  useEffect(() => {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const { signOutUser, user, disName, photoLink } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  // const navigate = useNavigate();

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
      setMenuOpen(false);
  };



  const handleRouteClick = () => {
      closeMenu();
  };




  const handleSignOut = () => {
    signOutUser();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Sign out successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 relative z-[10]">
    <Helmet>
        <title>Navbar</title>
    </Helmet>
    <div className="navbar-start">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            {menuOpen && (
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={handleRouteClick}><NavLink className={({ isActive }) => isActive ? 'text-[#23BE0A] font-semibold text-[18px]' : 'font-semibold text-[18px] '} to="/">Home</NavLink></li>
                    <li onClick={handleRouteClick}><NavLink className={({ isActive }) => isActive ? 'text-[#23BE0A] font-semibold text-[18px]' : 'font-semibold text-[18px] '} to="/public-classes">All Classes</NavLink></li>
                    <li onClick={handleRouteClick}><NavLink className={({ isActive }) => isActive ? 'text-[#23BE0A] font-semibold text-[18px]' : 'font-semibold text-[18px] '} to="/teach-on-lear-ease">Teach on EduFusion</NavLink></li>
                </ul>
            )}
        </div>
        <Link to='/' className="btn btn-ghost font-bold normal-case text-3xl">
            <span style={{ backgroundColor: theme === "dark" ? "#9EF7CC" : "transparent", padding: "5px", borderRadius: "5px" }}>
                <img src={logo} alt="Logo" />
            </span>
        </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            <li><NavLink className={({ isActive }) => isActive ? 'text-[#23BE0A] font-semibold text-[18px]' : 'font-semibold text-[18px] '} to="/">Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'text-[#23BE0A] font-semibold text-[18px]' : 'font-semibold text-[18px] '} to="/public-classes">All Classes</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'text-[#23BE0A] font-semibold text-[18px]' : 'font-semibold text-[18px] '} to="/teach-on-lear-ease">Teach on EduFusion</NavLink></li>
        </ul>
    </div>
    <div className="navbar-end">
        <label className="swap swap-rotate mr-4">
            <input type="checkbox" onChange={handleToggle} />
            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label>
        {user ? (
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User" src={user.photoURL ? user.photoURL : photoLink} className="h-full w-full mx-auto rounded-full" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li className="justify-between">
                        <span>{user.displayName || 'Username'}</span>
                    </li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><button onClick={handleSignOut}>Logout</button></li>
                </ul>
            </div>
        ) : (
            <div className="flex gap-2 animate_animated animate_fadeInRight">
                <Link to='/sign-in'><button className="btn btn-accent btn-outline font-bold">Login</button></Link>
                {/* <Link to='/register'><button className="btn btn-accent btn-outline font-bold">Register</button></Link> */}
            </div>
        )}
    </div>
</div>
  );
};

export default Navbar;