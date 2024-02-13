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

  console.log(products)

  return (
    <>
      <div className="bg-gray-50 min-h-84vh">

        <CategoryNav />
        
        {products &&
          products?.map((product) => {

            console.log(product?.images)

              return (
                <div key={product.id}>

                  <ProductCardLg
                    title={product.title}
                    content={product.content}
                    src={product?.images[0]?.src}
                  />
                  
                </div>
              );
            
          })}

      </div>
    </>
  );
};

export default SingleCategoryScreen;