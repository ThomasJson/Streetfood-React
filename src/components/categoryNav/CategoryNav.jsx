import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const CategoryNav = () => {
  
  const navigate = useNavigate();

  const { data } = useFetch("/category", {
    method: "GET",
  });
  
  return (
    <>
      <div className="hidden h-2/5 sm:flex flex-row justify-around items-center py-2 bg-gray-200">
        {data &&
          data?.data.map((category) => {
            return (
              <div
                key={category.Id_category}
                onClick={() => {
                  navigate(`/category/${category.Id_category}`);
                }}
                className=""
              >
                <button>{category.title}</button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CategoryNav;