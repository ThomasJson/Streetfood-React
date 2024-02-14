import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { SlHome } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

import ShoppingCart from "../shoppingCart/ShoppingCart";

import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from '../../contexts/ThemeContext';
import LoginModal from "../loginModal/LoginModal";

const Footer = () => {

  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className={`h-8vh ${theme.bgPrimary}`}>
        <div className="h-full sm:hidden flex flex-row justify-around items-center">
          <NavLink to="/">
            <button className="button-custom">
              <div className="flex flex-row items-center">
                <span className="">
                  <SlHome className="text-2xl" />
                </span>
              </div>
              <div className="bottom-border"></div>
              <div className="right-border"></div>
              <div className="top-border"></div>
              <div className="left-border"></div>
            </button>
          </NavLink>

          {auth.role < 1 && <LoginModal />}

          {auth.role > 0 && (
            <NavLink to="/account">
              <button className="button-custom">
                <div className="flex flex-row items-center">
                  <span className="">
                    <AiOutlineUser className="text-2xl" />
                  </span>
                </div>
                <div className="bottom-border"></div>
                <div className="right-border"></div>
                <div className="top-border"></div>
                <div className="left-border"></div>
              </button>
            </NavLink>
          )}

          <ShoppingCart />

          <NavLink to="/category">
            <button className="button-custom">
              <div className="flex flex-row items-center">
                <span className="">
                  <GiHamburgerMenu className="text-2xl" />
                </span>
              </div>
              <div className="bottom-border"></div>
              <div className="right-border"></div>
              <div className="top-border"></div>
              <div className="left-border"></div>
            </button>
          </NavLink>
        </div>

        <div className={`h-full hidden sm:flex justify-center items-center font-Rubik ${theme.text}`}>
          © 1994-2023, StreetFood.com, Inc. or its affiliates
        </div>
      </div>
    </>
  );
};

export default Footer;