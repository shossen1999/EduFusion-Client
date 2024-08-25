import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import ErrorElement from "../ErrorElement/ErrorElement";


import PrivateRoutes from "./PrivateRoutes";

import Home from './../pages/Home/Home';
import TeachOnEduFusion from './../pages/TeachOnEduFusion/TeachOnEduFusion';

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Profile from '/src/pages/Profile/Profile.jsx';
import MyEnrollClass from "../pages/MyEnrollClass/MyEnrollClass";
import AllUsers from "../pages/AllUsers/AllUsers";
import TeacherRequest from "../pages/TeacherRequest/TeacherRequest";
import AddClass from "../pages/AddClass/AddClass";
import MyClass from "../pages/MyClass/MyClass";
import DashboardAllClasses from "../pages/DashboardAllClasses/DashboardAllClasses";
import AllClasses from "../pages/AllClasses/AllClasses";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import Payment from "../pages/Payment/Payment";
import UpdateClass from "../pages/UpdateClass/UpdateClass";
import TeacherSeeDetails from "../pages/TeacherSeeDetails/TeacherSeeDetails";
import StudentContinueDetails from "../pages/StudentContinueDetails/StudentContinueDetails";
import AdminSeeProgress from "../pages/AdminSeeProgress/AdminSeeProgress";
import AdminRoutes from './AdminRoutes';



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
        path:'/allClasses',
        element:<AllClasses></AllClasses>
       },
       {
        path:'/classDetails/:id',
        element:<PrivateRoutes><ClassDetails></ClassDetails></PrivateRoutes>
       },
       {
        path:'/payment/:id',
        element:<Payment></Payment>
       },

    
      {
        path: "/teachOnEduFusion",
        element:<PrivateRoutes> <TeachOnEduFusion></TeachOnEduFusion></PrivateRoutes>
      },
     
      {
          path: '/register',
          element: <Register />
      },
      {
          path: '/login',
          element: <Login />
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: 'teacherRequest',
        element: <PrivateRoutes><AdminRoutes><TeacherRequest></TeacherRequest></AdminRoutes></PrivateRoutes>
    },
    {
      path: 'dashAllClass',
      element:<PrivateRoutes><AdminRoutes><DashboardAllClasses></DashboardAllClasses></AdminRoutes></PrivateRoutes>
    },
     
       {
        path: "allUsers",
        element:<PrivateRoutes><AdminRoutes><AllUsers></AllUsers></AdminRoutes></PrivateRoutes>
      },
      
     
      

      {
        path:'addClass',
        element:<PrivateRoutes><AddClass></AddClass></PrivateRoutes>
      },
      {
        path:'myClass',
        element:<PrivateRoutes><MyClass></MyClass></PrivateRoutes>
      },
      {
          path:'updateClass/:id',
          element:<PrivateRoutes><UpdateClass></UpdateClass></PrivateRoutes>
      },
      {
        path:'teacherSeeDetails/:id',
        element:<PrivateRoutes><TeacherSeeDetails></TeacherSeeDetails></PrivateRoutes>

      },
     
      {
        path:"profile",
        element:<PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      {
          path: 'myEnrolledClass',
          element: <PrivateRoutes><MyEnrollClass></MyEnrollClass></PrivateRoutes>
      },
      {
        path:'studentContinueDetails/:id',
        element:<PrivateRoutes><StudentContinueDetails></StudentContinueDetails></PrivateRoutes>

      },
      {
        path:'adminSeeProgress/:id',
        element:<PrivateRoutes><AdminSeeProgress></AdminSeeProgress></PrivateRoutes>

      },

      
    ]
  }
]);

export default router;
