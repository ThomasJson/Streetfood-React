import React, { useContext, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart, FiUserPlus } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogInCircle, BiCrown } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getCookie } from "../../helpers/cookieHelper";

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
      <div className="h-9vh bg-slate-50">
        <div className="flex sm:hidden h-full justify-center items-center bg-slate-100">
          <input
            placeholder="Search on StreetFood.com"
            className="w-10/12 px-2 rounded focus:outline-none"
          ></input>
        </div>

        <div className="hidden sm:flex h-full w-full flex-col">
          <div className="h-3/5 bg-slate-100 flex flex-row justify-between items-center px-2">
            <div className="flex flex-row items-center w-9/12">
              <NavLink to="/">
                <div className="">StreetFood.com</div>
              </NavLink>
              <div className="w-10/12 px-2">
                <input
                  placeholder="Search on StreetFood.com"
                  className="w-full px-2 rounded focus:outline-none"
                ></input>
              </div>
            </div>
            <div className="flex flex-row items-center w-3/12 justify-end">

              {/* {auth.role === 4 && (
                <NavLink to="/admin">
                  <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1 ml-3">
                    <BiCrown className="text-2xl" />
                  </div>
                </NavLink>
              )} */}

              {auth.role < 1 && (
                <NavLink to="/login">
                  <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1">
                    {/* <BiLogInCircle className="text-2xl" /> */}
                    <p>Connexion</p>
                  </div>
                </NavLink>
              )}

              {auth.role < 1 && (
                <NavLink to="/register" className="ml-2">
                  <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1">
                    {/* <FiUserPlus className="text-2xl" /> */}
                    <p>Inscription</p>
                  </div>
                </NavLink>
              )}

              {auth.role > 0 && (
                <NavLink to="/account">
                  <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1">
                    {pseudo?.data[0]?.with[0].pseudo}
                  </div>
                </NavLink>
              )}

              <NavLink to="/cart" className="ml-2">
                <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1">
                  <FiShoppingCart className="text-2xl" />
                </div>
              </NavLink>

            </div>
          </div>

          <div className="h-2/5 flex flex-row justify-around items-center px-2">
            <div>Chicken</div>
            <div>Pork</div>
            <div>Noodles</div>
            <div>Smoothies</div>
            <div>Ice Creams</div>
            <div>Desserts</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
