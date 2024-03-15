import React, { useContext } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { RiDeleteBinLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

const CartScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { cartCount, resetCart } = useCart();
  const { t } = useTranslation();

  return (
    <>
      <div className={`h-full mt-10 flex flex-col gap-4 justify-center items-center font-Rubik ${theme.text}`}>

        <h2 className="text-2xl">{t('error.comingSoon')}</h2>

        {cartCount > 0 &&
          <button className={`flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-red-500 ${theme.textHover}`} onClick={resetCart}>
            <span className='font-Rubik text-2xl'>Reset Cart</span>
            <RiDeleteBinLine className="text-2xl" />
          </button>
        }

      </div>
    </>
  );
};

export default CartScreen;