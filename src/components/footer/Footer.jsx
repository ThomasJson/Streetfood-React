import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";


const Footer = () => {
  return (
    <>
      <div className="h-7vh bg-slate-50">
        <div className="h-full sm:hidden flex flex-row justify-around items-center">
          <div>
            <GrHomeRounded />
          </div>
          <div>
            <AiOutlineUser />
          </div>
          <div>
            <FiShoppingCart />
          </div>
          <div>
            <GiHamburgerMenu />
          </div>
        </div>

        <div className="h-full hidden sm:flex justify-center items-center">Footer</div>
      </div>

      
    </>
  );
};

export default Footer;
