import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';

const LoadingSpinner = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (

    <div className={`h-full flex flex-col justify-center items-center font-Rubik ${theme.text} ${theme.bgTertiary}`}>

      <h1 className='mb-4 text-9xl'>LOADING</h1>

    </div>

  );
};

export default LoadingSpinner;