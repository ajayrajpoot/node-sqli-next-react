
// import React from "react";
import axiosWithReauth from "../../api/axios";
import { toast } from "react-toastify"; 
 
export const Login = async (username, password) => {
  try {
    console.log("Login--",username, password)
    const rData = await axiosWithReauth({
      method: "POST",
      url: "/api/login",
      data:  { username, password },
    });

    return rData;
 
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("An error occurred while logging in");
  }
};

export const Logout = async () => {
  try { 
    const response = await axiosWithReauth({
      method: "POST",
      url: "/api/logout",
    });
 
    localStorage.clear();
  
    return response;
  } catch (error) {
    console.error("Error logout in:", error);
    toast.error("An error occurred while logout in");
  }
};
export const RefreshToken = async () => {
  try {
    const response = await axiosWithReauth({
      method: "GET",
      url: "/api/refresh",
    });
  

    return response;
  } catch (error) {
    console.error("Error logout in:", error);
    toast.error("An error occurred while logout in");
  }
};
 
 