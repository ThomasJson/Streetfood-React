import React, { useState } from 'react';
import ProductCard from '../productCard/ProductCard';

const CarouselComponent = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (

    <div className="w-full flex flex-col items-center gap-4">

      <div className="relative w-full">

        <div className="overflow-hidden">

          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >

            {products.map((product, index) => (

              <div className='inline-block w-full' key={index}>
                <ProductCard
                  key={product.id}
                  title={product.title}
                  content={product.content}
                  title_Th={product.title_Th}
                  content_Th={product.content_Th}
                  price={product.price}
                  stock={product.stock}
                  isNew={product.new}
                  isBestOffer={product.bestOffer}
                  isBestSale={product.bestSale}
                  src={product?.image?.src}
                  alt={product?.image?.alt}
                />
              </div>

            ))}

          </div>

        </div>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-2"
          onClick={goToPrevious}
        >
          Prev
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2"
          onClick={goToNext}
        >
          Next
        </button>

      </div>

      <div className="flex justify-center w-full">
        {products.map((_, index) => (
          <button
            key={index}
            className={`rounded-full h-3 w-3 mx-1 ${currentIndex === index ? 'bg-blue-700' : 'bg-blue-300'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;