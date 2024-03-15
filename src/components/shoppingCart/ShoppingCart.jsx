import './shoppingCart.scss';
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';

import { FiShoppingCart } from "react-icons/fi";

const ShoppingCart = () => {

  const { theme } = useContext(ThemeContext);
  const { cartCount } = useCart();
  const { t } = useTranslation();

  return (
    <>
      <NavLink to="/cart" className="rounded ml-1">

        <div className={`button-custom cart-spacing ${theme.text} ${theme.textHover} ${theme.bgHoverOrange}`}>

          {
            cartCount < 10 ?
              (<div className={`cart-counter w-4 h-6 ${theme.bgPrimary}`}>
                <span className='text-lg'>{cartCount}</span>
              </div>)

              :

              (<div className={`cart-counter w-4 h-6 ${theme.bgPrimary}`}>
                <span className='text-lg'>
                 !!
                </span>
              </div>)
          }

          <div className="flex flex-row items-center">
            <span className="flex flex-row items-center">
              <FiShoppingCart className={`text-4xl `} />
            </span>

            <span className={`hidden sm:flex ml-1 font-Rubik`}>
              {t('generic.cart')}
            </span>
          </div>

          {/* <div className='bottom-border'></div>
          <div className='right-border'></div>
          <div className='top-border'></div>
          <div className='left-border'></div> */}

        </div>

      </NavLink>
    </>
  );
};

export default ShoppingCart;