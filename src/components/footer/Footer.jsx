import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

import ShoppingCart from "../shoppingCart/ShoppingCart";

import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from '../../contexts/ThemeContext';
import { BiLogInCircle } from "react-icons/bi";

const Footer = ({ setShowModal, setUserModal }) => {

  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className={`h-footer sm:hidden w-full fixed bottom-0 left-0 ${theme.bgPrimary}`}>

        <div className="h-full flex flex-row justify-around items-center">

          {auth.role < 1 && (
            <button className="p-3" onClick={() => setShowModal(true)}>
              <div className={`flex flex-row items-center`}>
                <span>
                  <BiLogInCircle className={`text-2xl ${theme.text}`} />
                </span>
              </div>
            </button>
          )}

          {auth.role > 0 && (
            <button className={`rounded-lg p-3 ${theme.text} ${theme.textHover} hover:bg-blue-500`} onClick={() => setUserModal(true)}>
              <div className={`flex flex-row items-center`}>

                <span><AiOutlineUser className={`text-2xl`} /></span>

              </div>
            </button>
          )}

          <ShoppingCart />

          <NavLink to="/category">
            <button className="p-3">
              <div className="flex flex-row items-center">
                <span>
                  <GiHamburgerMenu className={`text-2xl ${theme.text}`} />
                </span>
              </div>
            </button>
          </NavLink>
        </div>

      </div>

      <div className={`h-footer hidden sm:flex justify-center items-center font-Rubik ${theme.text} ${theme.bgPrimary}`}>
        © 2023-2024, StreetFood.com, Inc. {t('generic.footer-text')}
      </div>
    </>
  );
};

export default Footer;