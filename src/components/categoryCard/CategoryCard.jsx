import React from "react";

const CategoryCard = ({ title, src }) => {
  return (
    <>
      <div className="max-w-sm mx-auto h-full bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="flex flex-row justify-center items-center h-2/6">
          <div className="font-bold text-lg">{title}</div>
        </div>

        <div className="h-4/6">
          <img className="w-full h-full object-cover" src={src} alt="" />
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
