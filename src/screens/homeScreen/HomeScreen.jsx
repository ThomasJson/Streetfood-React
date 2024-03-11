import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import useFetch from "../../hooks/useFetch";
import { useTranslation } from 'react-i18next';
import { MdNewReleases, MdTrendingUp } from "react-icons/md";
import { TbBrandCashapp } from "react-icons/tb";
import Carousel from "../../components/carousel/Carousel";
import DesktopCarousel from "../../components/carousel/DesktopCarousel";

const HomeScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const { data } = useFetch("/product", { method: "GET" })

  const [newProducts, setNewProducts] = useState([]);
  const [bestSales, setBestSales] = useState([]);
  const [bestOffers, setBestOffers] = useState([]);

  useEffect(() => {

    if (data) {

      const newProd = data.filter(product => product.new);
      const bestSelling = data.filter(product => product.bestSale);
      const bestOffer = data.filter(product => product.bestOffer);

      setNewProducts(newProd);
      setBestSales(bestSelling);
      setBestOffers(bestOffer);
    }

  }, [data]);

  return (

    <>

      <div className="flex flex-col h-full justify-center gap-8 sm:flex-row sm:gap-2">

        {/* MOBILE */}
        <section className="sm:hidden w-full flex flex-col items-center gap-4 bg-blue-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-blue-600 p-2 text-white">
            <h1>{t('product.newProducts')}</h1>
            <MdNewReleases />
          </div>
          <Carousel products={newProducts} />
        </section>

        {/* DESKTOP */}
        <section className="hidden w-33% h-full sm:flex flex-col items-center gap-4 bg-blue-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-blue-600 p-2 text-white">
            <h1>{t('product.newProducts')}</h1>
            <MdNewReleases />
          </div>
          <DesktopCarousel products={newProducts} />
        </section>

        {/* MOBILE */}
        <section className="sm:hidden w-full flex flex-col items-center gap-4 bg-orange-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-orange-400 p-2 text-white">
            <h1>{t('product.bestOffers')}</h1>
            <TbBrandCashapp />
          </div>
          <Carousel products={bestOffers} />
        </section>

        {/* DESKTOP */}
        <section className="hidden w-33% h-full sm:flex flex-col items-center gap-4 bg-orange-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-orange-400 p-2 text-white">
            <h1>{t('product.bestOffers')}</h1>
            <TbBrandCashapp />
          </div>
          <DesktopCarousel products={bestOffers} />
        </section>

        {/* MOBILE */}
        <section className="sm:hidden w-full flex flex-col items-center gap-4 bg-green-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-green-500 p-2 text-white">
            <h1>{t('product.bestSellers')}</h1>
            <MdTrendingUp />
          </div>
          <Carousel products={bestSales} />
        </section>

        {/* MOBILE */}
        <section className="hidden w-33% h-full sm:flex flex-col items-center gap-4 bg-green-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-green-500 p-2 text-white">
            <h1>{t('product.bestSellers')}</h1>
            <MdTrendingUp />
          </div>
          <DesktopCarousel products={bestSales} />
        </section>

      </div>
    </>
  );
};

export default HomeScreen;