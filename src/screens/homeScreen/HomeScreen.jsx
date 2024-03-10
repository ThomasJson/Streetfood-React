import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/productCard/ProductCard";
import Carousel from "../../components/carousel/Carousel";
import CarouselComponent from "../../components/carousel/Carousel";

const HomeScreen = () => {

  const { theme } = useContext(ThemeContext);

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
      <div className="flex flex-col p-4 gap-8">

        <section className="flex flex-col items-center gap-4 bg-blue-200 p-4">

          <h1 className="w-full text-xl text-center font-bold bg-blue-400 p-2">New on StreetFood.com</h1>

          <CarouselComponent products={newProducts}/>

        </section>

        <section className="flex flex-col items-center gap-4 bg-orange-200 p-4">

          <h1 className="w-full text-xl text-center font-bold bg-orange-400 p-2">Best Offers on StreetFood.com</h1>

        </section>

        <section className="flex flex-col items-center gap-4 bg-green-200 p-4">

          <h1 className="w-full text-xl text-center font-bold bg-green-400 p-2">Best Sales on StreetFood.com</h1>

        </section>

      </div>
    </>
  );
};

export default HomeScreen;