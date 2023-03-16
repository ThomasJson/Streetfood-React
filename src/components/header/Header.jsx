import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart, FiUserPlus } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogInCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="h-7vh bg-slate-50">
        <div className="flex sm:hidden h-full justify-center items-center bg-slate-100">
          <input
            placeholder="Search product"
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
                  placeholder="Search product"
                  className="w-full px-2 rounded focus:outline-none"
                ></input>
              </div>
            </div>
            <div className="flex flex-row items-center w-3/12 justify-end">

              <NavLink to="/login">
                <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1 ml-3">
                  <BiLogInCircle className="text-2xl" />
                </div>
              </NavLink>

              <NavLink to="/register">
                <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1 ml-3">
                  <FiUserPlus className="text-2xl" />
                </div>
              </NavLink>

              {/* <NavLink to="/profile">
                <div className="flex flex-row items-center hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1">
                  Username <AiOutlineUser className="text-2xl" />
                </div>
              </NavLink> */}
              <NavLink to="/cart">
                <div className="hover:border-gray-700 border-transparent border-2 rounded-lg px-1 py-1 ml-2">
                  <FiShoppingCart className="text-2xl" />
                </div>
              </NavLink>
            </div>
          </div>

          <div className="h-2/5 flex flex-row justify-between items-center px-2">
            <div>
              <GiHamburgerMenu />
            </div>
            <div>Chickens</div>
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
