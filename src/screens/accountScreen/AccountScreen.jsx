import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { deleteCookie } from '../../helpers/cookieHelper';

const AccountScreen = () => {

    const { auth, setAuth } = useContext(AuthContext);
    return (
        <div className="bg-slate-200 min-h-84vh">
            {auth.role > 0 && (
              <button
                className=""
                onClick={(e) => {
                  setAuth({ role: 0, id: 0 });
                  deleteCookie("blog");
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