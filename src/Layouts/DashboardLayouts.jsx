import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import useTeacher from "../Hooks/useTeacher";

const DashboardLayouts = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  return (
    <div className="max-w-7xl mx-auto lg:px-0 flex">
      <div className="w-36 md:w-64 min-h-screen bg-orange-600">
        <ul className="menu lg:p-4 text-white">
          {user && isAdmin && (
            <div>
              <li>
                <NavLink to="/dashboard/admin-home">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/teacher-request">Teacher Request</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-classes">All Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </div>
          )}
          {user && !isAdmin && !isTeacher && (
            <div>
              <li>
                <NavLink to="/dashboard/user-home">User Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/enroll-classes">My Enroll Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </div>
          )}
          {user && isTeacher && (
            <div>
              <li>
                <NavLink to="/dashboard/teacher-home">Teacher Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-class">Add Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-class">My Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>

      <div className="flex-1 p-1 md:p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayouts;
