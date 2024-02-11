import React, { useEffect, useState } from "react";
import ProductCardLg from "../../components/productCardLg/ProductCardLg"
import CategoryNav from "../../components/categoryNav/CategoryNav";

const HomeScreen = () => {

  // const [img, setImg] = useState(null);
  

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('http://shop-api/image');
  //     const result = await response.json();
  //     setImg(result);
  //   }

  //   fetchData();
  // }, []);
  
  // console.log('img:', img)

  return (
    <>
      <div className="bg-gray-50 min-h-84vh">

        <CategoryNav />

        {/* <div className="flex flex-col items-center">

          <div className="w-full flex flex-col items-center my-4">
            <h1>Best Sales</h1>

            <div className="w-full flex flex-row justify-center flex-wrap">
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
            </div>

          </div>

          <div className="w-full flex flex-col items-center my-4">
            <h1>Best Offers</h1>

            <div className="w-full flex flex-row justify-center flex-wrap">
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
            </div>

          </div>

          <div className="w-full flex flex-col items-center my-4">
            <h1>Latest News</h1>

            <div className="w-full flex flex-row justify-center flex-wrap">
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
              <div className="w-40 h-40 border-solid border-2 border-slate-900 mx-2 my-2"></div>
            </div>

          </div>

        </div> */}

      </div>
    </>
  );
};

export default HomeScreen;