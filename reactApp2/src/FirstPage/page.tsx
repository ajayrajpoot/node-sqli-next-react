import React from "react";

// import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import { ToastContainer } from "react-toastify";
import useTitle from "../hooks/useTitle";

const FirstPage = () => {
  useTitle('Index')
  return <>
    <Header></Header>
    <Banner></Banner>
    <Section3></Section3>
    <Section4></Section4>
    <Section5></Section5>
    <ToastContainer />
  </>;
};
export default FirstPage;
