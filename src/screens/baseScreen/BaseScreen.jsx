import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const BaseScreen = () => {

  return (
    <>
      <div className="h-screen box-border">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default BaseScreen;