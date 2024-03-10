import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoginModal from '../../components/loginModal/LoginModal';
import { ThemeContext } from '../../contexts/ThemeContext';

const BaseScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  // "name": "dark",
  // "tName": "theme.dark",
  // "bgPrimary": "bg-zinc-900",
  // "bgSecondary": "bg-zinc-800",
  // "bgTertiary": "bg-zinc-700",
  // "text": "text-white",
  // "label": "text-gray-300",
  // "bg-hover": "hover:bg-zinc-700",
  // "text-hover": "hover:text-white",
  // "link": "link-light",
  // "shadow": "shadow-light"

  // "name": "light",
  // "tName": "theme.light",
  // "bgPrimary": "bg-gray-50",
  // "bgSecondary": "bg-gray-100",
  // "bgTertiary": "bg-gray-200",
  // "text": "text-black",
  // "label": "text-gray-700",
  // "bg-hover": "hover:bg-gray-200",
  // "text-hover": "hover:text-black",
  // "link": "link-dark",
  // "shadow": "shadow-dark"

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