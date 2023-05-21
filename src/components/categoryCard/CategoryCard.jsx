import React from "react";

const CategoryCard = ({ title, src }) => {
  return (
    <>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
        </div>
        <img
          className="w-full h-48 object-cover"
          src={src}
          alt=""
        />
      </div>
    </>
  );
};

export default CategoryCard;
