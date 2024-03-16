import './productCard.scss'
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FiPlus } from "react-icons/fi";
import { useCart } from '../../contexts/CartContext';
import { MdNewReleases, MdTrendingUp  } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import ProductBadge from './ProductBadge';

const ProductCard = ({ title, content, title_Th, content_Th, src, alt, price, isNew, isBestOffer, isBestSale, stock }) => {

  const { theme } = useContext(ThemeContext);
  const { addToCart } = useCart();
  const userLang = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();

  return (
    <>
      <div className={`w-full h-carouselDesktopProductCard flex flex-col rounded-lg shadow-lg p-2 gap-2 ${theme.text} ${theme.bgPrimary}`} >

        <div className="h-4/6">

          <img
            className="h-full w-full object-cover rounded-tl-lg md:rounded-none md:rounded-l-lg"
            src={src}
            alt={alt}
          />

        </div>

        <div className="relative flex flex-col w-full h-2/6 justify-start">

          <div className='absolute top-1 lg:top-0 right-0 flex flex-row justify-end gap-1 text-white'>

            {isNew && <ProductBadge text="New" icon={<MdNewReleases />} color="#0ea5e9" />}

            {isBestOffer && <ProductBadge text="-10%" icon={<BiDollar />} color="orange" />}

            {isBestSale && <ProductBadge text="Best" icon={<MdTrendingUp />} color="#22c55e" />}

          </div>

          <h5 className="mb-2 text-lg font-medium">
            {
              userLang === "en" ?
                (<span>{title}</span>) :
                (<span className='font-bold'>{title_Th}</span>)
            }
          </h5>

          <p className="text-base overflow-hidden text-ellipsis">
            {
              userLang === "en" ?
                (<span>{content}</span>) :
                (<span className='w-full'>{content_Th}</span>)
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
                <span className={`text-lg font-semibold text-orange-600 line-through mr-2`}>${price.toFixed(2)}</span>
                <span className="text-lg font-semibold">
                  ${((Math.floor((price * (1 - 0.10)) * 10) / 10).toFixed(2))}
                </span>
              </p>

            ) : <span className={`text-lg font-semibold mr-2 ${theme.text}`}>${price.toFixed(2)}</span>
            }

            <button onClick={addToCart} className={`p-1 rounded-sm text-orange-500 ${theme.textHover} ${theme.bgHoverOrange} active:bg-orange-700`}>
              <FiPlus className='text-xl'/>
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;