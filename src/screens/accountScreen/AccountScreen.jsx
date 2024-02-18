import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { deleteCookie } from '../../helpers/cookieHelper';
import { NavLink } from 'react-router-dom';

const AccountScreen = () => {

  const { auth, setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <div className='flex flex-row h-full justify-center items-center'>
        <div className={`flex flex-row justify-center gap-6 p-4 rounded-lg ${theme.bgPrimary}`}>

          {auth.role === 4 && (
            <NavLink to="/admin" className={`font-bold p-3 rounded-lg ${theme.text} ${theme.bgSecondary}`}>
              {t('account.admin')}
            </NavLink>
          )}

          {auth.role > 0 && (
            <button
              className={`font-bold p-3 rounded-lg ${theme.text} ${theme.bgSecondary}`}
              onClick={(e) => {
                setAuth({ role: 0, id: "0" });
                deleteCookie("StreetF");
                window.location.href = "/";
              }}
            >
              {t('generic.logOut')}
            </button>
          )}

        </div>
      </div>
    </>
  );
};

export default AccountScreen;