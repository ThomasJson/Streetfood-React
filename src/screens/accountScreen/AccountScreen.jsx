import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { deleteCookie } from '../../helpers/cookieHelper';
import { NavLink } from 'react-router-dom';

const AccountScreen = () => {

    const { auth, setAuth } = useContext(AuthContext);
    return (
        <div className="bg-gray-50 min-h-84vh">

            {auth.role === 4 && (
              <NavLink to="/admin">
                Admin
              </NavLink>
            )}

            {auth.role > 0 && (
              <button
                className=""
                onClick={(e) => {
                  setAuth({ role: 0, id: "0" });
                  deleteCookie("StreetF");
                  window.location.href = "/";
                }}
              >
                Déconnexion
              </button>
            )}
        </div>
    );
};

export default AccountScreen;