import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";

const SingleCategoryScreen = () => {

  const { id } = useParams();
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <div className="flex flex-col">

        <div className="w-full flex flex-row flex-wrap gap-4">

          {products &&
            products?.map((product) => {

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
    </>
  );
};

export default SingleCategoryScreen;