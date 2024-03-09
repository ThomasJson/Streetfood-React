import React, { createContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../helpers/cookieHelper";
import doFetch from "../helpers/fetchHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({ role: 0, id: "0" });

  // useEffect(() => {

  //   const check = async () => {

  //     if (auth.role > 0 && auth.id !== "0") {

  //       const { data } = await doFetch("/auth/check");

  //       if (data?.result) {
  //         setAuth({ role: +data?.roleWeight, id: data?.accountId });
  //       }

  //       else {
  //         setAuth({ role: 0, id: "0" });
  //         deleteCookie("StreetF");
  //       }
  //     }

  //   };

  //   check();

  // }, []);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        console.log(process.env.REACT_APP_AUTH_API_BASE_URL)

        const response = await fetch(process.env.REACT_APP_AUTH_API_BASE_URL + "/auth/check", {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie("StreetF")
          },
        });

        const data = await response.json();

        if (data && data.result) {

          if (+data.roleWeight !== auth.role || data.accountId !== auth.id) {
            setAuth({ role: +data.roleWeight, id: data.accountId });
          }

        } else {

          if (auth.role !== 0 || auth.id !== "0") {

            setAuth({ role: 0, id: "0" });
            deleteCookie("StreetF");
          }

        }
      } catch (error) {
        
        console.error("An error occurred while checking auth status:", error);
        setAuth({ role: 0, id: "0" });
        deleteCookie("StreetF");
      }

    };

    checkAuth();

  }, []);

  console.log('auth:', auth)

  return (

    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>

  );

};

export { AuthContext, AuthProvider };