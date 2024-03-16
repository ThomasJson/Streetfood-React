import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext';

const TrollScreen = () => {

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {

      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };

  }, [navigate]);

  return (
    <>
      <div className={`h-full mt-20 flex flex-col gap-4 justify-center items-center font-Rubik ${theme.text}`}>

        <img src='/assets/img/troll.png' alt=';)' className='h-80 w-80' />

      </div>
    </>
  );
};

export default TrollScreen;