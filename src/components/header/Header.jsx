import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from "../../contexts/AuthContext";
import { getCookie } from "../../helpers/cookieHelper";

import ShoppingCart from "../shoppingCart/ShoppingCart";
import CategoryNav from "../../components/categoryNav/CategoryNav";
import ContextSettings from "../contextSettings/ContextSettings";

const Header = ({ setShowModal }) => {

  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  const [ pseudo, setPseudo ] = useState(null);

  useEffect(() => {

    if (auth && auth.id !== "0") {

      const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
      const url = `${baseUrl}/account/${auth.id}`;

      console.log("Fetching user data for ID : ", auth.id);

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: getCookie("StreetF"),
        },

      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          return resp.json();

        })
        .then((json) => {
          setPseudo(json);

        })
        .catch((error) => {
          console.error("Error fetching data:", error);

        });
    }
  }, [auth]);

  // bg-zinc-900 / bg-zinc-800 / bg-zinc-700

  return (
    <>
      <div className="h-header-mobile fixed top-0 left-0 z-50 w-full flex flex-col sm:h-header-desktop">

        <div className={`h-full ${theme.bgPrimary} flex flex-row justify-between items-center px-2`}>

          <div className="flex flex-row items-center w-full justify-between sm:w-6/12 sm:justify-start">

            <NavLink to="/" style={{ width: "135px" }}>
              <div className={`font-Rubik ${theme.text} ml-2 mr-2`}>
                {t('generic.brand')}
              </div>
            </NavLink>

            <div className="px-2">
              <ContextSettings />
            </div>

          </div>

          <div className="hidden sm:flex flex-row items-center w-5/12 justify-end">

            {auth.role < 1 && (
              <button className="button-custom" onClick={() => setShowModal(true)}>
                <div className={`flex flex-row items-center`}>
                  <span>
                    <BiLogInCircle className={`text-2xl ${theme.text}`} />
                  </span>
                  <span className={`hidden sm:flex ml-1 font-Rubik ${theme.text}`}>
                    {t('generic.login')}
                  </span>
                </div>
                <div className="bottom-border"></div>
                <div className="right-border"></div>
                <div className="top-border"></div>
                <div className="left-border"></div>
              </button>
            )}

            {auth.role > 0 && (

              <NavLink
                to="/account"
                className="py-1 px-2 rounded"
              >
                <div className="button-custom font-Raleway">
                  <div className="flex flex-row items-center">
                    <span className="">
                      <AiOutlineUser className={`text-2xl ${theme.text}`} />
                    </span>
                    <span className={`font-bold tracking-wide ${theme.text}`}>{pseudo?.pseudo}</span>
                  </div>
                  <div className="bottom-border"></div>
                  <div className="right-border"></div>
                  <div className="top-border"></div>
                  <div className="left-border"></div>
                </div>
              </NavLink>

            )}

            <ShoppingCart />

          </div>
        </div>

        <CategoryNav />

      </div>
    </>
  );
};

export default Header;