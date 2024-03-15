import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { deleteCookie } from '../../helpers/cookieHelper';
import { NavLink } from 'react-router-dom';

const SettingsScreen = () => {

  // const { auth, setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <div className={`h-full mt-10 flex flex-col gap-4 justify-center items-center font-Rubik ${theme.text}`}>

        <h2 className="text-2xl">{t('error.comingSoon')}</h2>

      </div>
    </>
  );
};

export default SettingsScreen;