import React from "react";

import { FiPlus } from "react-icons/fi";

const ProductCardLg = ({ title, content, src, price, isBestOffer, isBestSale, stock }) => {
  return (
    <>
      <div className="flex justify-center md:w-4/12">
        <div className="flex flex-col rounded-lg bg-white shadow-lg mb-6 dark:bg-neutral-700 md:flex-row md:w-11/12">

          <div className="relative">
            
            <img
              className="h-full w-full rounded-tl-lg object-fit md:w-60 md:rounded-none md:rounded-l-lg"
              src={src}
              alt=""
            />

            {isBestOffer && (
              <span className="absolute top-0 w-full rounded-tl-lg px-2 py-1 text-xs text-center font-semibold text-orange-600 bg-orange-200">Best Offers -10%</span>
            )}

            {isBestSale && (
              <span className="absolute top-0 w-full rounded-tl-lg px-2 py-1 text-xs text-center font-semibold text-green-600 bg-green-200">Best Sales</span>
            )}
          </div>

          <div className="flex flex-col w-full justify-start p-4">

            <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {title}
            </h5>

            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 italic">
              {content}
            </p>
            
            {stock === 0 ? (
              <span className="text-sm text-red-500">Out of stock</span>
              ) : stock < 10 ? (
                <span className="text-sm text-yellow-600">Low stock</span>
              ) : (
              <span className="text-sm text-green-500">In stock</span>
            )}

            <div className="flex justify-between items-center mt-auto">

              {isBestOffer ? (
                <p>
                  <span className="text-lg font-semibold line-through text-neutral-800 dark:text-neutral-50 mr-2">${price.toFixed(2)}</span>
                  <span className="text-lg font-semibold text-orange-600 dark:text-neutral-50">${(Math.floor(price * (1 - 0.10) * 100) / 100).toFixed(2)}</span>
                </p>
                
                ) : <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-50">${price.toFixed(2)}</span>
              }

              <button className="bg-orange-400 text-white p-1 rounded-sm">
                <FiPlus />
              </button>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardLg;