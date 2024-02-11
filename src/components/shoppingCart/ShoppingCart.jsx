import './shoppingCart.scss';
import React from "react";
import { NavLink } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";

const ShoppingCart = () => {
  return (
    <>
      <NavLink to="/cart" className="text-white rounded ml-1 mr-2">
        <div className="button-custom font-Raleway">
          <div className="cart-counter">3</div>
          <div className="flex flex-row items-center">
            <span className="flex flex-row items-center">
              <FiShoppingCart className="text-4xl" />
            </span>

            <span className="hidden lg:flex ml-1 font-Rubik">Cart</span>
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