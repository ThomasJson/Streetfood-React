import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";
import { ThemeContext } from '../../contexts/ThemeContext';

const SingleCategoryScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
    const url = `${baseUrl}/category/${id}/products?withImages=true`;

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

  return (
    <>
      <div className="flex flex-col items-center p-4">

        <div className="h-full flex flex-col w-11/12 sm:w-full sm:flex-row flex-wrap">

          {products &&
            products?.map((product) => {

              return (

                <ProductCard
                  key={product.id}
                  title={product.title}
                  content={product.content}
                  price={product.price}
                  stock={product.stock}
                  isBestOffer={product.bestOffer}
                  isBestSale={product.bestSale}
                  src={product?.images[0]?.src}
                />

              );

            })}

        </div>

      </div>
    </>
  );
};

export default SingleCategoryScreen;