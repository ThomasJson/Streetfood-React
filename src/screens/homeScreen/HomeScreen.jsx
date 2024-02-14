import React, { useContext } from "react";
import CategoryNav from "../../components/categoryNav/CategoryNav";
import { ThemeContext } from '../../contexts/ThemeContext';

const HomeScreen = () => {

  const { theme } = useContext(ThemeContext);

  return (

    <>
      <div className={`min-h-84vh ${theme.bgTertiary}`}>

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