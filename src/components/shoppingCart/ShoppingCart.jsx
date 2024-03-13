import './shoppingCart.scss';
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';

import { FiShoppingCart } from "react-icons/fi";

const ShoppingCart = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <NavLink to="/cart" className="rounded ml-1">

        <div className={`button-custom cart-spacing ${theme.text} ${theme.textHover} ${theme.bgHover2}`}>

          <div className={`cart-counter ${theme.bgPrimary}`}>
            0
          </div>
          
          <div className="flex flex-row items-center">
            <span className="flex flex-row items-center">
              <FiShoppingCart className={`text-4xl `} />
            </span>

            <span className={`hidden sm:flex ml-1 font-Rubik`}>
              {t('generic.cart')}
            </span>
          </div>
          
        </div>

      </NavLink>
    </>
  );
};

export default ShoppingCart;