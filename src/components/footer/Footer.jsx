import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { SlHome } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

import ShoppingCart from "../shoppingCart/ShoppingCart";

import { AuthContext } from "../../contexts/AuthContext";
import LoginModal from "../loginModal/LoginModal";

const Footer = () => {

  const {auth} = useContext(AuthContext);

  return (
    <>
      <div className="h-8vh bg-zinc-800">
        <div className="h-full sm:hidden flex flex-row justify-around items-center">
          <NavLink to="/">
            <div>
              <SlHome className="text-2xl text-white"/>
            </div>
          </NavLink>

          {auth.role < 1 && <LoginModal/>}

          {auth.role > 0 && (
            <NavLink to="/account">
            <div>
              <AiOutlineUser className="text-2xl"/>
            </div>
          </NavLink>
          )}
          
          <ShoppingCart />
          <div>
            <GiHamburgerMenu className="text-2xl text-white"/>
          </div>
        </div>

        <div className="h-full hidden sm:flex justify-center items-center text-white font-Rubik">
          © 1994-2023, StreetFood.com, Inc. or its affiliates
        </div>
      </div>
    </>
  );
};

export default Footer;
