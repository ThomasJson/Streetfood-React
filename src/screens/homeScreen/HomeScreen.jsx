import './homeScreen.scss'
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import useFetch from "../../hooks/useFetch";
import { useTranslation } from 'react-i18next';
import { MdNewReleases, MdTrendingUp } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import Carousel from "../../components/carousel/Carousel";
import DesktopCarousel from "../../components/carousel/DesktopCarousel";
import ProductCard from "../../components/productCard/ProductCard";

const HomeScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const { data } = useFetch("/product", { method: "GET" })

  const [newProducts, setNewProducts] = useState([]);
  const [bestSales, setBestSales] = useState([]);
  const [bestOffers, setBestOffers] = useState([]);

  useEffect(() => {

    if (data) {

      const newProd = data?.filter(product => product.new);
      const bestSelling = data?.filter(product => product.bestSale);
      const bestOffer = data?.filter(product => product.bestOffer);

      setNewProducts(newProd);
      setBestSales(bestSelling);
      setBestOffers(bestOffer);
    }

  }, [data]);

  useEffect(() => {
    const scrollables = document.querySelectorAll('.scrollable-section');
    const handleScroll = (e) => {

      if (e.deltaY === 0) return;
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY + e.deltaX;

    };
  
    scrollables.forEach(el => {
      el.addEventListener('wheel', handleScroll);
    });
  
    return () => {
      scrollables.forEach(el => {
        el.removeEventListener('wheel', handleScroll);
      });
    };

  }, []);

  return (

    <>

      {/* {MOBILE} */}
      <div className="flex flex-col h-full justify-center gap-8 sm:flex-row sm:gap-2">

        <section className="sm:hidden w-full flex flex-col items-center gap-4 bg-blue-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-blue-600 p-2 text-white">
            <h1>{t('product.newProducts')}</h1>
            <MdNewReleases />
          </div>
          <Carousel products={newProducts} />
        </section>

        <section className="sm:hidden w-full flex flex-col items-center gap-4 bg-orange-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-orange-400 p-2 text-white">
            <h1>{t('product.bestOffers')}</h1>
            <BiDollar />
          </div>
          <Carousel products={bestOffers} />
        </section>

        <section className="sm:hidden w-full flex flex-col items-center gap-4 bg-green-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-green-500 p-2 text-white">
            <h1>{t('product.bestSellers')}</h1>
            <MdTrendingUp />
          </div>
          <Carousel products={bestSales} />
        </section>

      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex flex-row h-main-desktop gap-4">

        <section className="hidden w-33% h-full sm:flex flex-col items-center gap-4 bg-blue-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-blue-600 p-2 text-white">
            <h1>{t('product.newProducts')}</h1>
            <span className='flex sm:hidden md:flex'><MdNewReleases /></span>
          </div>
          <DesktopCarousel products={newProducts} />
        </section>

        <div className="flex flex-col w-66% h-full gap-4">

          <section className="hidden w-full h-1/2 sm:flex flex-col items-center gap-2 bg-orange-200 p-2">
            
            <div className="flex flex-row justify-center items-center w-full gap-1 text-2xl text-center font-Rubik bg-orange-400 p-1 text-white">
              <h1>{t('product.bestOffers')}</h1>
              <BiDollar />
            </div>

            <div className="flex flex-row h-full gap-4 overflow-x-auto w-full scrollable-section">
              {bestOffers.map((product) => (

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

              ))}
            </div>

          </section>

          <section className="hidden w-full h-1/2 sm:flex flex-col items-center gap-2 bg-green-200 p-2">

            <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-green-500 p-1 text-white">
              <h1>{t('product.bestSellers')}</h1>
              <MdTrendingUp />
            </div>

            <div className="flex flex-row h-full gap-4 overflow-x-auto w-full scrollable-section">
              {bestSales.map((product) => (

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

              ))}
            </div>

          </section>

        </div>

      </div>

    </>
  );
};

export default HomeScreen;