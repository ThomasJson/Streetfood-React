import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';

const NotFoundScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (

    <div className={`h-full w-full mt-20 flex flex-col gap-4 justify-center items-center font-Rubik ${theme.text}`}>
      <div className={`w-3/4 lg:w-1/2 h-52 p-4 text-center rounded-lg ${theme.bgSecondary}`}>
        <h1 className='text-8xl'>404</h1>
        <h2 className='font-Rubik text-2xl'>{t('error.404')}</h2>
      </div>
    </div>

  );
};

export default NotFoundScreen;