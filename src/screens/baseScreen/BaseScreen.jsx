import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoginModal from '../../components/loginModal/LoginModal';
import { ThemeContext } from '../../contexts/ThemeContext';
import UserModal from '../../components/userModal/UserModal';

const BaseScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [userModal, setUserModal] = useState(false);

  // {
  //   "name": "dark",
  //   "tName": "theme.dark",

  //   "bgPrimary": "bg-zinc-900",
  //   "bgSecondary": "bg-zinc-800",
  //   "bgTertiary": "bg-zinc-700",

  //   "borderColor": "border-white",

  //   "text": "text-white",
  //   "label": "text-gray-300",

  //   "bgHover": "hover:bg-gray-50",
  //   "bgHoverGreen": "hover:bg-green-500",
  //   "bgHoverOrange": "hover:bg-orange-500",
  //   "textHover": "hover:text-white"
  // }

  // {
  //   "name": "light",
  //   "tName": "theme.light",

  //   "bgPrimary": "bg-gray-50",
  //   "bgSecondary": "bg-gray-100",
  //   "bgTertiary": "bg-gray-200",

  //   "borderColor": "border-black",

  //   "text": "text-black",
  //   "label": "text-gray-700",

  //   "bgHover": "hover:bg-zinc-900",
  //   "bgHoverGreen": "hover:bg-green-500",
  //   "bgHoverOrange": "hover:bg-orange-500",
  //   "textHover": "hover:text-white"
  // }

  return (
    <>

      <div>
        <Header setShowModal={setShowModal} setUserModal={setUserModal} />
        <LoginModal show={showModal} setShow={setShowModal} />
        <UserModal show={userModal} setShow={setUserModal} />
      </div>

      <div id='mainAndFooterContainer' className={`${theme.bgTertiary}`}>

        <main>
          <Outlet />
        </main>

        <Footer setShowModal={setShowModal} setUserModal={setUserModal} />

      </div>

    </>
  );
};

export default BaseScreen;