import './productCard.scss'
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { FiPlus } from "react-icons/fi";
import { MdNewReleases, MdTrendingUp  } from "react-icons/md";
import { TbBrandCashapp } from "react-icons/tb";
import { BiDollar } from "react-icons/bi";
import ProductBadge from './ProductBadge';

const ProductCard = ({ title, content, title_Th, content_Th, src, alt, price, isNew, isBestOffer, isBestSale, stock }) => {

  const { theme } = useContext(ThemeContext);
  const { addToCart } = useCart();
  const userLang = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();

  return (
    <>
      <div className={`flex flex-col card-width rounded-lg shadow-lg p-2 gap-2 lg:flex-row lg:h-44 ${theme.text} ${theme.bgPrimary}`} >

        <div className="relative h-60 lg:h-40 lg:w-60">

          <img
            className="h-full w-full object-cover rounded-tl-lg sm:h-60 lg:h-40 lg:w-60 md:rounded-none md:rounded-l-lg"
            src={src}
            alt={alt}
          />

          <div className='hidden lg:flex flex-row justify-start gap-1 absolute top-1 left-1 text-white'>

            {isNew && <ProductBadge text="New" icon={<MdNewReleases />} color="#0ea5e9" />}

            {isBestOffer && <ProductBadge text="-10%" icon={<BiDollar />} color="#facc15" />}

            {isBestSale && <ProductBadge text="Best" icon={<MdTrendingUp />} color="#22c55e" />}

          </div>

        </div>

        <div className="relative flex flex-col w-full h-full justify-start">

          <div className='absolute top-1 right-0 flex flex-row justify-end gap-1 text-white lg:hidden'>

            {isNew && <ProductBadge text="New" icon={<MdNewReleases />} color="blue" />}

            {isBestOffer && <ProductBadge text="-10%" icon={<TbBrandCashapp />} color="orange" />}

            {isBestSale && <ProductBadge text="Best" icon={<MdTrendingUp />} color="green" />}

          </div>

          <h5 className="mb-2 text-xl font-medium">
            {
              userLang === "en" ?
                (<span>{title}</span>) :
                (<span>{title_Th}</span>)
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
                <span className={`text-lg font-semibold line-through mr-2 ${theme.text}`}>${price.toFixed(2)}</span>
                <span className="text-lg font-semibold text-orange-600">${(Math.floor(price * (1 - 0.10) * 100) / 100).toFixed(2)}</span>
              </p>

            ) : <span className={`text-lg font-semibold mr-2 ${theme.text}`}>${price.toFixed(2)}</span>
            }

            <button onClick={addToCart} className="bg-orange-400 text-white p-1 rounded-sm">
              <FiPlus />
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;