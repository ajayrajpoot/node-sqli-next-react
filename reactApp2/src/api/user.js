// import React from "react";
import axiosWithReauth from "./axios";
import { toast } from "react-toastify";

export const getUsers = async ( ) => {
  try { 
    const rData = await axiosWithReauth({
      method: "GET",
      url: "/api/users",
      //   data:  { username, password },
    });

    return rData;
  } catch (error) {
    console.error("Error fetch userd list in:", error);
    toast.error("An error occurred while fetch userd list in");
  }
};

export const addUsers = async (newUser) => {
  try {
    const rData = await axiosWithReauth({
      method: "POST",
      url: "/api/users/add",
      data: newUser,
    });

    return rData;
  } catch (error) {
    console.error("Error add new user in:", error);
    toast.error("An error occurred while add new user in");
  }
};

export const updateUsers = async (userId, user) => {
  try {
    const rData = await axiosWithReauth({
      method: "PUT",
      url: `/api/users/update/${userId}`,
      data: user,
    });

    return rData;
  } catch (error) {
    console.error("Error update user in:", error);
    toast.error("An error occurred while update user in");
  }
};

export const deleteUsers = async (userId) => {
  try {
    const rData = await axiosWithReauth({
      method: "DELETE",
      url: `/api/users/delete/${userId}`,
    });

    return rData;
  } catch (error) {
    console.error("Error delete in:", error);
    toast.error("An error occurred while delete in");
  }
};
