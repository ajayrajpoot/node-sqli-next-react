import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link } from "react-router-dom";
import { useLocation, Navigate, Outlet } from "react-router-dom"; 

const NotPermmisionPage: React.FC = () => { 
  const location = useLocation()

  return (
    <>    
    <p style={{ textAlign: "center", fontWeight: "bold" , color:"white" }}>No permission
    
    <Link to="/login" state={{ from: location }} replace >Login</Link>
    </p>

    </>
  );
};

export default NotPermmisionPage;

