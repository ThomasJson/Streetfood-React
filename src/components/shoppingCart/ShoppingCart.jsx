import './shoppingCart.scss';
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';

import { FiShoppingCart } from "react-icons/fi";

const ShoppingCart = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <NavLink to="/cart" className="rounded ml-1 mr-2">
        <div className="button-custom font-Raleway">

          <div className={`cart-counter ${theme.bgPrimary}`}>3</div>
          
          <div className="flex flex-row items-center">
            <span className="flex flex-row items-center">
              <FiShoppingCart className={`text-4xl ${theme.text}`} />
            </span>

            <span className={`hidden lg:flex ml-1 font-Rubik ${theme.text}`}>Cart</span>
          </div>
          <div className="bottom-border"></div>
          <div className="right-border"></div>
          <div className="top-border"></div>
          <div className="left-border"></div>
        </div>
      </NavLink>
    </>
  );
};

export default ShoppingCart;