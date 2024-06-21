import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdAddToDrive } from "react-icons/md";
import { MdWidgets } from "react-icons/md";
const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink></li>
                    <li><NavLink to="/dashboard/myClass"><MdWidgets></MdWidgets>My Class</NavLink></li>
                    <li><NavLink to="/dashboard/addClass"><MdAddToDrive></MdAddToDrive>Add Class</NavLink></li>
                    <li><NavLink to="/dashboard/myProfile"><CgProfile></CgProfile>My Profile</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>

                </ul>

            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;