import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoginModal from '../../components/loginModal/LoginModal';

const BaseScreen = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="h-screen box-border">
        <Header setShowModal={setShowModal}/>
        <LoginModal show={showModal} setShow={setShowModal} />
        <Outlet />
        <Footer setShowModal={setShowModal}/>
      </div>
    </>
  );
};

export default BaseScreen;