import React, { createContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../helpers/cookieHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({ role: 0, id: "0" });

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const url = process.env.REACT_APP_AUTH_API_BASE_URL;

        const response = await fetch(url + "/auth/check", {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie("StreetF")
          },
        });

        const data = await response.json();

        if (data && data.result) {

          if (+data.accRole !== auth.role || data.accId !== auth.id) {
            setAuth({ role: +data.accRole, id: data.accId });
          }

        } else {

          if (auth.role !== 0 || auth.id !== "0") {

            setAuth({ role: 0, id: "0" });
            deleteCookie("StreetF");
            
          }

        }
      } catch (error) {

        setAuth({ role: 0, id: "0" });
        deleteCookie("StreetF");

      }

    };

    checkAuth();

  }, []);

  return (

    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>

  );

};

export { AuthContext, AuthProvider };