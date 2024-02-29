import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FiPlus } from "react-icons/fi";

const ProductCard = ({ title, content, title_Th, content_Th, src, alt, price, isBestOffer, isBestSale, stock}) => {
  
  const { theme } = useContext(ThemeContext);
  const userLang = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();

  return (
    <>
      <div className={`flex flex-col w-full rounded-lg shadow-lg p-2 gap-2 sm:w-card-mobile lg:flex-row lg:h-40 lg:w-card-desktop ${theme.text} ${theme.bgPrimary}`} >

        <div className="relative">
          
          <img
            className="h-full w-full rounded-tl-lg object-fit sm:h-48 lg:h-36 lg:w-60 md:rounded-none md:rounded-l-lg"
            src={src}
            alt={alt}
          />

          {isBestOffer && (
            <span className="absolute top-0 w-full rounded-tl-lg px-2 py-1 text-xs text-center font-semibold text-orange-600 bg-orange-200">
              {t('product.bestOffers')}
            </span>
          )}

          {isBestSale && (
            <span className="absolute top-0 w-full rounded-tl-lg px-2 py-1 text-xs text-center font-semibold text-green-600 bg-green-200">
              {t('product.bestSales')}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full justify-start pl-1">

          <h5 className="mb-2 text-xl font-medium">
            {
              userLang === "en" ?
              (<span>{title}</span>) :
              (<span>{title_Th}</span>)
            }
          </h5>

          <p className="text-base">
          {
              userLang === "en" ?
              (<span>{content}</span>) :
              (<span>{content_Th}</span>)
            }
          </p>
          
          {stock === 0 ? (
            <span className="text-sm font-bold mt-auto text-red-500">
              {t('product.outStock')}
            </span>
            ) : stock < 10 ? (
              <span className="text-sm font-bold mt-auto text-yellow-600">
                {t('product.lowStock')}
              </span>
            ) : (
            <span className="text-sm font-bold mt-auto text-green-500">
              {t('product.inStock')}
            </span>
          )}

          <div className="flex justify-between items-center">

            {isBestOffer ? (
              <p>
                <span className={`text-lg font-semibold line-through mr-2 ${theme.text}`}>${price.toFixed(2)}</span>
                <span className="text-lg font-semibold text-orange-600">${(Math.floor(price * (1 - 0.10) * 100) / 100).toFixed(2)}</span>
              </p>
              
              ) : <span className={`text-lg font-semibold mr-2 ${theme.text}`}>${price.toFixed(2)}</span>
            }

            <button className="bg-orange-400 text-white p-1 rounded-sm">
              <FiPlus />
            </button>

          </div>
          
        </div>
      </div>
    </>
  );
};

export default ProductCard;