import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layouts = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
   
  );
};

export default Layouts;
