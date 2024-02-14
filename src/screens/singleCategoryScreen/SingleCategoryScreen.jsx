import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCardLg from "../../components/productCardLg/ProductCardLg";
import CategoryNav from "../../components/categoryNav/CategoryNav";

const SingleCategoryScreen = () => {
  
  const { id } = useParams();

  const [ products, setProducts ] = useState([]);

  useEffect(() => {

    const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
    const url = `${baseUrl}/category/${id}/products?withImages=true`;

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        setProducts(json);
        
      })
      .catch((error) => console.error("Error:", error));

  }, []);

  return (
    <>
      <div className="bg-gray-50 min-h-84vh">

        <CategoryNav />

        <div className="flex flex-row flex-wrap mt-6">

          {products &&
            products?.map((product) => {

                return (
                  
                    <ProductCardLg
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