import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEduFusion from "../pages/TeachOnEduFusion/TeachOnEduFusion";

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
        
        
        
      ]
    },
  ]);

  export default router;