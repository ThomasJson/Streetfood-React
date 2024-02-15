import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";
import CategoryNav from "../../components/categoryNav/CategoryNav";
import { ThemeContext } from '../../contexts/ThemeContext';

const SingleCategoryScreen = () => {
  
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [ products, setProducts ] = useState([]);

  const fetchProducts = () => {
    const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
    const url = `${baseUrl}/category/${id}/products?withImages=true`;

    // {mode : 'no-cors'}

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
      <div className={`min-h-84vh ${theme.bgTertiary}`}>

        <CategoryNav />

        <div className="h-full flex flex-row flex-wrap pt-4">

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