import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import ErrorElement from "../ErrorElement/ErrorElement";

import DashboardLayouts from "../Layouts/DashboardLayouts";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";

import SignUp from './../pages/SignUp/SignUp';
import SignIn from './../pages/SignIn/SignIn';
import Home from './../pages/Home/Home';
import TeachOnEduFusion from './../pages/TeachOnEduFusion/TeachOnEduFusion';
import AdminHome from './../pages/AdminDash/AdminHome';
import TeacherRequ from './../pages/AdminDash/TeacherRequ';
import Users from './../pages/AdminDash/Users';
import AllClasses from './../pages/AllClasses/AllClasses';
import UserProfile from './../pages/UserProfile';
import UserHome from './../pages/UserDash/UserHome';
import EnrollClasses from './../pages/UserDash/EnrollClasses';
import TeacherHome from './../pages/TeacherDash/TeacherHome';
// import AddClass from './../pages/Dashboard/AddClass/AddClass';
import MyClass from './../pages/TeacherDash/MyClass';
import UpdateClass from './../pages/TeacherDash/UpdateClass';
import PublicClass from './../pages/PublicClass/PublicClass';
// import ClassDetails from './../pages/Dashboard/ClassDetails/ClassDetails';
import Payment from './../pages/Payment/Payment';
import TeaClassDetails from './../pages/TeacherDash/TeaClassDetails';
import MyEnrollClassDetails from './../pages/StudentDashboard/MyEnrollClassDetails/MyEnrollClassDetails';
import SeeProgress from './../pages/AdminDash/SeeProgress';
import AddClass from './../pages/TeacherDash/AddClass';
import ClassDetails from './../pages/ClassDetails/ClassDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/public-classes",
        element: <PublicClass></PublicClass>
      },
      {
        path: "/public-class-details/:id",
        element: <ClassDetails></ClassDetails>
      },
      {
        path : "/payment/:id",
        element: <Payment></Payment>
      },
      {
        path: "/teach-on-lear-ease",
        element: <TeachOnEduFusion></TeachOnEduFusion>
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayouts></DashboardLayouts></PrivateRoutes>,
    children: [
      // admin routes
      {
        path: "admin-home",
        element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
      },
      {
        path: "teacher-request",
        element: <AdminRoutes><TeacherRequ></TeacherRequ></AdminRoutes>
      },
      {
        path: "users",
        element: <AdminRoutes><Users></Users></AdminRoutes>
      },
      {
        path: "all-classes",
        element: <AdminRoutes><AllClasses></AllClasses></AdminRoutes>
      },
      {
        path: "see-progress/:id",
        element: <AdminRoutes><SeeProgress></SeeProgress></AdminRoutes>
      },
      // admin routes

      // teacher routes
      {
        path: "teacher-home",
        element: <TeacherHome></TeacherHome>
      },
      {
        path: "add-class",
        element: <AddClass></AddClass>
      },
      {
        path: "my-class",
        element: <MyClass></MyClass>
      },
      {
        path: "update-class/:id",
        element: <UpdateClass></UpdateClass>
      },
      {
        path: "teacher-class/:id",
        element: <TeaClassDetails></TeaClassDetails>
      },
      // teacher routes

      // user routes
      {
        path: "user-home",
        element: <UserHome></UserHome>
      },
      {
        path: "enroll-classes",
        element: <EnrollClasses></EnrollClasses>
      },
      {
        path: "my-enroll-class-details/:id",
        element: <MyEnrollClassDetails></MyEnrollClassDetails>
      },
      // user routes

      // shared routes
      {
        path: "profile",
        element: <UserProfile></UserProfile>
      }
      // shared routes
    ]
  }
]);

export default router;
