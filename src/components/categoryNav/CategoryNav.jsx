import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { ThemeContext } from '../../contexts/ThemeContext';

const CategoryNav = () => {

  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const userLang = localStorage.getItem('i18nextLng');

  const { data } = useFetch("/category", {
    method: "GET",
  })

  return (
    <>
      <div className={`hidden sm:flex flex-row justify-around items-center py-1 ${theme.text} ${theme.bgSecondary}`}>
        {data &&
          data?.map((category) => {
            return (
              <div
                key={category.id}
                className={``}
              >
                <NavLink
                  to={`/category/${category.id}`}
                  className={({ isActive }) =>
                    isActive ? 'transition-colors duration-150 ease-in-out text-orange-400' : `transition-colors duration-150 ease-in-out ${theme.linkTextHover}`
                  }>
                  {
                    userLang === "en" ?
                      (<button>{category.title}</button>) :
                      (<button>{category.title_Th}</button>)
                  }
                </NavLink>

              </div>
            );
          })}
      </div>
    </>
  );
};

export default CategoryNav;