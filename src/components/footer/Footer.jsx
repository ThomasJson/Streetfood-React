import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

import ShoppingCart from "../shoppingCart/ShoppingCart";

import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from '../../contexts/ThemeContext';
import { BiLogInCircle } from "react-icons/bi";

const Footer = ({setShowModal}) => {

  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className={`h-8vh ${theme.bgPrimary}`}>
        <div className="h-full sm:hidden flex flex-row justify-around items-center">
          
          {auth.role < 1 && (
            <button className="button-custom" onClick={() => setShowModal(true)}>
              <div className={`flex flex-row items-center`}>
                <span>
                  <BiLogInCircle className={`text-2xl ${theme.text}`} />
                </span>
              </div>
              <div className="bottom-border"></div>
              <div className="right-border"></div>
              <div className="top-border"></div>
              <div className="left-border"></div>
            </button>
          )}

          {auth.role > 0 && (
            <NavLink to="/account">
              <button className="button-custom">
                <div className="flex flex-row items-center">
                  <span>
                    <AiOutlineUser className={`text-2xl ${theme.text}`} />
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
                <span>
                  <GiHamburgerMenu className={`text-2xl ${theme.text}`} />
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
          © 1994-2023, StreetFood.com, Inc. {t('generic.footer-text')}
        </div>
      </div>
    </>
  );
};

export default Footer;