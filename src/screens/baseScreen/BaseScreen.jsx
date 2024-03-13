import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoginModal from '../../components/loginModal/LoginModal';
import { ThemeContext } from '../../contexts/ThemeContext';

const BaseScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  // {
  //   "name": "dark",
  //   "tName": "theme.dark",

  //   "bgPrimary": "bg-zinc-900",
  //   "bgSecondary": "bg-zinc-800",
  //   "bgTertiary": "bg-zinc-700",

  //   "text": "text-white",
  //   "label": "text-gray-300",

  //   "bgHover": "hover:bg-green-500",
  //   "textHover": "hover:text-white"
  // }

  // {
  //   "name": "light",
  //   "tName": "theme.light",
  
  //   "bgPrimary": "bg-gray-50",
  //   "bgSecondary": "bg-gray-100",
  //   "bgTertiary": "bg-gray-200",
  
  //   "text": "text-black",
  //   "label": "text-gray-700",
  
  //   "bgHover": "hover:bg-green-500",
  //   "bgHover2": "hover:bg-orange-500",
  //   "textHover": "hover:text-white"
  // }

  return (
    <>
      <div className="box-border">

        <Header setShowModal={setShowModal} />
        <LoginModal show={showModal} setShow={setShowModal} />

        <div className={`mainFooterContainer ${theme.bgTertiary}`}>
          
          <main>
            <Outlet />
          </main>

          <Footer setShowModal={setShowModal} />
          
        </div>

      </div>
    </>
  );
};

export default BaseScreen;