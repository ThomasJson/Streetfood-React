import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
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
      <div className={`hidden sm:flex flex-row justify-around items-center py-1 ${theme.bgSecondary}`}>
        {data &&
          data?.map((category) => {
            return (
              <div
                key={category.id}
                onClick={() => {
                  navigate(`/category/${category.id}`);
                }}
                className={`${theme.text}`}
              >
                {
                  userLang === "en" ?
                  (<button>{category.title}</button>) :
                  (<button>{category.title_Th}</button>)
                }
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CategoryNav;