import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="h-9vh bg-slate-50">
        <div className="h-full sm:hidden flex flex-row justify-around items-center">
          <NavLink to="/">
            <div>
              <GrHomeRounded  className="text-2xl"/>
            </div>
          </NavLink>
          <NavLink to="/profile">
            <div>
              <AiOutlineUser  className="text-2xl"/>
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div>
              <FiShoppingCart  className="text-2xl"/>
            </div>
          </NavLink>
          <div>
            <GiHamburgerMenu  className="text-2xl"/>
          </div>
        </div>

        <div className="h-full hidden sm:flex justify-center items-center">
          © 1994-2023, StreetFood.com, Inc. or its affiliates
        </div>
      </div>
    </>
  );
};

export default Footer;
