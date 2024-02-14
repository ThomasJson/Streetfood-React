import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from "../../contexts/AuthContext";
import { getCookie } from "../../helpers/cookieHelper";

import LoginModal from "../loginModal/LoginModal";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import ContextSettings from "../contextSettings/ContextSettings";

const Header = () => {

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
          Authorization: getCookie("blog"),
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

  return (
    <>

      <div className="flex sm:hidden h-8vh justify-center items-center bg-zinc-800">
        {/* TODO : Mobile */}
      </div>

      <div className="hidden sm:flex h-8vh w-full flex-col">
        <div className={`h-full ${theme.bgClass} flex flex-row justify-between items-center px-2`}>
          <div className="flex flex-row items-center w-8/12">
            <NavLink to="/">
              <div className={`font-Rubik ${theme.text} ml-2 mr-2`}>
                StreetFood.com
              </div>
            </NavLink>
            <div className="w-8/12 px-2">
              <ContextSettings />
            </div>
          </div>
          <div className="flex flex-row items-center w-4/12 justify-end">
            {auth.role < 1 && <LoginModal />}
            {auth.role < 1 && (
              <NavLink to="/register">
                <button className="button-custom ml-2">
                  <div className={`flex flex-row items-center`}>
                    <span>
                      <FiUserPlus className={`text-2xl ${theme.text}`} />
                    </span>
                    <span className={`hidden lg:flex ml-1 font-Rubik ${theme.text}`}>
                      Sign up
                    </span>
                  </div>
                  <div className="bottom-border"></div>
                  <div className="right-border"></div>
                  <div className="top-border"></div>
                  <div className="left-border"></div>
                </button>
              </NavLink>
            )}
            {auth.role > 0 && (
              <NavLink
                to="/account"
                className="text-white py-1 px-2 rounded ml-2 mr-2"
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
      </div>
    </>
  );
};

export default Header;