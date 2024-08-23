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
        element:<ClassDetails></ClassDetails>
       },
       {
        path:'/payment/:id',
        element:<Payment></Payment>
       },

    
      {
        path: "/teachOnEduFusion",
        element: <TeachOnEduFusion></TeachOnEduFusion>
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
        element: <TeacherRequest></TeacherRequest>
    },
     
       {
        path: "allUsers",
        element:<AllUsers></AllUsers>
      },
      {
        path: 'dashAllClass',
        element:<DashboardAllClasses></DashboardAllClasses>
      },
     
      

      {
        path:'addClass',
        element:<AddClass></AddClass>
      },
      {
        path:'myClass',
        element:<MyClass></MyClass>
      },
      {
          path:'updateClass/:id',
          element:<UpdateClass></UpdateClass>
      },
      {
        path:'teacherSeeDetails/:id',
        element:<TeacherSeeDetails></TeacherSeeDetails>

      },
     
      {
        path:"profile",
        element:<Profile></Profile>
      },
      {
          path: 'myEnrolledClass',
          element: <MyEnrollClass></MyEnrollClass>
      },
      {
        path:'studentContinueDetails/:id',
        element:<StudentContinueDetails></StudentContinueDetails>

      },
      {
        path:'adminSeeProgress/:id',
        element:<AdminSeeProgress></AdminSeeProgress>

      },

      
    ]
  }
]);

export default router;
