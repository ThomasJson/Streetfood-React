import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import useFetch from "../../hooks/useFetch";
import { useTranslation } from 'react-i18next';
import CarouselComponent from "../../components/carousel/Carousel";
import { MdNewReleases, MdTrendingUp } from "react-icons/md";
import { TbBrandCashapp } from "react-icons/tb";

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
      <div className={`hidden sm:flex flex-col w-fit rounded-lg m-4 p-4 gap-4 ${theme.text} ${theme.bgPrimary}`} >
        <p className="m-0 text-xl">Desktop Home Page is coming soon ..</p>
        <p className="m-0">If you want to see what it will look like, check it out on mobile :)</p>
      </div>

      <div className="sm:hidden flex flex-col p-4 gap-8">

        <section className="w-full flex flex-col items-center gap-4 bg-blue-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-blue-600 p-2 text-white">
            <h1>{t('product.newProducts')}</h1>
            <MdNewReleases />
          </div>
          <CarouselComponent products={newProducts} />
        </section>

        <section className="flex flex-col items-center gap-4 bg-orange-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-orange-400 p-2 text-white">
            <h1>{t('product.bestOffers')}</h1>
            <TbBrandCashapp />
          </div>
          <CarouselComponent products={bestOffers} />
        </section>

        <section className="flex flex-col items-center gap-4 bg-green-200 p-4">
          <div className="flex flex-row justify-center items-center w-full gap-2 text-2xl text-center font-Rubik bg-green-500 p-2 text-white">
            <h1>{t('product.bestSellers')}</h1>
            <MdTrendingUp />
          </div>
          <CarouselComponent products={bestSales} />
        </section>

      </div>
    </>
  );
};

export default HomeScreen;