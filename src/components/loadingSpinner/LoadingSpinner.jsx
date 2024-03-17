import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { CgSearchLoading } from "react-icons/cg";

const LoadingSpinner = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (

    <div className={`h-full mt-20 flex flex-col gap-4 justify-center items-center font-Rubik ${theme.text}`}>

      <h1 className='text-8xl'>
        <CgSearchLoading />
      </h1>

      <h2 className='font-Rubik text-2xl'>{t('error.loading')}</h2>

    </div>

  );
};

export default LoadingSpinner;