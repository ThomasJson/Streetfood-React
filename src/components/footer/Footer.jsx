import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

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
      <footer className={`footerMobile ${theme.bgPrimary}`}>

        <div className="h-full w-full flex flex-row justify-around items-center">

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

      </footer>

      <footer className={`footerDesktop ${theme.text} ${theme.bgPrimary}`}>
        <div className="w-full px-4 flex flex-row justify-between items-center">

          <div className="w-1/3">© 2023-2024, streetFood.digital, Inc. {t('footer.footerText')}</div>

          <div className="w-1/4 flex flex-row justify-between items-center">

            <NavLink
              to="/terms"
              className={({ isActive }) =>
                isActive ? 'flex transition-colors duration-150 ease-in-out text-orange-400' : `flex transition-colors duration-150 ease-in-out relative ${theme.linkTextHover}`
              }
            >
              <span className="relative group">
                {t('footer.terms')}
                {/* <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-150 ease-out"></span> */}
              </span>
            </NavLink>

            <div className="w-px mt-0.5 h-4 border-r-2 border-zinc-300"></div>

            <NavLink
              to="/privacy"
              className={({ isActive }) =>
              isActive ? 'flex transition-colors duration-150 ease-in-out text-orange-400' : `flex transition-colors duration-150 ease-in-out relative ${theme.linkTextHover}`              }
            >
              <span className="relative group">
                {t('footer.privacy')}
                {/* <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-150 ease-out"></span> */}
              </span>
            </NavLink>

            <div className="w-px mt-0.5 h-4 border-r-2 border-zinc-300"></div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
              isActive ? 'flex transition-colors duration-150 ease-in-out text-orange-400' : `flex transition-colors duration-150 ease-in-out relative ${theme.linkTextHover}`              }
            >
              <span className="relative group">
                {t('footer.contact')}
                {/* <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-150 ease-out"></span> */}
              </span>
            </NavLink>

          </div>

          <div className="w-1/3 flex flex-row justify-end">
            <div className={`flex flex-row items-center gap-1 p-2 rounded-lg hover:bg-blue-400 ${theme.textHover}`}>
              <FaGithub className="text-xl" />
              <a href="https://github.com/ThomasJson" target="blank">Tom Pearson</a>
            </div>
          </div>

        </div>

      </footer>
    </>
  );
};

export default Footer;