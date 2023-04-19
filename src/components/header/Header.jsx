import React, { useContext, useEffect, useState } from "react";
// import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BiCart } from "react-icons/bi";

// import { FiUserPlus } from "react-icons/fi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { BiLogInCircle, BiCrown } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getCookie } from "../../helpers/cookieHelper";
import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";

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
      {/* <div className="h-11vh bg-slate-50"> */}

        <div className="flex sm:hidden h-8vh justify-center items-center bg-orange-300">
          <input
            placeholder="Search on StreetFood.com"
            className="w-10/12 px-2 rounded focus:outline-none"
          ></input>
        </div>

        <div className="hidden sm:flex h-8vh w-full flex-col">

          <div className="h-full bg-orange-300 flex flex-row justify-between items-center px-2">

            <div className="flex flex-row items-center w-9/12">

              <NavLink to="/">
                <div className="font-Raleway text-white ml-2 mr-2">StreetFood.com</div>
              </NavLink>

              <div className="w-10/12 px-2">
                <input
                  placeholder="Search on StreetFood.com"
                  className="w-full px-2 rounded focus:outline-none"
                ></input>
              </div>

            </div>

            <div className="flex flex-row items-center w-3/12 justify-end">
              {auth.role < 1 && <LoginModal />}

              {auth.role < 1 && <RegisterModal className="ml-2" />}

              {auth.role > 0 && (
                <NavLink to="/account" className="text-white py-1 px-2 rounded ml-2 mr-2">
                  <div className="">
                    {pseudo?.data[0]?.with[0].pseudo}
                  </div>
                </NavLink>
              )}

              <NavLink to="/cart" className="text-white py-1 px-2 rounded ml-2 mr-2">
                <div className="">
                  <BiCart className="text-3xl" />
                </div>
              </NavLink>
            </div>

          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Header;
