import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCardLg from "../../components/productCardLg/ProductCardLg";

const SingleCategoryScreen = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://shop-api/product/*", {
      method: "POST",
      body: JSON.stringify({
        with: ["image"],
      }),
    })
      .then((resp) => {
        return resp.json();
      })

      .then((json) => {
        setProducts(json);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-50 min-h-84vh">
        {products &&
          products?.data?.map((product) => {
            if (product.Id_category === id) {
              return (
                <div key={product.Id_product}>
                  <ProductCardLg
                    title={product.title}
                    content={product.content}
                    src={product?.with[0]?.src}
                  />
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default SingleCategoryScreen;
