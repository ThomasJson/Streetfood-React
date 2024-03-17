import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const AccountScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <div className={`h-full mt-20 flex flex-col gap-4 justify-center items-center font-Rubik ${theme.text}`}>

        <h2 className="text-2xl">{t('error.comingSoon')}</h2>

      </div>
    </>
  );
};

export default AccountScreen;