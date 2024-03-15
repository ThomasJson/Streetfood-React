import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { deleteCookie } from '../../helpers/cookieHelper';
import { NavLink } from 'react-router-dom';

const AccountScreen = () => {

  // const { auth, setAuth } = useContext(AuthContext);
  // const { theme } = useContext(ThemeContext);
  // const { t } = useTranslation();

  return (
    <>
      <div className='flex flex-row h-full justify-center items-center'>
        
      </div>
    </>
  );
};

export default AccountScreen;