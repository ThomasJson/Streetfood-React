import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import ShoppingCart from "../shoppingCart/ShoppingCart";

const Footer = () => {
  return (
    <>
      <div className="h-8vh bg-zinc-800">
        <div className="h-full sm:hidden flex flex-row justify-around items-center text-white">
          <NavLink to="/">
            <div>
              <GrHomeRounded  className="text-2xl text-white"/>
            </div>
          </NavLink>
          <NavLink to="/profile">
            <div>
              <AiOutlineUser  className="text-2xl"/>
            </div>
          </NavLink>
          <ShoppingCart />
          <div>
            <GiHamburgerMenu  className="text-2xl"/>
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
