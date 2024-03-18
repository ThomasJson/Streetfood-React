import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdNewReleases, MdTrendingUp } from "react-icons/md";
import { BiDollar } from "react-icons/bi";

const SingleCategoryScreen = () => {

  const { id } = useParams();
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);

  const [sortPrice, setSortPrice] = useState(null);
  const [sortNew, setSortNew] = useState(null);
  const [sortBestOffer, setSortBestOffer] = useState(null);
  const [sortBestSale, setSortBestSale] = useState(null);

  const fetchProducts = () => {

    const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
    const url = `${baseUrl}/category/${id}/products`;

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {

    fetchProducts();

  }, [id]);

  const resetSorts = () => {
    setSortPrice(null);
    setSortNew(null);
    setSortBestOffer(null);
    setSortBestSale(null);
  };

  const sortProducts = () => {
    let sortedProducts = [...products];

    if (sortPrice) {
      sortedProducts.sort((a, b) => sortPrice === 'asc' ? a.price - b.price : b.price - a.price);
    }
    if (sortNew) {
      sortedProducts.sort((a, b) => (a.new === b.new ? 0 : sortNew === 'asc' ? (a.new ? -1 : 1) : (a.new ? 1 : -1)));
    }
    if (sortBestOffer) {
      sortedProducts.sort((a, b) => (a.bestOffer === b.bestOffer ? 0 : sortBestOffer === 'asc' ? (a.bestOffer ? -1 : 1) : (a.bestOffer ? 1 : -1)));
    }
    if (sortBestSale) {
      sortedProducts.sort((a, b) => (a.bestSale === b.bestSale ? 0 : sortBestSale === 'asc' ? (a.bestSale ? -1 : 1) : (a.bestSale ? 1 : -1)));
    }

    return sortedProducts;
  };

  return (
    <>

      <div className="flex flex-row w-full justify-end">

        <div className="fixed top-30 left-4 hidden lg:flex flex-col w-24%">

          <div className={`p-4 rounded-lg ${theme.text} ${theme.bgPrimary}`}>

            <div className={`p-4 rounded-lg ${theme.text} ${theme.bgSecondary}`}>

              <h2 className="mb-6 text-center text-xl font-Rubik">
                {t('filter.filterTitle')}
              </h2>

              <div className="flex flex-col items-center gap-2 mb-1">

                <button className={`w-49 flex flex-row justify-center items-center gap-1 p-2 border-2 hover:bg-yellow-300 rounded-lg ${theme.textHover} ${theme.borderColor} hover:border-white`} onClick={() => { resetSorts(); setSortPrice(sortPrice === 'asc' ? 'desc' : 'asc') }}>
                  {t('filter.price')}

                  {sortPrice !== null && (
                    sortPrice === 'asc' ?
                      (<span className="mt-1"><IoIosArrowDown /></span>) :
                      (<span><IoIosArrowUp /></span>)
                  )}
                </button>

                <button className={`w-49 flex flex-row justify-center items-center gap-1 p-2 border-2 hover:bg-blue-400 rounded-lg ${theme.textHover} ${theme.borderColor} hover:border-white`} onClick={() => { resetSorts(); setSortNew(sortPrice === 'asc' ? 'desc' : 'asc') }}>
                  {t('filter.new')}

                  {sortNew !== null && (
                    <span className="mt-1"><MdNewReleases /></span>
                  )}
                </button>
                <button className={`w-49 flex flex-row justify-center items-center gap-1 p-2 border-2 hover:bg-orange-400 rounded-lg ${theme.textHover} ${theme.borderColor} hover:border-white`} onClick={() => { resetSorts(); setSortBestOffer(sortPrice === 'asc' ? 'desc' : 'asc') }}>
                  {t('filter.bestOffers')}

                  {sortBestOffer !== null && (
                    <span className="mt-1"><BiDollar /></span>
                  )}
                </button>
                <button className={`w-49 flex flex-row justify-center items-center gap-1 p-2 border-2 hover:bg-green-400 rounded-lg ${theme.textHover} ${theme.borderColor} hover:border-white`} onClick={() => { resetSorts(); setSortBestSale(sortPrice === 'asc' ? 'desc' : 'asc') }}>
                  {t('filter.bestSellers')}

                  {sortBestSale !== null && (
                    <span className="mt-1"><MdTrendingUp /></span>
                  )}
                </button>

              </div>
            </div>

          </div>

        </div>

        <div className="flex flex-col w-full lg:w-3/4">

          <div className="w-full flex flex-row flex-wrap gap-4">

            {products.length > 0 &&
              sortProducts()?.map((product) => {

                return (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    content={product.content}
                    title_Th={product?.title_Th}
                    content_Th={product?.content_Th}
                    price={product?.price}
                    stock={product?.stock}
                    isNew={product?.new}
                    isBestOffer={product?.bestOffer}
                    isBestSale={product?.bestSale}
                    src={product?.image?.src}
                    alt={product?.image?.alt}
                  />

                );

              })}

          </div>

        </div>


      </div>




    </>
  );
};

export default SingleCategoryScreen;