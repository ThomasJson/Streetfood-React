import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoginModal from '../../components/loginModal/LoginModal';
import { ThemeContext } from '../../contexts/ThemeContext';

const BaseScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="box-border">
        <Header setShowModal={setShowModal}/>
        <LoginModal show={showModal} setShow={setShowModal} />

        <main className={`w-full overflow-auto h-main-mobile mt-main-mobile mb-main-mobile sm:h-main-desktop sm:mt-main-desktop sm:mb-0 ${theme.bgTertiary}`}>
          <Outlet />
        </main>

        <Footer setShowModal={setShowModal}/>
      </div>
    </>
  );
};

export default BaseScreen;