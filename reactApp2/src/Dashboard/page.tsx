import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import MenuBar from "../components/MenuBar";     
const PaymentListPage: React.FC = () => { 
 
  return ( 
    <>  
      <MenuBar/>
      <Outlet/> 

    </>
  );
};

export default PaymentListPage;

