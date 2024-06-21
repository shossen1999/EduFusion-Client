import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEduFusion from "../pages/TeachOnEduFusion/TeachOnEduFusion";
import Dashboard from "../layouts/Dashboard";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import UpdateClassDetails from "../pages/Dashboard/UpdateClassDetails/UpdateClassDetails";
// import ClassDetails from "../pages/AllClasses/ClassDetailsAll";
import ClassDetails from "../pages/Dashboard/ClassDetails/ClassDetails";
import ClassDetailsAll from "../pages/AllClasses/ClassDetailsAll";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
     
      children:[
        {
            path:"/",
            element:<Home></Home>,
           
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/allClasses",
          element:<AllClasses></AllClasses>
        },
        {
          path:"/teach",
          element:<TeachOnEduFusion></TeachOnEduFusion>
        },
        {
          path:"/classes/:id",
          element:<ClassDetailsAll></ClassDetailsAll>
        }
        
        
        
        
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:"myClass",
          element:<MyClass></MyClass>

        },
        {
          path:"addClass",
          element:<AddClass></AddClass>
          
        },
        {
          path:"updateClass/:id",
          element:<UpdateClassDetails></UpdateClassDetails>

        },
        {
          path:"classDetails/:id",
          element:<ClassDetails></ClassDetails>,
          loader:({params})=>fetch(`http://localhost:5000/classes/${params.id}`)
        },
      ]
    }
  ]);

  export default router;