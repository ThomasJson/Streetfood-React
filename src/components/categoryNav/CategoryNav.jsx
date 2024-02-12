import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const CategoryNav = () => {
  
  const navigate = useNavigate();

  const { data } = useFetch("/category", {
    method: "GET",
  })

  console.log(data);
  
  return (
    <>
      <div className="hidden h-2/5 sm:flex flex-row justify-around items-center py-2 bg-gray-200">
        {data &&
          data?.map((category) => {
            return (
              <div
                key={category.id}
                onClick={() => {
                  navigate(`/category/${category.id}`);
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