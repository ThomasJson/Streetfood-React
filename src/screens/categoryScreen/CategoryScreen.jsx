import React from "react";
import useFetch from "../../hooks/useFetch";

import { useNavigate } from "react-router-dom";

import CategoryCard from "../../components/categoryCard/CategoryCard";

const CategoryScreen = () => {
  const navigate = useNavigate();

  const { data } = useFetch("category", {
    method: "GET",
  });

  return (
    <>
      <div className="bg-gray-50 min-h-84vh flex flex-row items-center">
        <div className="flex flex-row flex-wrap justify-evenly h-84vh py-3 px-3">

          {data &&
            data?.data.map((category) => {
              return (
                <div
                  key={category.Id_category}
                  onClick={() => {
                    navigate(`/category/${category.Id_category}`);
                  }}
                  className="w-1/3 h-2/6 p-2"
                >

                  <CategoryCard title={category.title} src={category.src} />
                  
                </div>
              );
            })}

        </div>
      </div>
    </>
  );
};

export default CategoryScreen;
