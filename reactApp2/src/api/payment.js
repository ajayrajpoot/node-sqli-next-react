// import React from "react";
import axiosWithReauth from "./axios";
import { toast } from "react-toastify";

export const paymentAetailAll = async ( ) => {
  try { 
    const rData = await axiosWithReauth({
      method: "GET",
      url: "/api/payment-detail-all", 
    });

    return rData;
  } catch (error) {
    console.error("Error fetch userd list in:", error);
    toast.error("An error occurred while fetch userd list in");
  }
};


export const paymentDetail = async ( data ) => {
  try { 
    const rData = await axiosWithReauth({
      method: "POST",
      url: "/api/payment-detail", 
      data: data
    });

    return rData;
  } catch (error) {
    console.error("Error fetch userd list in:", error);
    toast.error("An error occurred while fetch userd list in");
  }
};


export const addPaymentConfirmation = async (formData) => {
  try {
    const rData = await axiosWithReauth({
      method: "POST",
      url: "/api/payment-confirmation", 
      data: formData,
    });

    return rData;
  } catch (error) {
    console.error("Error submit payment-confirmation :", error);
    toast.error("An error submit payment-confirmation ");
  }
};

export const updatePaymentStatus = async (selectedPaymentId, selectedStatus) => {
  try {
    const rData = await axiosWithReauth({
      method: "PUT",
      url: `/api/payment-detail/update-status/${selectedPaymentId}`,
      data: { status: selectedStatus },
    });
    

    return rData;
  } catch (error) {
    console.error("Error update user in:", error);
    toast.error("An error occurred while update user in");
  }
};
 