import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { getCookie } from "../../helpers/cookieHelper";

import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";
import ShoppingCart from "../shoppingCart/ShoppingCart";

const Header = () => {
  const { auth } = useContext(AuthContext);
  const [pseudo, setPseudo] = useState(null);

  useEffect(() => {
    fetch("http://shop-api/app_user/" + auth.id, {
      method: "POST",
      headers: {
        Authorization: getCookie("blog"),
      },
      body: JSON.stringify({
        with: ["account"],
      }),
    })
      .then((resp) => {
        return resp.json();
      })

      .then((json) => {
        setPseudo(json);
      });
  }, [auth]);

  return (
    <>
      <div className="flex sm:hidden h-8vh justify-center items-center bg-zinc-800">
        <input
          placeholder="Search on StreetFood.com"
          className="w-10/12 px-2 rounded focus:outline-none"
        ></input>
      </div>

      <div className="hidden sm:flex h-8vh w-full flex-col">
        <div className="h-full bg-zinc-800 flex flex-row justify-between items-center px-2">

          {/* BRAND + SEARCHBAR */}
          <div className="flex flex-row items-center w-8/12">
            <NavLink to="/">
              <div className="font-Rubik text-white ml-2 mr-2">
                StreetFood.com
              </div>
            </NavLink>
            <div className="w-8/12 px-2">
              <input
                placeholder="Search on StreetFood.com"
                className="w-full px-2 rounded focus:outline-none"
              ></input>
            </div>
          </div>

          {/* LOGIN + CART */}
          <div className="flex flex-row items-center w-4/12 justify-end">
            {auth.role < 1 && <LoginModal />}
            {auth.role < 1 && <RegisterModal className="ml-2" />}
            {auth.role > 0 && (
              <NavLink
                to="/account"
                className="text-white py-1 px-2 rounded ml-2 mr-2"
              >
                <div className="button-custom font-Raleway">
                  <span className="">{pseudo?.data[0]?.with[0].firstName}</span>
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
